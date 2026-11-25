# create_task

## create

Create a task in a project.

```
POST /create_task
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | yes |  |
| `title` | body | string | yes |  |
| `assignee_id` | body | string | no |  |
| `due_date` | body | datetime | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/create_task" \
  -H "content-type: application/json" \
  -d '{"project_id":"string","title":"string","assignee_id":"string","due_date":"string"}'
```

```ts
await client.createTask.create({ project_id: "...", title: "...", assignee_id: "...", due_date: "..." });
```

```python
client.createTask.create(project_id="...", title="...", assignee_id="...", due_date="...")
```

```bash
# cli
tasks create-task create --project-id "..." --title "..." --assignee-id "..." --due-date "..."
```

