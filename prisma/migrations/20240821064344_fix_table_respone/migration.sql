/*
  Warnings:

  - Added the required column `delete` to the `SurveyResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp_updated` to the `SurveyResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `surveyresponse` ADD COLUMN `delete` BOOLEAN NOT NULL,
    ADD COLUMN `timestamp_deleted` DATETIME(3) NULL,
    ADD COLUMN `timestamp_updated` DATETIME(3) NOT NULL;
