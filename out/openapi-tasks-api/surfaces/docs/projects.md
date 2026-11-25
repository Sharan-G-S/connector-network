# projects

## create

Create a project.

```
POST /projects
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `name` | body | string | yes |  |
| `status` | body | string | no |  |

**Returns:** `Project` (status 201)

### Examples

```bash
# curl
curl -X POST "https://api.tasks.example/v1/projects" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"name":"string","status":"string"}'
```

```ts
await client.projects.create({ name: "...", status: "..." });
```

```python
client.projects.create(name="...", status="...")
```

```bash
# cli
tasks projects create --name "..." --status "..."
```

## delete

Delete a project.

```
DELETE /projects/{project_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | path | string | yes |  |

### Examples

```bash
# curl
curl -X DELETE "https://api.tasks.example/v1/projects/<project_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.projects.delete({ project_id: "..." });
```

```python
client.projects.delete(project_id="...")
```

```bash
# cli
tasks projects delete --project-id "..."
```

## get

Fetch one project by id.

```
GET /projects/{project_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | path | string | yes |  |

**Returns:** `Project` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/projects/<project_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.projects.get({ project_id: "..." });
```

```python
client.projects.get(project_id="...")
```

```bash
# cli
tasks projects get --project-id "..."
```

## list

List projects, optionally filtered by status.

```
GET /projects
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `status` | query | string | no |  |
| `limit` | query | integer | no |  |
| `cursor` | query | string | no |  |

**Returns:** `ProjectPage` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/projects" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.projects.list({ status: "...", limit: 0, cursor: "..." });
```

```python
client.projects.list(status="...", limit=0, cursor="...")
```

```bash
# cli
tasks projects list --status "..." --limit 0 --cursor "..."
```

## update

Update a project.

```
PATCH /projects/{project_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | path | string | yes |  |
| `name` | body | string | no |  |
| `status` | body | string | no |  |

**Returns:** `Project` (status 200)

### Examples

```bash
# curl
curl -X PATCH "https://api.tasks.example/v1/projects/<project_id>" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"name":"string","status":"string"}'
```

```ts
await client.projects.update({ project_id: "...", name: "...", status: "..." });
```

```python
client.projects.update(project_id="...", name="...", status="...")
```

```bash
# cli
tasks projects update --project-id "..." --name "..." --status "..."
```

