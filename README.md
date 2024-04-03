# Blog-web

it's a simple blogging application to read, and write blogs.

## How to run 🏃🏽‍♂️ locally?

1. Backend

   - First create a `.env` file at `backend` directory. then put this following data,

   ```bash
   PORT = 8080
   JWT_Secret = "YourSecretPassword"
   DATABASE_URL = "postgres connection string"
   ```

   - now run this command in `terminal`

   ```bash
   cd .\backend\   #go to the backend directory
   npm install     #install npm package
   npx prisma generate  #generate prisma client
   npm run dev     #start the server
   ```

2. Frontend
   - now run this command on another `terminal`
   ```bash
   cd .\frontend\   #go to the frontend directory
   npm install     #install npm package
   npm run dev     #start the application
   ```

## Snapshot

### _Sign Up_

<img   src = "public\signup.png">

### _Sign In_

<img   src = "public\signin.png">

### _Blogs_

<img   src = "public\blogs.png">

### _Read Blog_

<img   src = "public\readBlog.png">

### _Create Blog_

<img   src = "public\createBlog.png">

### _Update Blog_

<img   src = "public\updateBlog.png">

### video demo


https://github.com/alfaArghya/blog-web/assets/95538110/b39058b4-b477-498d-88fb-0c5370bf037a


## Tech Stack

### Backend

|                        |            |
| :--------------------- | ---------- |
| _Run Time Environment_ | Node.js    |
| _Server_               | Express.js |
| _Language_             | TypeScript |
| _Database_             | Postgres   |
| _ORM_                  | Prisma     |
| _Middleware_           | Zod        |
| _Password Encryption_  | argon2     |
| _User authentication_  | JWT token  |

### Frontend

|                        |                  |
| :--------------------- | ---------------- |
| _Run Time Environment_ | Node.js          |
| _Framework_            | React.js         |
| _Language_             | TypeScript       |
| _Database_             | Postgres         |
| _Routing_              | react-router-dom |
| _Middleware_           | Zod              |
