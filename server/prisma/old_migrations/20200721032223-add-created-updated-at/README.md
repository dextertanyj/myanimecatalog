# Migration `20200721032223-add-created-updated-at`

This migration has been generated at 7/21/2020, 3:22:23 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `anime`.`Episode` ADD COLUMN `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
ADD COLUMN `updatedAt` datetime(3) NOT NULL  ;

ALTER TABLE `anime`.`Series` ADD COLUMN `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
ADD COLUMN `updatedAt` datetime(3) NOT NULL  ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200720085759-standardise-plural-names..20200721032223-add-created-updated-at
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
@@ -71,8 +71,10 @@
   seriesId          String
   episodeNumber     Int
   files             File[]
   remarks           String?
+  createdAt         DateTime           @default(now())
+  updatedAt         DateTime           @updatedAt
 }
 model Series {
   id                  String             @id @default(cuid())
@@ -93,8 +95,10 @@
   relatedSeries       Series[]           @relation("alternative")
   relatedAlternatives Series[]           @relation("alternative")
   references          Reference[]
   progress            UserProgress[]
+  createdAt           DateTime           @default(now())
+  updatedAt           DateTime           @updatedAt
 }
 model AlternativeTitle {
   id        String   @id @default(cuid())
```


