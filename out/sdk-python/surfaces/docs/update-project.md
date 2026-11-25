# update_project

## create

```
POST /update_project
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | yes |  |
| `name` | body | string | no |  |
| `status` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/update_project" \
  -H "content-type: application/json" \
  -d '{"project_id":"string","name":"string","status":"string"}'
```

```ts
await client.updateProject.create({ project_id: "...", name: "...", status: "..." });
```

```python
client.updateProject.create(project_id="...", name="...", status="...")
```

```bash
# cli
sdk update-project create --project-id "..." --name "..." --status "..."
```

