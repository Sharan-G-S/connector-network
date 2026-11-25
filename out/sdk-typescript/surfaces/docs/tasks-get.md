# tasks_get

## create

Fetch one task by id.

```
POST /tasks_get
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `taskId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tasks_get" \
  -H "content-type: application/json" \
  -d '{"taskId":"string"}'
```

```ts
await client.tasksGet.create({ taskId: "..." });
```

```python
client.tasksGet.create(taskId="...")
```

```bash
# cli
sdk tasks-get create --task-id "..."
```

