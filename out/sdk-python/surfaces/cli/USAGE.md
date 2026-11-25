# sdk — commands

### `sdk create-comment create --task-id <string> --body <string>`
POST /create_comment  (`POST /create_comment`)

### `sdk create-project create --name <string> [--status <string>]`
POST /create_project  (`POST /create_project`)

### `sdk create-tag create --name <string> [--color <string>]`
POST /create_tag  (`POST /create_tag`)

### `sdk create-task create --project-id <string> --title <string> [--assignee-id <string>]`
POST /create_task  (`POST /create_task`)

### `sdk delete-comment create --comment-id <string>`
POST /delete_comment  (`POST /delete_comment`)

### `sdk delete-project create --project-id <string>`
POST /delete_project  (`POST /delete_project`)

### `sdk delete-tag create --tag-id <string>`
POST /delete_tag  (`POST /delete_tag`)

### `sdk delete-task create --task-id <string>`
POST /delete_task  (`POST /delete_task`)

### `sdk get-comment create --comment-id <string>`
POST /get_comment  (`POST /get_comment`)

### `sdk get-project create --project-id <string>`
POST /get_project  (`POST /get_project`)

### `sdk get-task create --task-id <string>`
POST /get_task  (`POST /get_task`)

### `sdk get-user create --user-id <string>`
POST /get_user  (`POST /get_user`)

### `sdk list-comments create --task-id <string> [--limit <number>]`
POST /list_comments  (`POST /list_comments`)

### `sdk list-projects create [--status <string>] [--limit <number>] [--cursor <string>]`
POST /list_projects  (`POST /list_projects`)

### `sdk list-tags create `
POST /list_tags  (`POST /list_tags`)

### `sdk list-tasks create [--project-id <string>] [--status <string>] [--assignee-id <string>]`
POST /list_tasks  (`POST /list_tasks`)

### `sdk list-users create [--limit <number>] [--cursor <string>]`
POST /list_users  (`POST /list_users`)

### `sdk update-project create --project-id <string> [--name <string>] [--status <string>]`
POST /update_project  (`POST /update_project`)

### `sdk update-task create --task-id <string> [--status <string>] [--assignee-id <string>]`
POST /update_task  (`POST /update_task`)
