# create_tag

## create

```
POST /create_tag
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `name` | body | string | yes |  |
| `color` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/create_tag" \
  -H "content-type: application/json" \
  -d '{"name":"string","color":"string"}'
```

```ts
await client.createTag.create({ name: "...", color: "..." });
```

```python
client.createTag.create(name="...", color="...")
```

```bash
# cli
sdk create-tag create --name "..." --color "..."
```

