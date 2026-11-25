# get_task

## create

```
POST /get_task
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/get_task" \
  -H "content-type: application/json" \
  -d '{"task_id":"string"}'
```

```ts
await client.getTask.create({ task_id: "..." });
```

```python
client.getTask.create(task_id="...")
```

```bash
# cli
sdk get-task create --task-id "..."
```

