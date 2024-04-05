## Run using Docker

```bash
  docker-compose up --build
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/NickolasKemp/React-App.git
```

Go to the project directories

```bash
  cd React-App/backend
  cd React-App/frontend
```

Install dependencies

```bash
  npm install
```

Create and configure .env file in backend directory 

```bash
DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"
```

Generate prisma client

```bash
  npx prisma generate
```

Push tables to db

```bash
  prisma db push
```

Start the backend server

```bash
  npm run start:dev
```

Start the frontend server

```bash
  npm start
```