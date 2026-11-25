# list_tasks

## create

```
POST /list_tasks
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | no |  |
| `status` | body | string | no |  |
| `assignee_id` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/list_tasks" \
  -H "content-type: application/json" \
  -d '{"project_id":"string","status":"string","assignee_id":"string"}'
```

```ts
await client.listTasks.create({ project_id: "...", status: "...", assignee_id: "..." });
```

```python
client.listTasks.create(project_id="...", status="...", assignee_id="...")
```

```bash
# cli
sdk list-tasks create --project-id "..." --status "..." --assignee-id "..."
```

