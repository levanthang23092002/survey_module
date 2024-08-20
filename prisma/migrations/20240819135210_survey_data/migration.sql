-- CreateTable
CREATE TABLE `User` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instance` (
    `instanceid` INTEGER NOT NULL AUTO_INCREMENT,
    `instanceName` VARCHAR(191) NOT NULL,
    `instanceDescription` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`instanceid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Survey` (
    `surveyid` INTEGER NOT NULL AUTO_INCREMENT,
    `surveyName` VARCHAR(191) NOT NULL,
    `surveyDescription` VARCHAR(191) NULL,
    `thankYouMessage` VARCHAR(191) NULL,
    `displayInOnePage` BOOLEAN NOT NULL,
    `duration` INTEGER NULL,
    `password` VARCHAR(191) NULL,
    `showCorrectAnswer` BOOLEAN NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `day` DATETIME(3) NOT NULL,
    `displayOrder` INTEGER NULL,
    `instanceid` INTEGER NOT NULL,
    `points` INTEGER NULL,
    `groupid` INTEGER NULL,
    `privateid` VARCHAR(191) NULL,
    `hidden` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp_updated` DATETIME(3) NOT NULL,
    `timestamp_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`surveyid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SurveyItem` (
    `surveyitemid` INTEGER NOT NULL AUTO_INCREMENT,
    `surveyid` INTEGER NOT NULL,
    `instanceid` INTEGER NOT NULL,
    `parentSurveyid` INTEGER NULL,
    `surveySectionid` INTEGER NULL,
    `type` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `options` JSON NULL,
    `question` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `choice1` VARCHAR(191) NULL,
    `choice2` VARCHAR(191) NULL,
    `choice3` VARCHAR(191) NULL,
    `choice4` VARCHAR(191) NULL,
    `questionnum` INTEGER NOT NULL,
    `subquestion` VARCHAR(191) NULL,
    `subnum` INTEGER NULL,
    `required` BOOLEAN NOT NULL,
    `showDescription` BOOLEAN NOT NULL,
    `applyGoTo` JSON NULL,
    `nextSurveyItemid` INTEGER NULL,
    `applyValidation` JSON NULL,
    `shuffleChoice` BOOLEAN NOT NULL,
    `hasCommentField` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp_updated` DATETIME(3) NOT NULL,
    `timestamp_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`surveyitemid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SurveyResponse` (
    `responseid` INTEGER NOT NULL AUTO_INCREMENT,
    `surveyid` INTEGER NOT NULL,
    `instanceid` INTEGER NOT NULL,
    `userid` INTEGER NOT NULL,
    `surveyitemid` INTEGER NOT NULL,
    `answer` VARCHAR(191) NULL,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`responseid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SurveyStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instanceid` INTEGER NOT NULL,
    `userid` INTEGER NOT NULL,
    `adminid` INTEGER NULL,
    `surveyid` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `timestamp_started` DATETIME(3) NOT NULL,
    `timestamp_ended` DATETIME(3) NULL,
    `isReusable` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp_updated` DATETIME(3) NOT NULL,
    `timestamp_deleted` DATETIME(3) NULL,

    UNIQUE INDEX `SurveyStatus_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroup` (
    `usergroupid` INTEGER NOT NULL AUTO_INCREMENT,
    `instanceid` INTEGER NOT NULL,
    `userid` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp_updated` DATETIME(3) NOT NULL,
    `timestamp_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`usergroupid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instanceid` INTEGER NOT NULL,
    `moduleid` INTEGER NOT NULL,
    `modulename` VARCHAR(191) NOT NULL,
    `isDuplicated` BOOLEAN NOT NULL,
    `displayOrder` INTEGER NULL,
    `activated` BOOLEAN NOT NULL,
    `featured` BOOLEAN NOT NULL,
    `options` JSON NULL,
    `iconid` INTEGER NULL,
    `iconColor` VARCHAR(191) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp_updated` DATETIME(3) NOT NULL,
    `timestamp_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModuleAvailable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `settingName` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `permission` VARCHAR(191) NULL,
    `helpText` VARCHAR(191) NULL,
    `activateByDefault` BOOLEAN NOT NULL,
    `order` INTEGER NULL,
    `iconid` INTEGER NULL,
    `iconColor` VARCHAR(191) NULL,
    `isMobile` BOOLEAN NOT NULL,
    `isWeb` BOOLEAN NOT NULL,
    `isDuplicatable` BOOLEAN NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObjectGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `objectid` INTEGER NOT NULL,
    `groupid` INTEGER NOT NULL,
    `userid` INTEGER NULL,
    `instanceid` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `timestamp_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `timestamp_updated` DATETIME(3) NOT NULL,
    `timestamp_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Survey` ADD CONSTRAINT `Survey_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyItem` ADD CONSTRAINT `SurveyItem_surveyid_fkey` FOREIGN KEY (`surveyid`) REFERENCES `Survey`(`surveyid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyItem` ADD CONSTRAINT `SurveyItem_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyResponse` ADD CONSTRAINT `SurveyResponse_surveyid_fkey` FOREIGN KEY (`surveyid`) REFERENCES `Survey`(`surveyid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyResponse` ADD CONSTRAINT `SurveyResponse_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyResponse` ADD CONSTRAINT `SurveyResponse_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyResponse` ADD CONSTRAINT `SurveyResponse_surveyitemid_fkey` FOREIGN KEY (`surveyitemid`) REFERENCES `SurveyItem`(`surveyitemid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyStatus` ADD CONSTRAINT `SurveyStatus_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyStatus` ADD CONSTRAINT `SurveyStatus_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveyStatus` ADD CONSTRAINT `SurveyStatus_surveyid_fkey` FOREIGN KEY (`surveyid`) REFERENCES `Survey`(`surveyid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObjectGroup` ADD CONSTRAINT `ObjectGroup_instanceid_fkey` FOREIGN KEY (`instanceid`) REFERENCES `Instance`(`instanceid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObjectGroup` ADD CONSTRAINT `ObjectGroup_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`userid`) ON DELETE SET NULL ON UPDATE CASCADE;
