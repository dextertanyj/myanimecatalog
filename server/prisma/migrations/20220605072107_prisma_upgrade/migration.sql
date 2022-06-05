-- DropForeignKey
ALTER TABLE `AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_ibfk_1`;

-- DropForeignKey
ALTER TABLE `AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Episode` DROP FOREIGN KEY `Episode_ibfk_1`;

-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Reference` DROP FOREIGN KEY `Reference_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserProgress` DROP FOREIGN KEY `UserProgress_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserProgress` DROP FOREIGN KEY `UserProgress_ibfk_2`;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlternativeTitle` ADD CONSTRAINT `AlternativeTitle_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlternativeTitle` ADD CONSTRAINT `AlternativeTitle_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User.username_unique` TO `User_username_key`;

-- RenameIndex
ALTER TABLE `UserProgress` RENAME INDEX `UserProgress.seriesId_userId_unique` TO `UserProgress_seriesId_userId_key`;
