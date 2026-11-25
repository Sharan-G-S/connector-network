# delete_project

## create

Delete a project.

```
POST /delete_project
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/delete_project" \
  -H "content-type: application/json" \
  -d '{"project_id":"string"}'
```

```ts
await client.deleteProject.create({ project_id: "..." });
```

```python
client.deleteProject.create(project_id="...")
```

```bash
# cli
tasks delete-project create --project-id "..."
```

