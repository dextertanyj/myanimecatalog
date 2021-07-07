# Migration `20200720011333-add-season-number`

This migration has been generated at 7/20/2020, 1:13:33 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `anime`.`AlternativeTitleName` DROP FOREIGN KEY `AlternativeTitleName_ibfk_1`

ALTER TABLE `anime`.`AlternativeTitleName` DROP FOREIGN KEY `AlternativeTitleName_ibfk_2`

CREATE TABLE `anime`.`AlternativeTitle` (
`id` varchar(191) NOT NULL  ,
`title` varchar(191) NOT NULL  ,
`episodeId` varchar(191)  ,
`seriesId` varchar(191)  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `anime`.`Series` DROP COLUMN `name`,
ADD COLUMN `title` varchar(191) NOT NULL  ,
ADD COLUMN `seasonNumber` int   ;

ALTER TABLE `anime`.`AlternativeTitle` ADD FOREIGN KEY (`episodeId`) REFERENCES `anime`.`Episode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `anime`.`AlternativeTitle` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

DROP TABLE `anime`.`AlternativeTitleName`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200717030413-initial-migration..20200720011333-add-season-number
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
@@ -65,9 +65,9 @@
 model Episode {
   id               String                 @id @default(cuid())
   title            String
-  alternativeTitle AlternativeTitleName[]
+  alternativeTitle AlternativeTitle[]
   series           Series                 @relation(fields: seriesId, references: id)
   seriesId         String
   episodeNumber    Int
   files            File[]
@@ -75,10 +75,11 @@
 }
 model Series {
   id                 String                 @id @default(cuid())
-  name               String
-  alternativeName    AlternativeTitleName[]
+  title              String
+  alternativeTitle   AlternativeTitle[]
+  seasonNumber       Int?
   episodes           Episode[]
   episodeCount       Int
   status             Status
   type               Type
@@ -94,11 +95,11 @@
   references         Reference[]
   progress           UserProgress[]
 }
-model AlternativeTitleName {
+model AlternativeTitle {
   id        String   @id @default(cuid())
-  titleName String
+  title     String
   episode   Episode? @relation(fields: [episodeId], references: [id])
   episodeId String?
   series    Series?  @relation(fields: [seriesId], references: [id])
   seriesId  String?
```


