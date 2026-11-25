# get_project

## create

```
POST /get_project
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/get_project" \
  -H "content-type: application/json" \
  -d '{"project_id":"string"}'
```

```ts
await client.getProject.create({ project_id: "..." });
```

```python
client.getProject.create(project_id="...")
```

```bash
# cli
sdk get-project create --project-id "..."
```

