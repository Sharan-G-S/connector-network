# list_comments

## create

List comments for a task.

```
POST /list_comments
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |
| `limit` | body | integer | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/list_comments" \
  -H "content-type: application/json" \
  -d '{"task_id":"string","limit":0}'
```

```ts
await client.listComments.create({ task_id: "...", limit: 0 });
```

```python
client.listComments.create(task_id="...", limit=0)
```

```bash
# cli
tasks list-comments create --task-id "..." --limit 0
```

