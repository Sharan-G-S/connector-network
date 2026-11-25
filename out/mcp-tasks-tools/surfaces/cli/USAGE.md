# tasks — commands

### `tasks create-comment create --task-id <string> --body <string>`
Add a comment to a task.  (`POST /create_comment`)

### `tasks create-project create --name <string> [--status <string>]`
Create a project.  (`POST /create_project`)

### `tasks create-tag create --name <string> [--color <string>]`
Create a tag.  (`POST /create_tag`)

### `tasks create-task create --project-id <string> --title <string> [--assignee-id <string>] [--due-date <datetime>]`
Create a task in a project.  (`POST /create_task`)

### `tasks delete-comment create --comment-id <string>`
Delete a comment.  (`POST /delete_comment`)

### `tasks delete-project create --project-id <string>`
Delete a project.  (`POST /delete_project`)

### `tasks delete-tag create --tag-id <string>`
Delete a tag.  (`POST /delete_tag`)

### `tasks delete-task create --task-id <string>`
Delete a task.  (`POST /delete_task`)

### `tasks get-comment create --comment-id <string>`
Fetch one comment by id.  (`POST /get_comment`)

### `tasks get-project create --project-id <string>`
Fetch one project by id.  (`POST /get_project`)

### `tasks get-task create --task-id <string>`
Fetch one task by id.  (`POST /get_task`)

### `tasks get-user create --user-id <string>`
Fetch one user by id.  (`POST /get_user`)

### `tasks list-comments create --task-id <string> [--limit <integer>]`
List comments for a task.  (`POST /list_comments`)

### `tasks list-projects create [--status <string>] [--limit <integer>] [--cursor <string>]`
List projects, optionally filtered by status.  (`POST /list_projects`)

### `tasks list-tags create `
List tags.  (`POST /list_tags`)

### `tasks list-tasks create [--project-id <string>] [--status <string>] [--assignee-id <string>] [--limit <integer>]`
List tasks, filtered by project, status, or assignee.  (`POST /list_tasks`)

### `tasks list-users create [--limit <integer>] [--cursor <string>]`
List users.  (`POST /list_users`)

### `tasks update-project create --project-id <string> [--name <string>] [--status <string>]`
Update a project.  (`POST /update_project`)

### `tasks update-task create --task-id <string> [--status <string>] [--assignee-id <string>]`
Update a task.  (`POST /update_task`)
