ALTER TABLE `anime`.`AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_ibfk_1`;

ALTER TABLE `anime`.`AlternativeTitle` DROP FOREIGN KEY `AlternativeTitle_ibfk_2`;

ALTER TABLE `anime`.`AlternativeTitle` ADD FOREIGN KEY (`episodeId`) REFERENCES `anime`.`Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `anime`.`AlternativeTitle` ADD FOREIGN KEY (`seriesId`) REFERENCES `anime`.`Series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;