# tasks_update

## create

Update a task.

```
POST /tasks_update
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `taskId` | body | string | yes |  |
| `status` | body | string | no |  |
| `assigneeId` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tasks_update" \
  -H "content-type: application/json" \
  -d '{"taskId":"string","status":"string","assigneeId":"string"}'
```

```ts
await client.tasksUpdate.create({ taskId: "...", status: "...", assigneeId: "..." });
```

```python
client.tasksUpdate.create(taskId="...", status="...", assigneeId="...")
```

```bash
# cli
sdk tasks-update create --task-id "..." --status "..." --assignee-id "..."
```

