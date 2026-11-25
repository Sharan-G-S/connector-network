# get_user

## create

```
POST /get_user
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `user_id` | body | string | yes |  |

### Examples

```bash
# curl
curl -X POST "https://api.example/get_user" \
  -H "content-type: application/json" \
  -d '{"user_id":"string"}'
```

```ts
await client.getUser.create({ user_id: "..." });
```

```python
client.getUser.create(user_id="...")
```

```bash
# cli
sdk get-user create --user-id "..."
```

