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

- Generating the files required for a migration: `yarn gen:migrate`
- Applying all migrations to the connected database: `yarn migrate`
- Regenerating `@prisma/client` definitions: `yarn prisma generate`

## Deployment Guide

1. Install docker and docker-compose.
2. Obtain SSL certificates for domain from let's encrypt.
3. Clone the repository. The rest of the guide assumes the `/server` folder as the root directory.
4. Copy the `/etc/letsencrypt/archive` and `/etc/letsencrypt/renewal` folders to `./nginx/certbot/conf/archive` and `./nginx/certbot/conf/renewal` respectively.
5. Create a folder `./client/nginx/certbox/conf/live/your-domain-here`.
6. For each file in the `/archive/your-domain-here` folder, create a symlink to a corresponding file in the `/live/your-domain-here` folder.
   - For example, `/live/your-domain-here/cert.pem` is linked to `/archive/your-domain-here/cert1.pem`.
7. Create a copy of `./nginx/conf.d/nginx.conf.example` in the same folder and rename it `nginx.conf`.
8. Replace all instances of `example.com` with your client domain name in `nginx.conf`.
9. Create a copy of `./example.env` in the root folder and rename it as `./env`.
10. Fill in the details in the `.env` file.
11. Run `docker-compose up --build` in a separate screen.
12. After the images have been built, run `yarn server:sh`.
13. Run `yarn deploy`.

### Prisma Migrate Upgrade Guide

If upgrading from v1.0.0, follow the steps listed below: 
1. Pull the updated repository.
2. With the database docker container running, SSH into the docker container using `yarn server:sh`.
3. If necessary, run the SQL commands listed in `prisma/resolution_migration.sql`.
4. Backup your database and run the following commands to baseline the existing database.
   - `npx prisma migrate resolve --applied 20210707040816_init`
   - `npx prisma migrate resolve --applied 20210707063345_update_mappings`
   - `npx prisma migrate resolve --applied 20210708064711_convert_resolution`
5. Continue with the regular databse migration steps using `yarn deploy`. 
