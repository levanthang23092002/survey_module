-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Instance" (
    "instanceid" SERIAL NOT NULL,
    "instanceName" TEXT NOT NULL,
    "instanceDescription" TEXT,
    "adminid" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("instanceid")
);

-- CreateTable
CREATE TABLE "Survey" (
    "surveyid" SERIAL NOT NULL,
    "surveyName" TEXT NOT NULL,
    "surveyDescription" TEXT,
    "thankYouMessage" TEXT,
    "displayInOnePage" BOOLEAN NOT NULL,
    "duration" INTEGER,
    "password" TEXT,
    "showCorrectAnswer" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "displayOrder" INTEGER,
    "instanceid" INTEGER NOT NULL,
    "points" INTEGER,
    "groupid" INTEGER,
    "privateid" TEXT,
    "hidden" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("surveyid")
);

-- CreateTable
CREATE TABLE "SurveyItem" (
    "surveyitemid" SERIAL NOT NULL,
    "surveyid" INTEGER NOT NULL,
    "instanceid" INTEGER NOT NULL,
    "parentSurveyid" INTEGER,
    "surveySectionid" INTEGER,
    "type" TEXT NOT NULL,
    "image" TEXT,
    "options" JSONB,
    "question" TEXT NOT NULL,
    "description" TEXT,
    "choice1" TEXT,
    "choice2" TEXT,
    "choice3" TEXT,
    "choice4" TEXT,
    "questionnum" INTEGER NOT NULL,
    "subquestion" TEXT,
    "subnum" INTEGER,
    "required" BOOLEAN NOT NULL,
    "showDescription" BOOLEAN NOT NULL,
    "applyGoTo" JSONB,
    "nextSurveyItemid" INTEGER,
    "applyValidation" JSONB,
    "shuffleChoice" BOOLEAN NOT NULL,
    "hasCommentField" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "SurveyItem_pkey" PRIMARY KEY ("surveyitemid")
);

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "responseid" SERIAL NOT NULL,
    "surveyid" INTEGER NOT NULL,
    "instanceid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "surveyitemid" INTEGER NOT NULL,
    "answer" TEXT,
    "delete" BOOLEAN NOT NULL,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("responseid")
);

-- CreateTable
CREATE TABLE "SurveyStatus" (
    "id" SERIAL NOT NULL,
    "instanceid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "adminid" INTEGER,
    "surveyid" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "timestamp_started" TIMESTAMP(3) NOT NULL,
    "timestamp_ended" TIMESTAMP(3),
    "isReusable" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "SurveyStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "usergroupid" SERIAL NOT NULL,
    "instanceid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "groupid" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("usergroupid")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "instanceid" INTEGER NOT NULL,
    "moduleid" INTEGER NOT NULL,
    "modulename" TEXT NOT NULL,
    "isDuplicated" BOOLEAN NOT NULL,
    "displayOrder" INTEGER,
    "activated" BOOLEAN NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "options" JSONB,
    "iconid" INTEGER,
    "iconColor" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleAvailable" (
    "id" SERIAL NOT NULL,
    "settingName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "permission" TEXT,
    "helpText" TEXT,
    "activateByDefault" BOOLEAN NOT NULL,
    "order" INTEGER,
    "iconid" INTEGER,
    "iconColor" TEXT,
    "isMobile" BOOLEAN NOT NULL,
    "isWeb" BOOLEAN NOT NULL,
    "isDuplicatable" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "ModuleAvailable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectGroup" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "objectid" INTEGER NOT NULL,
    "groupid" INTEGER NOT NULL,
    "userid" INTEGER,
    "instanceid" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "timestamp_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp_updated" TIMESTAMP(3) NOT NULL,
    "timestamp_deleted" TIMESTAMP(3),

    CONSTRAINT "ObjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyStatus_uuid_key" ON "SurveyStatus"("uuid");

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyItem" ADD CONSTRAINT "SurveyItem_surveyid_fkey" FOREIGN KEY ("surveyid") REFERENCES "Survey"("surveyid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyItem" ADD CONSTRAINT "SurveyItem_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyid_fkey" FOREIGN KEY ("surveyid") REFERENCES "Survey"("surveyid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyitemid_fkey" FOREIGN KEY ("surveyitemid") REFERENCES "SurveyItem"("surveyitemid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyStatus" ADD CONSTRAINT "SurveyStatus_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyStatus" ADD CONSTRAINT "SurveyStatus_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyStatus" ADD CONSTRAINT "SurveyStatus_surveyid_fkey" FOREIGN KEY ("surveyid") REFERENCES "Survey"("surveyid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectGroup" ADD CONSTRAINT "ObjectGroup_instanceid_fkey" FOREIGN KEY ("instanceid") REFERENCES "Instance"("instanceid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectGroup" ADD CONSTRAINT "ObjectGroup_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE SET NULL ON UPDATE CASCADE;
