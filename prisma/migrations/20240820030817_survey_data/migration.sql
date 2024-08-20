/*
  Warnings:

  - Added the required column `adminid` to the `Instance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `instance` ADD COLUMN `adminid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Instance` ADD CONSTRAINT `Instance_adminid_fkey` FOREIGN KEY (`adminid`) REFERENCES `User`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;
