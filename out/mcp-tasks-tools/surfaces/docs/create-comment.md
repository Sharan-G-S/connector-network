# create_comment

## create

Add a comment to a task.

```
POST /create_comment
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |
| `body` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/create_comment" \
  -H "content-type: application/json" \
  -d '{"task_id":"string","body":"string"}'
```

```ts
await client.createComment.create({ task_id: "...", body: "..." });
```

```python
client.createComment.create(task_id="...", body="...")
```

```bash
# cli
tasks create-comment create --task-id "..." --body "..."
```

