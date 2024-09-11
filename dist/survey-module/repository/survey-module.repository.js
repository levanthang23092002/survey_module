"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModuleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let SurveyModuleRepository = class SurveyModuleRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findSurveyItems(surveyId, instanceId) {
        const surveyItems = await this.prisma.surveyItem.findMany({
            where: {
                surveyid: surveyId,
                deleted: false,
                instanceid: instanceId,
            },
            select: {
                questionnum: true,
                question: true,
                description: true,
                image: true,
                choice1: true,
                choice2: true,
                choice3: true,
                choice4: true,
                subquestion: true,
                subnum: true,
                type: true,
                required: true,
                showDescription: true,
                shuffleChoice: true,
                hasCommentField: true,
            },
        });
        const groupedQuestions = surveyItems.reduce((acc, item) => {
            const mainQuestion = acc.find((q) => q.questionNum === item.questionnum);
            if (mainQuestion) {
                if (!mainQuestion.subQuestions) {
                    mainQuestion.subQuestions = [];
                }
                mainQuestion.subQuestions.push({
                    subQuestion: item.subquestion,
                    subNum: item.subnum,
                });
            }
            else {
                acc.push({
                    questionNum: item.questionnum,
                    question: item.question,
                    description: item.description,
                    image: item.image,
                    choice1: item.choice1,
                    choice2: item.choice2,
                    choice3: item.choice3,
                    choice4: item.choice4,
                    type: item.type,
                    required: item.required,
                    showDescription: item.showDescription,
                    shuffleChoice: item.shuffleChoice,
                    hasCommentField: item.hasCommentField,
                    subQuestions: item.subquestion
                        ? [
                            {
                                subQuestion: item.subquestion,
                                subNum: item.subnum,
                            },
                        ]
                        : [],
                });
            }
            return acc;
        }, []);
        return groupedQuestions;
    }
    async checkDataResponse(surveyId, surveyItemId) {
        const surveyItems = await this.prisma.surveyItem.findMany({
            where: {
                surveyid: surveyId,
            },
            select: {
                surveyitemid: true,
            },
        });
        const surveyItemsid = surveyItems.map((item) => item.surveyitemid);
        const check = surveyItemId.every((id) => surveyItemsid.includes(id));
        return check;
    }
    async hasUserCompletedSurvey(userId, surveyId) {
        const surveyItems = await this.prisma.surveyResponse.findMany({
            where: {
                surveyid: surveyId,
                userid: userId,
                delete: false,
            },
        });
        if (!surveyItems || surveyItems.length < 1) {
            return false;
        }
        else {
            return true;
        }
    }
    async findListSurvey(instanceId, userGroup, perPage, skip) {
        const survey = await this.prisma.survey.findMany({
            take: perPage,
            skip,
            where: {
                instanceid: instanceId,
                groupid: userGroup,
                deleted: false,
                hidden: false,
            },
            orderBy: {
                timestamp_created: 'desc',
            },
            select: {
                surveyName: true,
                surveyDescription: true,
                duration: true,
                type: true,
                day: true,
                points: true,
                timestamp_created: true,
            },
        });
        return survey.map((item) => ({
            surveyName: item.surveyName,
            surveyDescription: item.surveyDescription,
            duration: item.duration,
            type: item.type,
            day: item.day,
            points: item.points,
            timestampCreated: item.timestamp_created,
        }));
    }
    async counttotalListSurvey(instanceId, userGroup) {
        const total = await this.prisma.survey.count({
            where: {
                instanceid: instanceId,
                groupid: userGroup,
                deleted: false,
                hidden: false,
            },
        });
        return total;
    }
    async getUserSurveyResponses(instanceid, surveyId, userId) {
        const responses = await this.prisma.surveyResponse.findMany({
            where: {
                userid: userId,
                surveyid: surveyId,
                instanceid: instanceid,
                delete: false,
            },
            orderBy: {
                surveyItem: {
                    questionnum: 'asc',
                },
            },
            select: {
                surveyItem: {
                    select: {
                        questionnum: true,
                        question: true,
                        description: true,
                        image: true,
                    },
                },
                answer: true,
            },
        });
        return responses.map((response) => ({
            questionnum: response.surveyItem.questionnum,
            question: response.surveyItem.question,
            description: response.surveyItem.description,
            image: response.surveyItem.image,
            answer: response.answer,
        }));
    }
    async getUserSurveyResponsesByAdmin(instanceid, surveyId) {
        const responses = await this.prisma.surveyResponse.findMany({
            where: {
                surveyid: surveyId,
                instanceid: instanceid,
                delete: false,
            },
            orderBy: {
                surveyItem: {
                    questionnum: 'asc',
                },
            },
            select: {
                surveyItem: {
                    select: {
                        questionnum: true,
                        question: true,
                        description: true,
                        image: true,
                    },
                },
                answer: true,
                userid: true,
            },
        });
        const groupedResponses = responses.reduce((acc, response) => {
            const { userid, surveyItem, answer } = response;
            if (!acc[userid]) {
                acc[userid] = {
                    userId: userid,
                    responses: [],
                };
            }
            acc[userid].responses.push({
                questionnum: surveyItem.questionnum,
                question: surveyItem.question,
                description: surveyItem.description,
                image: surveyItem.image,
                answer: answer,
            });
            return acc;
        }, {});
        return Object.values(groupedResponses);
    }
    async addSurveyResponse(datas) {
        try {
            const result = await this.prisma.surveyResponse.createMany({
                data: datas.map((data) => ({
                    surveyid: data.surveyid,
                    instanceid: data.instanceid,
                    userid: data.userid,
                    surveyitemid: data.surveyitemid,
                    answer: data.answer,
                    delete: data.delete ?? false,
                })),
                skipDuplicates: true,
            });
            if (result.count > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }
    async checkAdmin(userId, instanceId) {
        const check = await this.prisma.instance.count({
            where: {
                adminid: userId,
                instanceid: instanceId,
            },
        });
        if (check > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async findListSurveyByAdmin(instanceId, perPage, skip) {
        const survey = await this.prisma.survey.findMany({
            take: perPage,
            skip,
            where: {
                instanceid: instanceId,
                deleted: false,
                hidden: false,
            },
            orderBy: {
                timestamp_created: 'desc',
            },
            select: {
                surveyName: true,
                surveyDescription: true,
                duration: true,
                type: true,
                day: true,
                points: true,
                timestamp_created: true,
            },
        });
        return survey.map((item) => ({
            surveyName: item.surveyName,
            surveyDescription: item.surveyDescription,
            duration: item.duration,
            type: item.type,
            day: item.day,
            points: item.points,
            timestampCreated: item.timestamp_created,
        }));
    }
    async counttotalListSurveyByAmin(instanceId) {
        const total = await this.prisma.survey.count({
            where: {
                instanceid: instanceId,
                deleted: false,
                hidden: false,
            },
        });
        return total;
    }
};
exports.SurveyModuleRepository = SurveyModuleRepository;
exports.SurveyModuleRepository = SurveyModuleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SurveyModuleRepository);
//# sourceMappingURL=survey-module.repository.js.map