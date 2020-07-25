# Migration `20200724075651-change-duration-type`

This migration has been generated at 7/24/2020, 7:56:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `anime`.`File` MODIFY `duration` int NOT NULL;

ALTER TABLE `anime`.`UserProgress` MODIFY `updatedAt` datetime(3) NOT NULL;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200721032223-add-created-updated-at..20200724075651-change-duration-type
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -113,9 +113,9 @@
   id         String   @id @default(cuid())
   path       String
   checksum   String
   fileSize   Int
-  duration   String
+  duration   Int
   resolution String
   source     Source
   codec      String
   remarks    String?
```


