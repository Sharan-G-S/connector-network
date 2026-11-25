# delete_comment

## create

Delete a comment.

```
POST /delete_comment
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `comment_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/delete_comment" \
  -H "content-type: application/json" \
  -d '{"comment_id":"string"}'
```

```ts
await client.deleteComment.create({ comment_id: "..." });
```

```python
client.deleteComment.create(comment_id="...")
```

```bash
# cli
tasks delete-comment create --comment-id "..."
```

