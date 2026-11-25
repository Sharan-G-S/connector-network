# projects_update

## create

Update a project.

```
POST /projects_update
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `projectId` | body | string | yes |  |
| `name` | body | string | no |  |
| `status` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/projects_update" \
  -H "content-type: application/json" \
  -d '{"projectId":"string","name":"string","status":"string"}'
```

```ts
await client.projectsUpdate.create({ projectId: "...", name: "...", status: "..." });
```

```python
client.projectsUpdate.create(projectId="...", name="...", status="...")
```

```bash
# cli
sdk projects-update create --project-id "..." --name "..." --status "..."
```

