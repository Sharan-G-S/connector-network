# tasks_remove

## create

Delete a task.

```
POST /tasks_remove
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `taskId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tasks_remove" \
  -H "content-type: application/json" \
  -d '{"taskId":"string"}'
```

```ts
await client.tasksRemove.create({ taskId: "..." });
```

```python
client.tasksRemove.create(taskId="...")
```

```bash
# cli
sdk tasks-remove create --task-id "..."
```

