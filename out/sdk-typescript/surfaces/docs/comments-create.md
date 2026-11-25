# comments_create

## create

Add a comment to a task.

```
POST /comments_create
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `taskId` | body | string | yes |  |
| `body` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/comments_create" \
  -H "content-type: application/json" \
  -d '{"taskId":"string","body":"string"}'
```

```ts
await client.commentsCreate.create({ taskId: "...", body: "..." });
```

```python
client.commentsCreate.create(taskId="...", body="...")
```

```bash
# cli
sdk comments-create create --task-id "..." --body "..."
```

