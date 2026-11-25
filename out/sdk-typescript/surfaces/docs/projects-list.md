# projects_list

## create

List projects, optionally filtered by status.

```
POST /projects_list
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `status` | body | string | no |  |
| `limit` | body | number | no |  |
| `cursor` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/projects_list" \
  -H "content-type: application/json" \
  -d '{"status":"string","limit":0,"cursor":"string"}'
```

```ts
await client.projectsList.create({ status: "...", limit: 0, cursor: "..." });
```

```python
client.projectsList.create(status="...", limit=0, cursor="...")
```

```bash
# cli
sdk projects-list create --status "..." --limit 0 --cursor "..."
```

