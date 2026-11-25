# delete_tag

## create

```
POST /delete_tag
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `tag_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/delete_tag" \
  -H "content-type: application/json" \
  -d '{"tag_id":"string"}'
```

```ts
await client.deleteTag.create({ tag_id: "..." });
```

```python
client.deleteTag.create(tag_id="...")
```

```bash
# cli
sdk delete-tag create --tag-id "..."
```

