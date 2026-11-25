# list_tasks

## create

List tasks, filtered by project, status, or assignee.

```
POST /list_tasks
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | no |  |
| `status` | body | string | no |  |
| `assignee_id` | body | string | no |  |
| `limit` | body | integer | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/list_tasks" \
  -H "content-type: application/json" \
  -d '{"project_id":"string","status":"string","assignee_id":"string","limit":0}'
```

```ts
await client.listTasks.create({ project_id: "...", status: "...", assignee_id: "...", limit: 0 });
```

```python
client.listTasks.create(project_id="...", status="...", assignee_id="...", limit=0)
```

```bash
# cli
tasks list-tasks create --project-id "..." --status "..." --assignee-id "..." --limit 0
```

