# sdk — commands

### `sdk comments-create create --task-id <string> --body <string>`
Add a comment to a task.  (`POST /comments_create`)

### `sdk comments-get create --comment-id <string>`
Fetch one comment by id.  (`POST /comments_get`)

### `sdk comments-list create --task-id <string> [--limit <number>]`
List comments for a task.  (`POST /comments_list`)

### `sdk comments-remove create --comment-id <string>`
Delete a comment.  (`POST /comments_remove`)

### `sdk projects-create create --name <string> [--status <string>]`
Create a project.  (`POST /projects_create`)

### `sdk projects-get create --project-id <string>`
Fetch one project by id.  (`POST /projects_get`)

### `sdk projects-list create [--status <string>] [--limit <number>] [--cursor <string>]`
List projects, optionally filtered by status.  (`POST /projects_list`)

### `sdk projects-remove create --project-id <string>`
Delete a project.  (`POST /projects_remove`)

### `sdk projects-update create --project-id <string> [--name <string>] [--status <string>]`
Update a project.  (`POST /projects_update`)

### `sdk tags-create create --name <string> [--color <string>]`
Create a tag.  (`POST /tags_create`)

### `sdk tags-list create `
List tags.  (`POST /tags_list`)

### `sdk tags-remove create --tag-id <string>`
Delete a tag.  (`POST /tags_remove`)

### `sdk tasks-create create --project-id <string> --title <string> [--assignee-id <string>]`
Create a task in a project.  (`POST /tasks_create`)

### `sdk tasks-get create --task-id <string>`
Fetch one task by id.  (`POST /tasks_get`)

### `sdk tasks-list create [--project-id <string>] [--status <string>] [--assignee-id <string>]`
List tasks, filtered by project, status, or assignee.  (`POST /tasks_list`)

### `sdk tasks-remove create --task-id <string>`
Delete a task.  (`POST /tasks_remove`)

### `sdk tasks-update create --task-id <string> [--status <string>] [--assignee-id <string>]`
Update a task.  (`POST /tasks_update`)

### `sdk users-get create --user-id <string>`
Fetch one user by id.  (`POST /users_get`)

### `sdk users-list create [--limit <number>] [--cursor <string>]`
List users.  (`POST /users_list`)
