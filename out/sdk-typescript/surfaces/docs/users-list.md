# users_list

## create

List users.

```
POST /users_list
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `limit` | body | number | no |  |
| `cursor` | body | string | no |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/users_list" \
  -H "content-type: application/json" \
  -d '{"limit":0,"cursor":"string"}'
```

```ts
await client.usersList.create({ limit: 0, cursor: "..." });
```

```python
client.usersList.create(limit=0, cursor="...")
```

```bash
# cli
sdk users-list create --limit 0 --cursor "..."
```

