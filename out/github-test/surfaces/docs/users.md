# users

## get

Fetch one user by id.

```
GET /users/{user_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `user_id` | path | string | yes |  |

**Returns:** `User` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/users/<user_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.users.get({ user_id: "..." });
```

```python
client.users.get(user_id="...")
```

```bash
# cli
tasks users get --user-id "..."
```

## list

List users.

```
GET /users
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `limit` | query | integer | no |  |
| `cursor` | query | string | no |  |

**Returns:** `UserPage` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/users" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.users.list({ limit: 0, cursor: "..." });
```

```python
client.users.list(limit=0, cursor="...")
```

```bash
# cli
tasks users list --limit 0 --cursor "..."
```

