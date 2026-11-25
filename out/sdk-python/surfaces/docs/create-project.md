# create_project

## create

```
POST /create_project
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `name` | body | string | yes |  |
| `status` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/create_project" \
  -H "content-type: application/json" \
  -d '{"name":"string","status":"string"}'
```

```ts
await client.createProject.create({ name: "...", status: "..." });
```

```python
client.createProject.create(name="...", status="...")
```

```bash
# cli
sdk create-project create --name "..." --status "..."
```

