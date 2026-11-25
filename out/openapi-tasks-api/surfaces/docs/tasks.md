# tasks

## create

Create a task in a project.

```
POST /tasks
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | body | string | yes |  |
| `title` | body | string | yes |  |
| `status` | body | string | no |  |
| `assignee_id` | body | string | no |  |
| `due_date` | body | datetime | no |  |

**Returns:** `Task` (status 201)

### Examples

```bash
# curl
curl -X POST "https://api.tasks.example/v1/tasks" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"project_id":"string","title":"string","status":"string","assignee_id":"string","due_date":"string"}'
```

```ts
await client.tasks.create({ project_id: "...", title: "...", status: "...", assignee_id: "...", due_date: "..." });
```

```python
client.tasks.create(project_id="...", title="...", status="...", assignee_id="...", due_date="...")
```

```bash
# cli
tasks tasks create --project-id "..." --title "..." --status "..." --assignee-id "..." --due-date "..."
```

## delete

Delete a task.

```
DELETE /tasks/{task_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | path | string | yes |  |

### Examples

```bash
# curl
curl -X DELETE "https://api.tasks.example/v1/tasks/<task_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.tasks.delete({ task_id: "..." });
```

```python
client.tasks.delete(task_id="...")
```

```bash
# cli
tasks tasks delete --task-id "..."
```

## get

Fetch one task by id.

```
GET /tasks/{task_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | path | string | yes |  |

**Returns:** `Task` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/tasks/<task_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.tasks.get({ task_id: "..." });
```

```python
client.tasks.get(task_id="...")
```

```bash
# cli
tasks tasks get --task-id "..."
```

## list

List tasks, filtered by project, status, or assignee.

```
GET /tasks
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `project_id` | query | string | no |  |
| `status` | query | string | no |  |
| `assignee_id` | query | string | no |  |
| `limit` | query | integer | no |  |
| `cursor` | query | string | no |  |

**Returns:** `TaskPage` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/tasks" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.tasks.list({ project_id: "...", status: "...", assignee_id: "...", limit: 0, cursor: "..." });
```

```python
client.tasks.list(project_id="...", status="...", assignee_id="...", limit=0, cursor="...")
```

```bash
# cli
tasks tasks list --project-id "..." --status "..." --assignee-id "..." --limit 0 --cursor "..."
```

## update

Update a task (status, assignee, due date, ...).

```
PATCH /tasks/{task_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | path | string | yes |  |
| `title` | body | string | no |  |
| `status` | body | string | no |  |
| `assignee_id` | body | string | no |  |
| `due_date` | body | datetime | no |  |

**Returns:** `Task` (status 200)

### Examples

```bash
# curl
curl -X PATCH "https://api.tasks.example/v1/tasks/<task_id>" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"title":"string","status":"string","assignee_id":"string","due_date":"string"}'
```

```ts
await client.tasks.update({ task_id: "...", title: "...", status: "...", assignee_id: "...", due_date: "..." });
```

```python
client.tasks.update(task_id="...", title="...", status="...", assignee_id="...", due_date="...")
```

```bash
# cli
tasks tasks update --task-id "..." --title "..." --status "..." --assignee-id "..." --due-date "..."
```

