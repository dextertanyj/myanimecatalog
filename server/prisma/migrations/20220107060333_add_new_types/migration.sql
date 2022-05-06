-- AlterTable
ALTER TABLE `Series` MODIFY `type` ENUM('MOVIE', 'SERIES', 'SERIESTV', 'SERIESOVA', 'SERIESOAD', 'SERIESONA', 'MUSICVIDEO', 'OVA', 'SPECIAL', 'SPECIALTV', 'SPECIALOVA', 'SPECIALOAD', 'SPECIALONA', 'BONUSEXTRA', 'OTHER') NOT NULL;
-- RemapExistingValues
UPDATE `Series` SET `type` = 'SERIESTV' WHERE `type` = 'SERIES';
UPDATE `Series` SET `type` = 'BONUSEXTRA' WHERE `type` = 'SPECIAL';
UPDATE `Series` SET `type` = 'SPECIALOVA' WHERE `type` = 'OVA';