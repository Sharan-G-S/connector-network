# list_projects

## create

List projects, optionally filtered by status.

```
POST /list_projects
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `status` | body | string | no |  |
| `limit` | body | integer | no |  |
| `cursor` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/list_projects" \
  -H "content-type: application/json" \
  -d '{"status":"string","limit":0,"cursor":"string"}'
```

```ts
await client.listProjects.create({ status: "...", limit: 0, cursor: "..." });
```

```python
client.listProjects.create(status="...", limit=0, cursor="...")
```

```bash
# cli
tasks list-projects create --status "..." --limit 0 --cursor "..."
```

