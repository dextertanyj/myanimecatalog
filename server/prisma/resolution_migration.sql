START TRANSACTION; 

ALTER TABLE `File` ADD `resolution_height` int;
ALTER TABLE `File` ADD `resolution_width` int;

UPDATE `File` SET `resolutionHeight` = SUBSTRING_INDEX(`resolution`, ' × ', 1);
UPDATE `File` SET `resolutionWidth` = SUBSTRING_INDEX(`resolution`, ' × ', -1);

ALTER TABLE `File` MODIFY `resolutionHeight` int NOT NULL;
ALTER TABLE `File` MODIFY `resolutionWidth` int NOT NULL;

ALTER TABLE `File` DROP COLUMN `resolution`;

COMMIT;