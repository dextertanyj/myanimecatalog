-- AlterTable
ALTER TABLE `AlternativeTitle` MODIFY `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Episode` MODIFY `title` TEXT NOT NULL,
    MODIFY `remarks` TEXT;

-- AlterTable
ALTER TABLE `File` MODIFY `path` TEXT NOT NULL,
    MODIFY `fileSize` BIGINT NOT NULL,
    MODIFY `remarks` TEXT;

-- AlterTable
ALTER TABLE `Reference` MODIFY `link` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Series` MODIFY `title` TEXT NOT NULL,
    MODIFY `remarks` TEXT;
