/*
  Warnings:

  - The values [SERIES,OVA,SPECIAL] on the enum `Series_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Series` MODIFY `type` ENUM('MOVIE', 'SERIESTV', 'SERIESOVA', 'SERIESOAD', 'SERIESONA', 'MUSICVIDEO', 'SPECIALTV', 'SPECIALOVA', 'SPECIALOAD', 'SPECIALONA', 'BONUSEXTRA', 'OTHER') NOT NULL;
