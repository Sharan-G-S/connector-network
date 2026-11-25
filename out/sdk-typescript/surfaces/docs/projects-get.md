# projects_get

## create

Fetch one project by id.

```
POST /projects_get
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `projectId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/projects_get" \
  -H "content-type: application/json" \
  -d '{"projectId":"string"}'
```

```ts
await client.projectsGet.create({ projectId: "..." });
```

```python
client.projectsGet.create(projectId="...")
```

```bash
# cli
sdk projects-get create --project-id "..."
```

