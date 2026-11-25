import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import type { PatDTO, PresetRecord, RunMeta } from '../records';
import type { RunRequest, StageSourceKind } from '../events';
import { dataDir } from './paths';

/**
 * SQLite-backed store (better-sqlite3). A real embedded database — users, presets, runs, and the
 * encrypted PAT vault all live in `<dataDir>/studio.db`. Everything is lazy: the connection opens on
 * first access (not at import time, which would break `next build`'s static analysis). The exported
 * access functions are the only entry points, so the storage engine stays swappable.
 */

export interface User {
  id: string;
  email: string;
  emailLower: string;
  name: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

/** A stored PAT — the token is encrypted at rest (AES-256-GCM under the instance secret). */
export interface PatRecord {
  id: string;
  userId: string;
  name: string;
  last4: string;
  iv: string;
  ct: string;
  tag: string;
  createdAt: string;
}

const RUN_CAP = 200; // keep the newest N runs; older ones are pruned

function ensureDir(): string {
  const d = dataDir();
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
  return d;
}

/* ── Connection (lazy singleton) ──────────────────────────────────────────── */

// better-sqlite3 is a native module kept external from the bundle; require it at runtime.
const nodeRequire = createRequire(import.meta.url);
type SqliteDb = {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...args: unknown[]): { changes: number };
    get(...args: unknown[]): unknown;
    all(...args: unknown[]): unknown[];
  };
  pragma(s: string): void;
};

let _db: SqliteDb | null = null;
function db(): SqliteDb {
  if (_db) return _db;
  const Database = nodeRequire('better-sqlite3') as new (path: string) => SqliteDb;
  const conn = new Database(join(ensureDir(), 'studio.db'));
  conn.pragma('journal_mode = WAL');
  conn.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, email TEXT NOT NULL, emailLower TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL, passwordHash TEXT NOT NULL, salt TEXT NOT NULL, createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS presets (
      id TEXT PRIMARY KEY, userId TEXT NOT NULL, kind TEXT NOT NULL, name TEXT NOT NULL,
      request TEXT NOT NULL, createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pats (
      id TEXT PRIMARY KEY, userId TEXT NOT NULL, name TEXT NOT NULL, last4 TEXT NOT NULL,
      iv TEXT NOT NULL, ct TEXT NOT NULL, tag TEXT NOT NULL, createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY, userId TEXT NOT NULL, kind TEXT NOT NULL, createdAt TEXT NOT NULL,
      meta TEXT NOT NULL, payload TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_presets_user ON presets(userId);
    CREATE INDEX IF NOT EXISTS idx_pats_user ON pats(userId);
    CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(userId, createdAt DESC);
  `);
  _db = conn;
  return conn;
}

function id(): string {
  return randomBytes(12).toString('hex');
}

/* ── Session signing secret (file-based, independent of the DB) ────────────── */

export function getSecret(): Buffer {
  if (process.env['STUDIO_SECRET']) return Buffer.from(process.env['STUDIO_SECRET'], 'utf8');
  const p = join(ensureDir(), 'secret');
  if (existsSync(p)) return readFileSync(p);
  const secret = randomBytes(32);
  writeFileSync(p, secret);
  return secret;
}

/* ── Secret-box (AES-256-GCM) for tokens at rest ──────────────────────────── */

function aesKey(): Buffer {
  return createHash('sha256').update(getSecret()).digest();
}

function encryptSecret(plaintext: string): { iv: string; ct: string; tag: string } {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', aesKey(), iv);
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return { iv: iv.toString('base64'), ct: ct.toString('base64'), tag: cipher.getAuthTag().toString('base64') };
}

function decryptSecret(rec: { iv: string; ct: string; tag: string }): string | undefined {
  try {
    const decipher = createDecipheriv('aes-256-gcm', aesKey(), Buffer.from(rec.iv, 'base64'));
    decipher.setAuthTag(Buffer.from(rec.tag, 'base64'));
    return Buffer.concat([decipher.update(Buffer.from(rec.ct, 'base64')), decipher.final()]).toString('utf8');
  } catch {
    return undefined;
  }
}

/* ── Users ────────────────────────────────────────────────────────────────── */

export function findUserByEmail(email: string): User | undefined {
  const lower = email.trim().toLowerCase();
  return (db().prepare('SELECT * FROM users WHERE emailLower = ?').get(lower) as User | undefined) ?? undefined;
}

export function findUserById(userId: string): User | undefined {
  return (db().prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined) ?? undefined;
}

export function userCount(): number {
  return (db().prepare('SELECT COUNT(*) AS n FROM users').get() as { n: number }).n;
}

export async function createUser(input: { email: string; name: string; passwordHash: string; salt: string }): Promise<User> {
  const emailLower = input.email.trim().toLowerCase();
  if (findUserByEmail(emailLower)) throw new Error('That email is already registered.');
  const user: User = {
    id: id(),
    email: input.email.trim(),
    emailLower,
    name: input.name.trim() || input.email.trim().split('@')[0]!,
    passwordHash: input.passwordHash,
    salt: input.salt,
    createdAt: new Date().toISOString(),
  };
  db()
    .prepare('INSERT INTO users (id, email, emailLower, name, passwordHash, salt, createdAt) VALUES (?,?,?,?,?,?,?)')
    .run(user.id, user.email, user.emailLower, user.name, user.passwordHash, user.salt, user.createdAt);
  return user;
}

/* ── Presets ──────────────────────────────────────────────────────────────── */

function sanitizeRequest(req: RunRequest): RunRequest {
  const { pat: _pat, ...rest } = req;
  return rest;
}

export async function createPreset(userId: string, kind: StageSourceKind, name: string, request: RunRequest): Promise<PresetRecord> {
  const preset: PresetRecord = {
    id: id(),
    userId,
    kind,
    name: name.trim() || `${kind} preset`,
    request: sanitizeRequest(request),
    createdAt: new Date().toISOString(),
  };
  db()
    .prepare('INSERT INTO presets (id, userId, kind, name, request, createdAt) VALUES (?,?,?,?,?,?)')
    .run(preset.id, userId, kind, preset.name, JSON.stringify(preset.request), preset.createdAt);
  return preset;
}

export function listPresets(userId: string, kind?: StageSourceKind): PresetRecord[] {
  const rows = kind
    ? db().prepare('SELECT * FROM presets WHERE userId = ? AND kind = ? ORDER BY createdAt DESC').all(userId, kind)
    : db().prepare('SELECT * FROM presets WHERE userId = ? ORDER BY createdAt DESC').all(userId);
  return (rows as Array<{ id: string; userId: string; kind: StageSourceKind; name: string; request: string; createdAt: string }>).map((r) => ({
    id: r.id,
    userId: r.userId,
    kind: r.kind,
    name: r.name,
    request: JSON.parse(r.request) as RunRequest,
    createdAt: r.createdAt,
  }));
}

export async function deletePreset(userId: string, presetId: string): Promise<boolean> {
  return db().prepare('DELETE FROM presets WHERE id = ? AND userId = ?').run(presetId, userId).changes > 0;
}

/* ── PAT vault ────────────────────────────────────────────────────────────── */

function toPatDTO(p: PatRecord): PatDTO {
  return { id: p.id, name: p.name, last4: p.last4, createdAt: p.createdAt };
}

export async function createPat(userId: string, name: string, token: string): Promise<PatDTO> {
  const trimmed = token.trim();
  if (!trimmed) throw new Error('Token is empty.');
  const enc = encryptSecret(trimmed);
  const rec: PatRecord = {
    id: id(),
    userId,
    name: name.trim() || 'token',
    last4: trimmed.slice(-4),
    iv: enc.iv,
    ct: enc.ct,
    tag: enc.tag,
    createdAt: new Date().toISOString(),
  };
  db()
    .prepare('INSERT INTO pats (id, userId, name, last4, iv, ct, tag, createdAt) VALUES (?,?,?,?,?,?,?,?)')
    .run(rec.id, userId, rec.name, rec.last4, rec.iv, rec.ct, rec.tag, rec.createdAt);
  return toPatDTO(rec);
}

export function listPats(userId: string): PatDTO[] {
  const rows = db().prepare('SELECT * FROM pats WHERE userId = ? ORDER BY createdAt DESC').all(userId) as PatRecord[];
  return rows.map(toPatDTO);
}

/** Decrypt and return a stored token. Server-only — never expose the result to the browser. */
export function getPatToken(userId: string, patId: string): string | undefined {
  const rec = db().prepare('SELECT * FROM pats WHERE id = ? AND userId = ?').get(patId, userId) as PatRecord | undefined;
  return rec ? decryptSecret(rec) : undefined;
}

export async function deletePat(userId: string, patId: string): Promise<boolean> {
  return db().prepare('DELETE FROM pats WHERE id = ? AND userId = ?').run(patId, userId).changes > 0;
}

/* ── Runs ─────────────────────────────────────────────────────────────────── */

export async function saveRun(meta: RunMeta, payload: unknown): Promise<void> {
  const conn = db();
  conn
    .prepare('INSERT OR REPLACE INTO runs (id, userId, kind, createdAt, meta, payload) VALUES (?,?,?,?,?,?)')
    .run(meta.id, meta.userId, meta.kind, meta.createdAt, JSON.stringify(meta), JSON.stringify(payload));
  // Prune the oldest runs beyond the cap.
  conn.prepare('DELETE FROM runs WHERE id IN (SELECT id FROM runs ORDER BY createdAt DESC LIMIT -1 OFFSET ?)').run(RUN_CAP);
}

export function listRuns(userId: string, kind?: StageSourceKind, limit = 50): RunMeta[] {
  const rows = kind
    ? db().prepare('SELECT meta FROM runs WHERE userId = ? AND kind = ? ORDER BY createdAt DESC LIMIT ?').all(userId, kind, limit)
    : db().prepare('SELECT meta FROM runs WHERE userId = ? ORDER BY createdAt DESC LIMIT ?').all(userId, limit);
  return (rows as Array<{ meta: string }>).map((r) => JSON.parse(r.meta) as RunMeta);
}

export function getRunPayload(userId: string, runId: string): unknown | null {
  const row = db().prepare('SELECT payload FROM runs WHERE id = ? AND userId = ?').get(runId, userId) as { payload: string } | undefined;
  if (!row) return null;
  try {
    return JSON.parse(row.payload);
  } catch {
    return null;
  }
}

export async function deleteRun(userId: string, runId: string): Promise<boolean> {
  return db().prepare('DELETE FROM runs WHERE id = ? AND userId = ?').run(runId, userId).changes > 0;
}
