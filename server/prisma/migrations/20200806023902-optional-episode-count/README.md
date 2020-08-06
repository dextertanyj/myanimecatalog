# Migration `20200806023902-optional-episode-count`

This migration has been generated at 8/6/2020, 2:39:02 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `anime`.`Series` MODIFY `episodeCount` int;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200724075651-change-duration-type..20200806023902-optional-episode-count
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
@@ -81,9 +81,9 @@
   title               String
   alternativeTitles   AlternativeTitle[]
   seasonNumber        Int?
   episodes            Episode[]
-  episodeCount        Int
+  episodeCount        Int?
   status              Status
   type                Type
   releaseSeason       String?
   releaseYear         DateTime?
```


