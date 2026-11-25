# projects_remove

## create

Delete a project.

```
POST /projects_remove
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `projectId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/projects_remove" \
  -H "content-type: application/json" \
  -d '{"projectId":"string"}'
```

```ts
await client.projectsRemove.create({ projectId: "..." });
```

```python
client.projectsRemove.create(projectId="...")
```

```bash
# cli
sdk projects-remove create --project-id "..."
```

