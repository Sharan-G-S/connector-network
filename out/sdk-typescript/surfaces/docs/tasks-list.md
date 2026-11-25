# tasks_list

## create

List tasks, filtered by project, status, or assignee.

```
POST /tasks_list
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `projectId` | body | string | no |  |
| `status` | body | string | no |  |
| `assigneeId` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tasks_list" \
  -H "content-type: application/json" \
  -d '{"projectId":"string","status":"string","assigneeId":"string"}'
```

```ts
await client.tasksList.create({ projectId: "...", status: "...", assigneeId: "..." });
```

```python
client.tasksList.create(projectId="...", status="...", assigneeId="...")
```

```bash
# cli
sdk tasks-list create --project-id "..." --status "..." --assignee-id "..."
```

