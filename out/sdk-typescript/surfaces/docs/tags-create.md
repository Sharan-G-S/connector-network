# tags_create

## create

Create a tag.

```
POST /tags_create
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `name` | body | string | yes |  |
| `color` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tags_create" \
  -H "content-type: application/json" \
  -d '{"name":"string","color":"string"}'
```

```ts
await client.tagsCreate.create({ name: "...", color: "..." });
```

```python
client.tagsCreate.create(name="...", color="...")
```

```bash
# cli
sdk tags-create create --name "..." --color "..."
```

