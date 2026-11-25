# update_task

## create

Update a task.

```
POST /update_task
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |
| `status` | body | string | no |  |
| `assignee_id` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/update_task" \
  -H "content-type: application/json" \
  -d '{"task_id":"string","status":"string","assignee_id":"string"}'
```

```ts
await client.updateTask.create({ task_id: "...", status: "...", assignee_id: "..." });
```

```python
client.updateTask.create(task_id="...", status="...", assignee_id="...")
```

```bash
# cli
tasks update-task create --task-id "..." --status "..." --assignee-id "..."
```

