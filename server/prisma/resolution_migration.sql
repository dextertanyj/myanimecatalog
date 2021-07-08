START TRANSACTION; 

ALTER TABLE `File` ADD `resolutionWidth` INTEGER;
ALTER TABLE `File` ADD `resolutionHeight` INTEGER;

UPDATE `File` SET `resolutionWidth` = CONVERT(SUBSTRING_INDEX(`resolution`, ' × ', -1), SIGNED INTEGER);
UPDATE `File` SET `resolutionHeight` = CONVERT(SUBSTRING_INDEX(`resolution`, ' × ', 1), SIGNED INTEGER);

ALTER TABLE `File` MODIFY `resolutionWidth` INTEGER NOT NULL;
ALTER TABLE `File` MODIFY `resolutionHeight` INTEGER NOT NULL;

ALTER TABLE `File` DROP COLUMN `resolution`;

COMMIT;