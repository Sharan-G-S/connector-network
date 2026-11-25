# comments

## create

Add a comment to a task.

```
POST /comments
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | body | string | yes |  |
| `body` | body | string | yes |  |

**Returns:** `Comment` (status 201)

### Examples

```bash
# curl
curl -X POST "https://api.tasks.example/v1/comments" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"task_id":"string","body":"string"}'
```

```ts
await client.comments.create({ task_id: "...", body: "..." });
```

```python
client.comments.create(task_id="...", body="...")
```

```bash
# cli
tasks comments create --task-id "..." --body "..."
```

## delete

Delete a comment.

```
DELETE /comments/{comment_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `comment_id` | path | string | yes |  |

### Examples

```bash
# curl
curl -X DELETE "https://api.tasks.example/v1/comments/<comment_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.comments.delete({ comment_id: "..." });
```

```python
client.comments.delete(comment_id="...")
```

```bash
# cli
tasks comments delete --comment-id "..."
```

## get

Fetch one comment by id.

```
GET /comments/{comment_id}
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `comment_id` | path | string | yes |  |

**Returns:** `Comment` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/comments/<comment_id>" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.comments.get({ comment_id: "..." });
```

```python
client.comments.get(comment_id="...")
```

```bash
# cli
tasks comments get --comment-id "..."
```

## list

List comments for a task.

```
GET /comments
```

| name | in | type | required | description |
| --- | --- | --- | --- | --- |
| `task_id` | query | string | yes |  |
| `limit` | query | integer | no |  |
| `cursor` | query | string | no |  |

**Returns:** `CommentPage` (status 200)

### Examples

```bash
# curl
curl -X GET "https://api.tasks.example/v1/comments" \
  -H "authorization: Bearer $TOKEN"
```

```ts
await client.comments.list({ task_id: "...", limit: 0, cursor: "..." });
```

```python
client.comments.list(task_id="...", limit=0, cursor="...")
```

```bash
# cli
tasks comments list --task-id "..." --limit 0 --cursor "..."
```

