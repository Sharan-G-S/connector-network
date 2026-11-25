# delete_task

## create

```
POST /delete_task
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/delete_task" \
  -H "content-type: application/json" \
  -d '{"task_id":"string"}'
```

```ts
await client.deleteTask.create({ task_id: "..." });
```

```python
client.deleteTask.create(task_id="...")
```

```bash
# cli
sdk delete-task create --task-id "..."
```

