# users_get

## create

Fetch one user by id.

```
POST /users_get
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `userId` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/users_get" \
  -H "content-type: application/json" \
  -d '{"userId":"string"}'
```

```ts
await client.usersGet.create({ userId: "..." });
```

```python
client.usersGet.create(userId="...")
```

```bash
# cli
sdk users-get create --user-id "..."
```

