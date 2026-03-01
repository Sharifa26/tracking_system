# tracking_system

a simple task tracking system inspired by JIRA. Provides user authentication, teams, tasks, comments, attachments, and AI-powered task description generation.

## Features

- User registration & login (JWT based)
- Profile management
- Team creation and membership management
- Task creation, update, deletion and retrieval
- Comments on tasks with edit/delete support
- File attachments per task
- AI-powered description generator for tasks
- Role-based access via auth middleware

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sharifa26/tracking_system.git
   cd tracking_system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables

   ```bash
   PORT=5000
   MONGO_URI= your_mongodb_uri
   JWT_SECRET= your_jwt_secret
   GEMINI_API_KEY= your_gemini_api_key
   ```

4. Start the server:
   ```bash
   npm start
   # or
   npm run dev
   ```

## API Endpoints

All endpoints except registration and login require a valid `Authorization` header:

```
Bearer <token>
```

### Authentication

- `POST /api/auth/register` – register a new user (`name`, `email`, `password`).
    <details>
    <summary>Example Request</summary>

    **Request URL:**

  ```json
  curl --location 'http://localhost:5000/api/auth/register' \
  --header 'Content-Type: application/json' \
  --data-raw '
  {
      "name": "Nadia Hussain",
      "email": "nadia.hussain@example.com",
      "password": "Password123"
  }'
  ```

    </details>

- `POST /api/auth/login` – log in and receive a JWT (`email`, `password`).
    <details>
    <summary>Example Request</summary>

    **Request URL:**

  ```json
  curl --location 'http://localhost:5000/api/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '
  {
      "email": "nadia.hussain@example.com",
      "password": "Password123"
  }'
  ```

    </details>

- `GET /api/auth/users` – list all users.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

      ```json
      curl --location 'http://localhost:5000/api/auth/users' \

        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIxNzc4NTksImV4cCI6MTc3MjI2NDI1OX0.bied2E-vigcrlq5sxGkUQ1ea_QDocUmLHgSuhKbIP7E'
      ```

 </details>

- `GET /api/auth/profile` – retrieve the current user’s profile.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

      ```json
      curl --location 'http://localhost:5000/api/auth/profile' \

        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIxNzc4NTksImV4cCI6MTc3MjI2NDI1OX0.bied2E-vigcrlq5sxGkUQ1ea_QDocUmLHgSuhKbIP7E'
      ```

 </details>

- `PUT /api/auth/profile` – update the current user’s profile.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/auth/profile' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIxNzc4NTksImV4cCI6MTc3MjI2NDI1OX0.bied2E-vigcrlq5sxGkUQ1ea_QDocUmLHgSuhKbIP7E' \
            --header 'Content-Type: application/json' \
            --data-raw '
            {
                "name": "Nadia Hussain",
                "email": "nadia.hussain@example.com",
                "password": "Password123"
            }'
    ```
 </details>

### Teams

- `POST /api/teams` – create a team (`name`).
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/teams' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0' \
            --data '{
                    "name": "Frontend Team",
                    "description": "Handles UI, React components, and client-side logic."
                    }'
    ```

 </details>

- `GET /api/teams` – list teams the authenticated user belongs to.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/teams' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0'
    ```

 </details>

- `GET /api/teams/:teamId` – get details for a specific team.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/teams/5f8d9f5a0a1e0c0d1a2b3c4d' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0'
    ```

 </details>

- `POST /api/teams/:teamId/members` – add a member to a team (`userId`).
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/teams/5f8d9f5a0a1e0c0d1a2b3c4d/members' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0' \
            --data '{
                    "userId": "5f8d9f5a0a1e0c0d1a2b3c4d"
                    }'
    ```

 </details>

- `DELETE /api/teams/:teamId/members/:userId` – remove a member from a team.
  <details>
  <summary>Example Request</summary> 

  **Request URL:**
    ```json
            curl --location 'http://localhost:5000/api/teams/5f8d9f5a0a1e0c0d1a2b3c4d/members/5f8d9f5a0a1e0c0d1a2b3c4d' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0'
    ```    
 </details>


### Tasks

- `POST /api/tasks` – create a task (`title`, `description`, `teamId`, `assigneeId`, `status`).
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/tasks' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0' \
            --data '{
                    "title": "Task 1",
                    "description": "This is a task description.",
                    "teamId": "5f8d9f5a0a1e0c0d1a2b3c4d",
                    "assigneeId": "5f8d9f5a0a1e0c0d1a2b3c4d",
                    "status": "in-progress"
                    }'
    ```
    </details>

- `GET /api/tasks` – retrieve all tasks.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/tasks' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0'
    ```

 </details> 

- `GET /api/tasks/mytask` – retrieve tasks assigned to the authenticated user.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/tasks/mytask' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0'
    ```    
 </details>

- `GET /api/tasks/:taskId` – retrieve a specific task.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/tasks/5f8d9f5a0a1e0c0d1a2b3c4d' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTI2YTQ1ZjlhNzkzNThlZDdkYmQ4MyIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNTQyMjQsImV4cCI6MTc3MjM0MDYyNH0.neDBHRZ_8Mli6kxDLJ6Bvuu-dXsMZq9IUkqgRH97WZ0'
    ```    
 </details>

- `PUT /api/tasks/:taskId` – update a task.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location --request PUT 'http://localhost:5000/api/tasks/69a2cc1df2afc6139662a87b' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTJjNTc2ZjJhZmM2MTM5NjYyYTgyYSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzY1MTMsImV4cCI6MTc3MjM2MjkxM30.5GzrJuq3tgcl1mf7MFxVoPe4vX3r4JVnDGkQpAli32I' \
            --data '{
            "status": "completed"
            }'
    ``` 
    </details>

- `DELETE /api/tasks/:taskId` – delete a task.
  <details>
  <summary>Example Request</summary>

  **Request URL:**

    ```json
            curl --location --request DELETE 'http://localhost:5000/api/tasks/69a2cb5af2afc6139662a871' \
                --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTJjNTc2ZjJhZmM2MTM5NjYyYTgyYSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzY1MTMsImV4cCI6MTc3MjM2MjkxM30.5GzrJuq3tgcl1mf7MFxVoPe4vX3r4JVnDGkQpAli32I'
    ``` 
    </details>

### Comments

- `POST /api/comments/:taskId` – add a comment to a task (`content`).
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/comments/69a2c2fbf2afc6139662a80c' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I' \
            --data '{
            "message": "Can you clarify the expected behavior for this API?"
            }'
    ```
    </details>

- `GET /api/comments/:taskId` – list comments for a task.
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/comments/69a2c2fbf2afc6139662a80c' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I'
    ```
    </details>

- `PUT /api/comments/:commentId` – edit a comment.
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location --request PUT 'http://localhost:5000/api/comments/69a2c2fbf2afc6139662a80c' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I' \
            --data '{
            "message": "Can you clarify the expected behavior for this API?"
            }'
    ```
    </details>


- `DELETE /api/comments/:commentId` – delete a comment.
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location --request DELETE 'http://localhost:5000/api/comments/69a2c2fbf2afc6139662a80c' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I'
    ```
    </details>

### Attachments

- `POST /api/attachments/:taskId` – upload a file (form-data field `file`).
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/attachments/69a2c2fbf2afc6139662a80c' \
            --header 'Content-Type: multipart/form-data' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I' \
            --form 'file=@d:\bel14\projects\tracking_system\uploads\test.txt'
    ```
    </details>

- `GET /api/attachments/:taskId` – list attachments for a task.
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/attachments/69a2c2fbf2afc6139662a80c' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I'
    ```
    </details>

- `DELETE /api/attachments/:attachmentId` – delete an attachment.
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location --request DELETE 'http://localhost:5000/api/attachments/69a2c2fbf2afc6139662a80c' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I'
    ```
    </details>


### AI

- `POST /api/ai/generate-description` – generate a task description (provide `prompt`).
    <details>
    <summary>Example Request</summary>

    **Request URL:**

    ```json
            curl --location 'http://localhost:5000/api/ai/generate-description' \
            --header 'Content-Type: application/json' \
            --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTE0OGY2OGI4NjAyNWVmODM2MTRjOCIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3NzIyNzQyNjYsImV4cCI6MTc3MjM2MDY2Nn0.346kTJtJQJdwxznolWIJI5GroTZlHDxSbByDjD8GA6I' \
            --data '{
            "prompt": "Write a task description for the following task: Create a new user account."
            }'
    ```
    </details>
    

## Technologies

- Node.js & Express
- MongoDB (via Mongoose models)
- JWT for authentication
- Multer for file uploads
- AI service integration (e.g. OpenAI) for description generation

## Directory Structure

```
config/           # configuration (database, etc.)
controllers/      # request handlers
middlewares/      # auth, upload, etc.
models/           # data models (User, Task, Comment, etc.)
routes/           # express route definitions
services/         # business logic and external API integrations
uploads/          # stored attachments
```

## Notes

- Uploaded files are stored in `uploads/`.
- Be sure to set up required environment variables before running.
- You can test the API using Postman, curl, or similar tools.


**Sharifa Sheriff** ✨
📧 Email: [sharifasheriff26@gmail.com](mailto:sharifasheriff26@gmail.com)
