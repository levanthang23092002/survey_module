/*
  Warnings:

  - Added the required column `groupid` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usergroup` ADD COLUMN `groupid` INTEGER NOT NULL;
