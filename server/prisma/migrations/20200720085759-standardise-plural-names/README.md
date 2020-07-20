# Migration `20200720085759-standardise-plural-names`

This migration has been generated at 7/20/2020, 8:57:59 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `anime`.`UserProgress` ADD COLUMN `remarks` varchar(191)   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200720011333-add-season-number..20200720085759-standardise-plural-names
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
@@ -63,38 +63,38 @@
   progress         UserProgress[]
 }
 model Episode {
-  id               String                 @id @default(cuid())
-  title            String
-  alternativeTitle AlternativeTitle[]
-  series           Series                 @relation(fields: seriesId, references: id)
-  seriesId         String
-  episodeNumber    Int
-  files            File[]
-  remarks          String?
+  id                String             @id @default(cuid())
+  title             String
+  alternativeTitles AlternativeTitle[]
+  series            Series             @relation(fields: seriesId, references: id)
+  seriesId          String
+  episodeNumber     Int
+  files             File[]
+  remarks           String?
 }
 model Series {
-  id                 String                 @id @default(cuid())
-  title              String
-  alternativeTitle   AlternativeTitle[]
-  seasonNumber       Int?
-  episodes           Episode[]
-  episodeCount       Int
-  status             Status
-  type               Type
-  releaseSeason      String?
-  releaseYear        DateTime?
-  remarks            String?
-  prequel            Series[]               @relation("prequel-sequel")
-  sequel             Series[]               @relation("prequel-sequel")
-  sideStory          Series[]               @relation("main-side")
-  mainStory          Series[]               @relation("main-side")
-  related            Series[]               @relation("alternative")
-  relatedAlternative Series[]               @relation("alternative")
-  references         Reference[]
-  progress           UserProgress[]
+  id                  String             @id @default(cuid())
+  title               String
+  alternativeTitles   AlternativeTitle[]
+  seasonNumber        Int?
+  episodes            Episode[]
+  episodeCount        Int
+  status              Status
+  type                Type
+  releaseSeason       String?
+  releaseYear         DateTime?
+  remarks             String?
+  prequels            Series[]           @relation("prequel-sequel")
+  sequels             Series[]           @relation("prequel-sequel")
+  sideStories         Series[]           @relation("main-side")
+  mainStories         Series[]           @relation("main-side")
+  relatedSeries       Series[]           @relation("alternative")
+  relatedAlternatives Series[]           @relation("alternative")
+  references          Reference[]
+  progress            UserProgress[]
 }
 model AlternativeTitle {
   id        String   @id @default(cuid())
@@ -135,8 +135,9 @@
   sound     Int?
   art       Int?
   character Int?
   appeal    Int?
+  remarks   String?
   createdAt DateTime    @default(now())
   updatedAt DateTime    @updatedAt
   @@unique([seriesId, userId])
 }
```


