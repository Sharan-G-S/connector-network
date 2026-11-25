# Tasks API — TypeScript SDK

Generated from the connector IR. Base URL: `https://api.tasks.example/v1`.

```ts
import { TasksApiClient } from 'tasks-api-sdk';

const client = new TasksApiClient({ token: process.env.API_TOKEN });
const result = await client.comments.create({ /* params */ });
```
