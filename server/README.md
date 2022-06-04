# MyAnimeCatalog Server

## Contents

- [Project Structure](#project-structure)
- [Database Migration](#database-migration)
- [Deployment Guide](#deployment-guide)

## Project Structure

```
server
├─nginx/
├─prisma/
└─src/
```

### `nginx/` directory

Contains the files and folder structure required for nginx and certbot configurations in production.

### `prisma/` directory

Contains the database schema and migration folders.

### `src/` directory

Contains the GraphQL schema definitions and resolvers.

## Database Migration

- Generating the files required for a migration: `yarn migration:gen`
- Applying all migrations to the connected database: `yarn migration:run`
- Regenerating `@prisma/client` definitions: `yarn prisma generate`

## Deployment Guide

1. Install docker and docker-compose.
1. Clone the repository. The rest of the guide assumes the `/server` folder as the root directory.
1. Create a copy of `./example.env` in the folder and rename it as `./env`.
1. Fill in the details in the `.env` file.
1. Run `docker-compose up --detach --build`.
1. After the images have been built, run `yarn deploy`.

### Prisma Migrate Upgrade Guide

If upgrading from v1.0.0, follow the steps listed below:

1. Pull the updated repository.
1. Remove the `RUN yarn deploy` line in the Dockerfile.
1. With the database docker container running, SSH into the docker container using `yarn server:sh`.
1. If necessary, run the SQL commands listed in `prisma/resolution_migration.sql`.
1. Backup your database and run the following commands to baseline the existing database.
   - `npx prisma migrate resolve --applied 20210707040816_init`
   - `npx prisma migrate resolve --applied 20210707063345_update_mappings`
   - `npx prisma migrate resolve --applied 20210708064711_convert_resolution`
1. Continue with the regular databse migration steps using `yarn migration:deploy`.
1. Add back the `RUN yarn migration:deploy` line in the Dockerfile.
