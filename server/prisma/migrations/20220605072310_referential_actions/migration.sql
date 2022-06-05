-- DropForeignKey
ALTER TABLE `AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_episodeId_fkey`;

-- DropForeignKey
ALTER TABLE `AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_seriesId_fkey`;

-- DropForeignKey
ALTER TABLE `Episode` DROP FOREIGN KEY `Episode_seriesId_fkey`;

-- DropForeignKey
ALTER TABLE `Reference` DROP FOREIGN KEY `Reference_seriesId_fkey`;

-- DropForeignKey
ALTER TABLE `UserProgress` DROP FOREIGN KEY `UserProgress_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlternativeTitle` ADD CONSTRAINT `AlternativeTitle_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlternativeTitle` ADD CONSTRAINT `AlternativeTitle_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
