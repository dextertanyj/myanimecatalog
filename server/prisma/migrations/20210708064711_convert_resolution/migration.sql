/*
  Warnings:

  - You are about to drop the column `resolution` on the `File` table. All the data in the column will be lost.
  - Added the required column `resolutionHeight` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolutionWidth` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` DROP COLUMN `resolution`,
    ADD COLUMN `resolutionHeight` INTEGER NOT NULL,
    ADD COLUMN `resolutionWidth` INTEGER NOT NULL;
