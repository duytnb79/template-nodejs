## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Migration](#-migration)
- [Build Production](#-build-production)
- [Project Structure](#-project-structure)
- [Further Documentations](#-further-documentations)

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

Install [Docker and Docker Compose](https://docs.docker.com/engine/install/)

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env.dev`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env.dev` file.

Then setup your application environment.

### Step 3: Running app

```bash
# Run the development environment using Docker and Docker Compose
npm run docker:dev

# Or without using Docker
npm run dev

# Access the running Docker container named 'api' and open a shell session inside it
docker exec -it api sh

# Automatically generate Prisma client based on the schema without asking for confirmation
npm run generate -y

# Automatically apply database migrations using Prisma without asking for confirmation
# Use only for initializing the database
npm run migrate -y

# Restart container api
docker restart api
```

After using the above script, you can try requesting the API at `[GET]` | `http://localhost:3000/api/v1/users` to check if everything is working properly.

### Step 4: Testing

```bash
# Run the test environment using Docker and Docker Compose, if it fails due to package import, please try again
npm run docker:test
```

## ❯ Scripts

```bash
# Compile TypeScript files
npm run build

# Start the application using the compiled JavaScript file
npm run start

# Start the application in development mode with automatic restarts and TypeScript transpilation
npm run dev

# Apply Prisma migrations in development mode with the migration name "init"
npm run migrate

# Generate Prisma client based on the schema
npm run generate

# Run ESLint to lint all TypeScript files in the src directory
npm run lint

# Run ESLint to lint and fix all TypeScript files in the src directory
npm run lint:fix

# Run Jest tests
npm run test

# Run Jest tests in watch mode
npm run test:watch

# Run Jest tests and generate a coverage report
npm run test:coverage

# Start the development environment using Docker Compose
npm run docker:dev

# Start the test environment using Docker Compose, run tests, then shut down the test environment
npm run docker:test

# Shut down the development environment using Docker Compose
npm run docker:down
```

## ❯ Migration

```bash
# Example:
# Add the 'age' column to the 'user' table
# Modify the model in the prisma/schema.prisma file
# This command generates a new migration file named 'add-age-to-user' without applying it to the database.
# It's useful for creating migration scripts for review before actual deployment.
# npx prisma migrate dev --name <migration-name> --create-only
npx prisma migrate dev --name add-age-to-user --create-only

# This command applies all pending migrations to the database.
# It's used to ensure the database schema is up-to-date with the migration scripts.
npx prisma migrate deploy
```

## ❯ Build Production

```bash
docker-compose up -d
```

## ❯ Project Structure

```
├── README.md                      # Project description, installation, and usage instructions
├── docker                         # Docker-related files
│   ├── development                # Docker files for the development environment
│   │   └── Dockerfile             # Docker configuration file for development
│   ├── migrate                    # Docker files for database migration
│   │   └── Dockerfile             # Docker configuration file for migration
│   └── production                 # Docker files for the production environment
│       └── Dockerfile             # Docker configuration file for production
├── docker-compose.dev.yml         # Docker Compose configuration for development environment
├── docker-compose.test.yml        # Docker Compose configuration for testing environment
├── docker-compose.yml             # Docker Compose configuration for production environment
├── jest.config.ts                 # Jest configuration file for setting up the test framework
├── jest.setup.ts                  # Jest setup file for initial test configuration
├── jest.teardown.ts               # Jest teardown file for cleaning up after tests
├── package-lock.json              # Dependency lock file for npm
├── package.json                   # Project dependencies and scripts
├── prisma                         # Prisma ORM-related files
│   └── schema.prisma              # Prisma schema definition
├── src                            # Source files
│   ├── api                        # API-related files
│   │   └── v1                     # API version 1
│   │       └── user               # User-related components
│   │           ├── controllers
│   │           │   └── UserController.ts # Handles user-related HTTP requests
│   │           ├── models
│   │           │   └── User.ts           # User data model definition
│   │           ├── repositories
│   │           │   └── UserRepository.ts # User data access layer
│   │           └── services
│   │               └── UserService.ts    # User-related business logic
│   ├── app.ts                    # Main application setup
│   ├── config                    # Configuration files
│   │   ├── env.ts                # Environment variables configuration
│   │   ├── logger.ts             # Logging configuration
│   │   └── prisma.ts             # Prisma ORM configuration
│   ├── helpers                   # Helper functions
│   ├── server.ts                 # Server startup file
│   └── utils                     # Utility functions and helpers
│       └── common.ts             # Common utility functions
├── tests                         # Test files
│   ├── integration               # Integration tests
│   │   └── controllers
│   │       └── UserController.integration.test.ts # Integration tests for UserController
│   ├── testdata                  # Test data files
│   │   └── testdata.sql          # Test data in SQL format
│   ├── unit                      # Unit tests
│   │   └── services
│   │       └── UserService.unit.test.ts # Unit tests for UserService
│   └── utils
│       └── prisma-mock.ts        # Mocking utility for Prisma
└── tsconfig.json                 # TypeScript configuration file
```

## ❯ Further Documentations

| Name & Link                                                            | Description                                                                                                                                                                       |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Express](https://expressjs.com/)                                      | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.                                       |
|  [Prisma](https://www.prisma.io/docs)                                  | Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion.                                                      |
| [TypeDI](https://github.com/pleerock/typedi)                           | Dependency Injection for TypeScript.                                                                                                                                              |
| [TypeORM](http://typeorm.io/#/)                                        | TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework.                                                                                     |
| [routing-controllers](https://github.com/pleerock/routing-controllers) | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework. |
| [cors](https://www.npmjs.com/package/cors)                             | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.                                                        |
|  [Helmet](https://helmetjs.github.io/)                                 | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!                                                             |
|  [Jest](http://facebook.github.io/jest/)                               | Delightful JavaScript Testing Library for unit and e2e tests                                                                                                                      |
|  [supertest](https://github.com/visionmedia/supertest)                 | Super-agent driven library for testing node.js HTTP servers using a fluent API                                                                                                    |
|                                                                        |
# template-nodejs
