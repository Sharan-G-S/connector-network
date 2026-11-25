# tags

## create

Create a tag.

```
POST /tags
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `name` | body | string | yes |  |
| `color` | body | string | no |  |

**Returns:** `Tag` (status 201)

### Examples

```bash
# curl
curl -X POST "https://api.tasks.example/v1/tags" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"name":"string","color":"string"}'
```

```ts
await client.tags.create({ name: "...", color: "..." });
```

```python
client.tags.create(name="...", color="...")
```

```bash
# cli
tasks tags create --name "..." --color "..."
```

## delete

Delete a tag.

```
DELETE /tags/{tag_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `tag_id` | path | string | yes |  |

### Examples

```bash
# curl
curl -X DELETE "https://api.tasks.example/v1/tags/<tag_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.tags.delete({ tag_id: "..." });
```

```python
client.tags.delete(tag_id="...")
```

```bash
# cli
tasks tags delete --tag-id "..."
```

## list

List tags.

```
GET /tags
```

_No parameters._

**Returns:** `TagPage` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/tags" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.tags.list();
```

```python
client.tags.list()
```

```bash
# cli
tasks tags list
```

