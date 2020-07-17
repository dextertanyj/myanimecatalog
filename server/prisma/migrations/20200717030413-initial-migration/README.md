# Migration `20200717030413-initial-migration`

This migration has been generated at 7/17/2020, 3:04:13 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `anime`.`User` (
`id` varchar(191) NOT NULL  ,
`username` varchar(191) NOT NULL  ,
`name` varchar(191) NOT NULL  ,
`password` varchar(191) NOT NULL  ,
`passwordAttempts` int NOT NULL  ,
`role` ENUM('READONLY', 'WRITE', 'ADMIN') NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`Episode` (
`id` varchar(191) NOT NULL  ,
`title` varchar(191) NOT NULL  ,
`seriesId` varchar(191) NOT NULL ,
`episodeNumber` int NOT NULL  ,
`remarks` varchar(191)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`Series` (
`id` varchar(191) NOT NULL  ,
`name` varchar(191) NOT NULL  ,
`episodeCount` int NOT NULL  ,
`status` ENUM('DOWNLOADED', 'MISSING', 'UNRELEASED') NOT NULL  ,
`type` ENUM('MOVIE', 'SERIES', 'MUSICVIDEO', 'OVA', 'SPECIAL') NOT NULL  ,
`releaseSeason` varchar(191)   ,
`releaseYear` datetime(3)   ,
`remarks` varchar(191)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`AlternativeTitleName` (
`id` varchar(191) NOT NULL  ,
`titleName` varchar(191) NOT NULL  ,
`episodeId` varchar(191)  ,
`seriesId` varchar(191)  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`File` (
`id` varchar(191) NOT NULL  ,
`path` varchar(191) NOT NULL  ,
`checksum` varchar(191) NOT NULL  ,
`fileSize` int NOT NULL  ,
`duration` varchar(191) NOT NULL  ,
`resolution` varchar(191) NOT NULL  ,
`source` ENUM('BLURAY', 'DVD', 'CD', 'WEB', 'TV') NOT NULL  ,
`codec` varchar(191) NOT NULL  ,
`remarks` varchar(191)   ,
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`updatedAt` datetime(3) NOT NULL  ,
`episodeId` varchar(191) NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`UserProgress` (
`id` varchar(191) NOT NULL  ,
`seriesId` varchar(191) NOT NULL ,
`userId` varchar(191) NOT NULL ,
`status` ENUM('COMPLETED', 'WATCHING', 'ONHOLD', 'PENDING', 'DROPPED') NOT NULL  ,
`completed` int   ,
`overall` int   ,
`execution` int   ,
`story` int   ,
`sound` int   ,
`art` int   ,
`character` int   ,
`appeal` int   ,
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`updatedAt` datetime(3) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`Reference` (
`id` varchar(191) NOT NULL  ,
`link` varchar(191) NOT NULL  ,
`source` varchar(191) NOT NULL  ,
`seriesId` varchar(191) NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`_prequel-sequel` (
`A` varchar(191) NOT NULL ,
`B` varchar(191) NOT NULL 
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`_main-side` (
`A` varchar(191) NOT NULL ,
`B` varchar(191) NOT NULL 
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `anime`.`_alternative` (
`A` varchar(191) NOT NULL ,
`B` varchar(191) NOT NULL 
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `User.username` ON `anime`.`User`(`username`)

CREATE UNIQUE INDEX `UserProgress.seriesId_userId` ON `anime`.`UserProgress`(`seriesId`,`userId`)

CREATE UNIQUE INDEX `_prequel-sequel_AB_unique` ON `anime`.`_prequel-sequel`(`A`,`B`)

CREATE  INDEX `_prequel-sequel_B_index` ON `anime`.`_prequel-sequel`(`B`)

CREATE UNIQUE INDEX `_main-side_AB_unique` ON `anime`.`_main-side`(`A`,`B`)

CREATE  INDEX `_main-side_B_index` ON `anime`.`_main-side`(`B`)

CREATE UNIQUE INDEX `_alternative_AB_unique` ON `anime`.`_alternative`(`A`,`B`)

CREATE  INDEX `_alternative_B_index` ON `anime`.`_alternative`(`B`)

ALTER TABLE `anime`.`Episode` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`AlternativeTitleName` ADD FOREIGN KEY (`episodeId`) REFERENCES `anime`.`Episode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `anime`.`AlternativeTitleName` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `anime`.`File` ADD FOREIGN KEY (`episodeId`) REFERENCES `anime`.`Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`UserProgress` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`UserProgress` ADD FOREIGN KEY (`userId`) REFERENCES `anime`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`Reference` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`_prequel-sequel` ADD FOREIGN KEY (`A`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`_prequel-sequel` ADD FOREIGN KEY (`B`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`_main-side` ADD FOREIGN KEY (`A`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`_main-side` ADD FOREIGN KEY (`B`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`_alternative` ADD FOREIGN KEY (`A`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `anime`.`_alternative` ADD FOREIGN KEY (`B`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200717030413-initial-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,149 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+enum Status {
+  DOWNLOADED
+  MISSING
+  UNRELEASED
+}
+
+enum WatchStatus {
+  COMPLETED
+  WATCHING
+  ONHOLD
+  PENDING
+  DROPPED
+}
+
+enum Season {
+  WINTER
+  FALL
+  SUMMER
+  SPRING
+}
+
+enum Source {
+  BLURAY
+  DVD
+  CD
+  WEB
+  TV
+}
+
+enum Type {
+  MOVIE
+  SERIES
+  MUSICVIDEO
+  OVA
+  SPECIAL
+}
+
+enum Role {
+  READONLY
+  WRITE
+  ADMIN
+}
+
+model User {
+  id               String         @id @default(cuid())
+  username         String         @unique
+  name             String
+  password         String
+  passwordAttempts Int
+  role             Role
+  progress         UserProgress[]
+}
+
+model Episode {
+  id               String                 @id @default(cuid())
+  title            String
+  alternativeTitle AlternativeTitleName[]
+  series           Series                 @relation(fields: seriesId, references: id)
+  seriesId         String
+  episodeNumber    Int
+  files            File[]
+  remarks          String?
+}
+
+model Series {
+  id                 String                 @id @default(cuid())
+  name               String
+  alternativeName    AlternativeTitleName[]
+  episodes           Episode[]
+  episodeCount       Int
+  status             Status
+  type               Type
+  releaseSeason      String?
+  releaseYear        DateTime?
+  remarks            String?
+  prequel            Series[]               @relation("prequel-sequel")
+  sequel             Series[]               @relation("prequel-sequel")
+  sideStory          Series[]               @relation("main-side")
+  mainStory          Series[]               @relation("main-side")
+  related            Series[]               @relation("alternative")
+  relatedAlternative Series[]               @relation("alternative")
+  references         Reference[]
+  progress           UserProgress[]
+}
+
+model AlternativeTitleName {
+  id        String   @id @default(cuid())
+  titleName String
+  episode   Episode? @relation(fields: [episodeId], references: [id])
+  episodeId String?
+  series    Series?  @relation(fields: [seriesId], references: [id])
+  seriesId  String?
+}
+
+model File {
+  id         String   @id @default(cuid())
+  path       String
+  checksum   String
+  fileSize   Int
+  duration   String
+  resolution String
+  source     Source
+  codec      String
+  remarks    String?
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt
+  episode    Episode  @relation(fields: [episodeId], references: [id])
+  episodeId  String
+}
+
+model UserProgress {
+  id        String      @id @default(cuid())
+  series    Series      @relation(fields: [seriesId], references: [id])
+  seriesId  String
+  user      User        @relation(fields: [userId], references: [id])
+  userId    String
+  status    WatchStatus
+  completed Int?
+  overall   Int?
+  execution Int?
+  story     Int?
+  sound     Int?
+  art       Int?
+  character Int?
+  appeal    Int?
+  createdAt DateTime    @default(now())
+  updatedAt DateTime    @updatedAt
+  @@unique([seriesId, userId])
+}
+
+model Reference {
+  id       String @id @default(cuid())
+  link     String
+  source   String
+  series   Series @relation(fields: [seriesId], references: [id])
+  seriesId String
+}
```


