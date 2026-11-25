# tasks — commands

### `tasks comments create --task-id <string> --body <string>`
Add a comment to a task.  (`POST /comments`)

### `tasks comments delete --comment-id <string>`
Delete a comment.  (`DELETE /comments/{comment_id}`)

### `tasks comments get --comment-id <string>`
Fetch one comment by id.  (`GET /comments/{comment_id}`)

### `tasks comments list --task-id <string> [--limit <integer>] [--cursor <string>]`
List comments for a task.  (`GET /comments`)

### `tasks projects create --name <string> [--status <string>]`
Create a project.  (`POST /projects`)

### `tasks projects delete --project-id <string>`
Delete a project.  (`DELETE /projects/{project_id}`)

### `tasks projects get --project-id <string>`
Fetch one project by id.  (`GET /projects/{project_id}`)

### `tasks projects list [--status <string>] [--limit <integer>] [--cursor <string>]`
List projects, optionally filtered by status.  (`GET /projects`)

### `tasks projects update --project-id <string> [--name <string>] [--status <string>]`
Update a project.  (`PATCH /projects/{project_id}`)

### `tasks tags create --name <string> [--color <string>]`
Create a tag.  (`POST /tags`)

### `tasks tags delete --tag-id <string>`
Delete a tag.  (`DELETE /tags/{tag_id}`)

### `tasks tags list `
List tags.  (`GET /tags`)

### `tasks tasks create --project-id <string> --title <string> [--status <string>] [--assignee-id <string>] [--due-date <datetime>]`
Create a task in a project.  (`POST /tasks`)

### `tasks tasks delete --task-id <string>`
Delete a task.  (`DELETE /tasks/{task_id}`)

### `tasks tasks get --task-id <string>`
Fetch one task by id.  (`GET /tasks/{task_id}`)

### `tasks tasks list [--project-id <string>] [--status <string>] [--assignee-id <string>] [--limit <integer>] [--cursor <string>]`
List tasks, filtered by project, status, or assignee.  (`GET /tasks`)

### `tasks tasks update --task-id <string> [--title <string>] [--status <string>] [--assignee-id <string>] [--due-date <datetime>]`
Update a task (status, assignee, due date, ...).  (`PATCH /tasks/{task_id}`)

### `tasks users get --user-id <string>`
Fetch one user by id.  (`GET /users/{user_id}`)

### `tasks users list [--limit <integer>] [--cursor <string>]`
List users.  (`GET /users`)
