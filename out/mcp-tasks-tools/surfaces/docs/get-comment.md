# get_comment

## create

Fetch one comment by id.

```
POST /get_comment
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `comment_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/get_comment" \
  -H "content-type: application/json" \
  -d '{"comment_id":"string"}'
```

```ts
await client.getComment.create({ comment_id: "..." });
```

```python
client.getComment.create(comment_id="...")
```

```bash
# cli
tasks get-comment create --comment-id "..."
```

