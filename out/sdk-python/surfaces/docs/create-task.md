# create_task

## create

```
POST /create_task
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | yes |  |
| `title` | body | string | yes |  |
| `assignee_id` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/create_task" \
  -H "content-type: application/json" \
  -d '{"project_id":"string","title":"string","assignee_id":"string"}'
```

```ts
await client.createTask.create({ project_id: "...", title: "...", assignee_id: "..." });
```

```python
client.createTask.create(project_id="...", title="...", assignee_id="...")
```

```bash
# cli
sdk create-task create --project-id "..." --title "..." --assignee-id "..."
```

