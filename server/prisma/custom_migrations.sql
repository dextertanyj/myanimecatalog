ALTER TABLE `anime`.`AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_ibfk_1`;

ALTER TABLE `anime`.`AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_ibfk_2`;

ALTER TABLE `anime`.`AlternativeTitle` ADD FOREIGN KEY (`episodeId`) REFERENCES `anime`.`Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `anime`.`AlternativeTitle` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `anime`.`AlternativeTitle` MODIFY `title` text;

ALTER TABLE `anime`.`Episode` MODIFY `title` text;

ALTER TABLE `anime`.`Episode` MODIFY `remarks` text;

ALTER TABLE `anime`.`File` MODIFY `path` text;

ALTER TABLE `anime`.`File` MODIFY `fileSize` bigInt;

ALTER TABLE `anime`.`File` MODIFY `remarks` text;

ALTER TABLE `anime`.`Reference` MODIFY `link` text;

ALTER TABLE `anime`.`Series` MODIFY `title` text;

ALTER TABLE `anime`.`Series` MODIFY `remarks` text;