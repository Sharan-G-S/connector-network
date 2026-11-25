# comments_list

## create

List comments for a task.

```
POST /comments_list
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `taskId` | body | string | yes |  |
| `limit` | body | number | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/comments_list" \
  -H "content-type: application/json" \
  -d '{"taskId":"string","limit":0}'
```

```ts
await client.commentsList.create({ taskId: "...", limit: 0 });
```

```python
client.commentsList.create(taskId="...", limit=0)
```

```bash
# cli
sdk comments-list create --task-id "..." --limit 0
```

