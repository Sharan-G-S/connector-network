# projects_create

## create

Create a project.

```
POST /projects_create
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `name` | body | string | yes |  |
| `status` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/projects_create" \
  -H "content-type: application/json" \
  -d '{"name":"string","status":"string"}'
```

```ts
await client.projectsCreate.create({ name: "...", status: "..." });
```

```python
client.projectsCreate.create(name="...", status="...")
```

```bash
# cli
sdk projects-create create --name "..." --status "..."
```

