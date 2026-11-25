# tasks_create

## create

Create a task in a project.

```
POST /tasks_create
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `projectId` | body | string | yes |  |
| `title` | body | string | yes |  |
| `assigneeId` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/tasks_create" \
  -H "content-type: application/json" \
  -d '{"projectId":"string","title":"string","assigneeId":"string"}'
```

```ts
await client.tasksCreate.create({ projectId: "...", title: "...", assigneeId: "..." });
```

```python
client.tasksCreate.create(projectId="...", title="...", assigneeId="...")
```

```bash
# cli
sdk tasks-create create --project-id "..." --title "..." --assignee-id "..."
```

