# list_comments

## create

```
POST /list_comments
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |
| `limit` | body | number | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/list_comments" \
  -H "content-type: application/json" \
  -d '{"task_id":"string","limit":0}'
```

```ts
await client.listComments.create({ task_id: "...", limit: 0 });
```

```python
client.listComments.create(task_id="...", limit=0)
```

```bash
# cli
sdk list-comments create --task-id "..." --limit 0
```

