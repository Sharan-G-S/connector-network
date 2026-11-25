# tags_remove

## create

Delete a tag.

```
POST /tags_remove
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `tagId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tags_remove" \
  -H "content-type: application/json" \
  -d '{"tagId":"string"}'
```

```ts
await client.tagsRemove.create({ tagId: "..." });
```

```python
client.tagsRemove.create(tagId="...")
```

```bash
# cli
sdk tags-remove create --tag-id "..."
```

