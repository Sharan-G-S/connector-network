# comments_remove

## create

Delete a comment.

```
POST /comments_remove
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `commentId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/comments_remove" \
  -H "content-type: application/json" \
  -d '{"commentId":"string"}'
```

```ts
await client.commentsRemove.create({ commentId: "..." });
```

```python
client.commentsRemove.create(commentId="...")
```

```bash
# cli
sdk comments-remove create --comment-id "..."
```

