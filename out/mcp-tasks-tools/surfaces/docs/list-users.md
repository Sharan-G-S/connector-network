# list_users

## create

List users.

```
POST /list_users
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `limit` | body | integer | no |  |
| `cursor` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/list_users" \
  -H "content-type: application/json" \
  -d '{"limit":0,"cursor":"string"}'
```

```ts
await client.listUsers.create({ limit: 0, cursor: "..." });
```

```python
client.listUsers.create(limit=0, cursor="...")
```

```bash
# cli
tasks list-users create --limit 0 --cursor "..."
```

