# comments_get

## create

Fetch one comment by id.

```
POST /comments_get
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `commentId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/comments_get" \
  -H "content-type: application/json" \
  -d '{"commentId":"string"}'
```

```ts
await client.commentsGet.create({ commentId: "..." });
```

```python
client.commentsGet.create(commentId="...")
```

```bash
# cli
sdk comments-get create --comment-id "..."
```

