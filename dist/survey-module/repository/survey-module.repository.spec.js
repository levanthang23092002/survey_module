"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const survey_module_repository_1 = require("./survey-module.repository");
const prisma_service_1 = require("../../prisma.service");
describe('SurveyModuleRepository', () => {
    let repository;
    let prismaService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                survey_module_repository_1.SurveyModuleRepository,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: {
                        surveyItem: {
                            findMany: jest.fn(),
                        },
                        surveyResponse: {
                            findMany: jest.fn(),
                            createMany: jest.fn(),
                        },
                        survey: {
                            findMany: jest.fn(),
                            count: jest.fn(),
                        },
                        instance: {
                            count: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();
        repository = module.get(survey_module_repository_1.SurveyModuleRepository);
        prismaService = module.get(prisma_service_1.PrismaService);
    });
    const mockSurveyItems = [
        {
            surveyitemid: 1,
            surveyid: 1,
            instanceid: 1,
            parentSurveyid: null,
            surveySectionid: 1,
            type: 'multiple-choice',
            image: null,
            options: null,
            question: 'Question 1',
            description: 'Description 1',
            choice1: 'Choice 1',
            choice2: 'Choice 2',
            choice3: 'Choice 3',
            choice4: 'Choice 4',
            questionnum: 1,
            subquestion: 'Subquestion 1',
            subnum: 1,
            required: true,
            showDescription: true,
            applyGoTo: null,
            nextSurveyItemid: null,
            applyValidation: null,
            shuffleChoice: false,
            hasCommentField: false,
            deleted: false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: null,
        },
        {
            surveyitemid: 2,
            surveyid: 1,
            instanceid: 1,
            parentSurveyid: null,
            surveySectionid: 1,
            type: 'multiple-choice',
            image: null,
            options: null,
            question: 'Question 1',
            description: 'Description 1',
            choice1: 'Choice 1',
            choice2: 'Choice 2',
            choice3: 'Choice 3',
            choice4: 'Choice 4',
            questionnum: 1,
            subquestion: 'Subquestion 2',
            subnum: 2,
            required: true,
            showDescription: true,
            applyGoTo: null,
            nextSurveyItemid: null,
            applyValidation: null,
            shuffleChoice: false,
            hasCommentField: false,
            deleted: false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: null,
        },
        {
            surveyitemid: 3,
            surveyid: 1,
            instanceid: 1,
            parentSurveyid: null,
            surveySectionid: 1,
            type: 'multiple-choice',
            image: null,
            options: null,
            question: 'Question 2',
            description: 'Description 2',
            choice1: 'Choice 1',
            choice2: 'Choice 2',
            choice3: 'Choice 3',
            choice4: 'Choice 4',
            questionnum: 2,
            subquestion: null,
            subnum: null,
            required: true,
            showDescription: true,
            applyGoTo: null,
            nextSurveyItemid: null,
            applyValidation: null,
            shuffleChoice: false,
            hasCommentField: false,
            deleted: false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: null,
        },
    ];
    const mockSurveyResponses = [
        {
            responseid: 1,
            surveyid: 1,
            instanceid: 1,
            userid: 2,
            surveyitemid: 1,
            answer: 'A',
            delete: false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: new Date(),
        },
        {
            responseid: 1,
            surveyid: 1,
            instanceid: 1,
            userid: 2,
            surveyitemid: 2,
            answer: 'A',
            delete: false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: new Date(),
        },
        {
            responseid: 1,
            surveyid: 1,
            instanceid: 1,
            userid: 2,
            surveyitemid: 3,
            answer: 'A',
            delete: false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: new Date(),
        },
    ];
    const mockSurveys = [
        {
            surveyName: 'Survey 1',
            surveyDescription: 'Description 1',
            duration: 30,
            type: 'Type 1',
            day: new Date(),
            points: 10,
            timestamp_created: new Date(),
        },
        {
            surveyName: 'Survey 2',
            surveyDescription: 'Description 2',
            duration: 45,
            type: 'Type 2',
            day: new Date(),
            points: 20,
            timestamp_created: new Date(),
        },
    ];
    const mockResponses = [
        {
            surveyItem: {
                questionnum: 1,
                question: 'Question 1',
                description: 'Description 1',
                image: 'image1.png',
            },
            answer: 'A',
        },
        {
            surveyItem: {
                questionnum: 2,
                question: 'Question 2',
                description: 'Description 2',
                image: 'image2.png',
            },
            answer: 'B',
        },
    ];
    const mockResponsesAdmin = [
        {
            surveyItem: {
                questionnum: 1,
                question: 'Question 1',
                description: 'Description 1',
                image: 'image1.png',
            },
            answer: 'A',
            userid: 1,
        },
        {
            surveyItem: {
                questionnum: 2,
                question: 'Question 2',
                description: 'Description 2',
                image: 'image2.png',
            },
            answer: 'B',
            userid: 1,
        },
        {
            surveyItem: {
                questionnum: 1,
                question: 'Question 1',
                description: 'Description 1',
                image: 'image1.png',
            },
            answer: 'C',
            userid: 2,
        },
    ];
    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
    describe('findSurveyItems', () => {
        it('should return grouped survey items', async () => {
            jest
                .spyOn(prismaService.surveyItem, 'findMany')
                .mockResolvedValue(mockSurveyItems);
            const result = await repository.findSurveyItems(1, 1);
            expect(result).toEqual([
                {
                    questionNum: 1,
                    question: 'Question 1',
                    description: 'Description 1',
                    image: null,
                    choice1: 'Choice 1',
                    choice2: 'Choice 2',
                    choice3: 'Choice 3',
                    choice4: 'Choice 4',
                    type: 'multiple-choice',
                    required: true,
                    showDescription: true,
                    shuffleChoice: false,
                    hasCommentField: false,
                    subQuestions: [
                        { subQuestion: 'Subquestion 1', subNum: 1 },
                        { subQuestion: 'Subquestion 2', subNum: 2 },
                    ],
                },
                {
                    questionNum: 2,
                    question: 'Question 2',
                    description: 'Description 2',
                    image: null,
                    choice1: 'Choice 1',
                    choice2: 'Choice 2',
                    choice3: 'Choice 3',
                    choice4: 'Choice 4',
                    type: 'multiple-choice',
                    required: true,
                    showDescription: true,
                    shuffleChoice: false,
                    hasCommentField: false,
                    subQuestions: [],
                },
            ]);
        });
    });
    describe('checkDataResponse', () => {
        it('should return true if all surveyItemIds exist in the survey', async () => {
            jest
                .spyOn(prismaService.surveyItem, 'findMany')
                .mockResolvedValue(mockSurveyItems);
            const result = await repository.checkDataResponse(1, [1, 2]);
            expect(result).toBe(true);
        });
        it('should return false if any surveyItemId does not exist in the survey', async () => {
            jest
                .spyOn(prismaService.surveyItem, 'findMany')
                .mockResolvedValue(mockSurveyItems);
            const result = await repository.checkDataResponse(1, [1, 4]);
            expect(result).toBe(false);
        });
        it('should return false if no survey items are found for the given surveyId', async () => {
            jest.spyOn(prismaService.surveyItem, 'findMany').mockResolvedValue([]);
            const result = await repository.checkDataResponse(1, [1, 2]);
            expect(result).toBe(false);
        });
    });
    describe('hasUserCompletedSurvey', () => {
        it('should return true if the user has completed the survey', async () => {
            jest
                .spyOn(prismaService.surveyResponse, 'findMany')
                .mockResolvedValue(mockSurveyResponses);
            const result1 = await repository.hasUserCompletedSurvey(1, 1);
            expect(result1).toBe(true);
        });
        it('should return false if the user has not completed the survey', async () => {
            jest
                .spyOn(prismaService.surveyResponse, 'findMany')
                .mockResolvedValue([]);
            expect(await repository.hasUserCompletedSurvey(5, 5)).toBe(false);
        });
        it('should return false if the user has not completed the survey', async () => {
            jest
                .spyOn(prismaService.surveyResponse, 'findMany')
                .mockResolvedValue([]);
            expect(await repository.hasUserCompletedSurvey(5, 3)).toBe(false);
        });
    });
    describe('findListSurvey', () => {
        it('should return a list of surveys', async () => {
            prismaService.survey.findMany.mockResolvedValue(mockSurveys);
            const result = await repository.findListSurvey(1, 1, 10, 0);
            expect(result).toEqual([
                {
                    surveyName: 'Survey 1',
                    surveyDescription: 'Description 1',
                    duration: 30,
                    type: 'Type 1',
                    day: mockSurveys[0].day,
                    points: 10,
                    timestampCreated: mockSurveys[0].timestamp_created,
                },
                {
                    surveyName: 'Survey 2',
                    surveyDescription: 'Description 2',
                    duration: 45,
                    type: 'Type 2',
                    day: mockSurveys[1].day,
                    points: 20,
                    timestampCreated: mockSurveys[1].timestamp_created,
                },
            ]);
        });
        it('should return [] if the instance wrong input ', async () => {
            jest.spyOn(prismaService.survey, 'findMany').mockResolvedValue([]);
            const result = await repository.findListSurvey(3, 1, 10, 0);
            expect(result).toEqual([]);
        });
        it('should return [] if the instance and usergroup wrong input ', async () => {
            jest.spyOn(prismaService.survey, 'findMany').mockResolvedValue([]);
            const result = await repository.findListSurvey(3, 3, 10, 0);
            expect(result).toEqual([]);
        });
        it('should return [] if the usergroup wrong input ', async () => {
            jest.spyOn(prismaService.survey, 'findMany').mockResolvedValue([]);
            const result = await repository.findListSurvey(1, 3, 10, 0);
            expect(result).toEqual([]);
        });
    });
    describe('counttotalListSurvey', () => {
        it('should return number survey', async () => {
            jest.spyOn(prismaService.survey, 'count').mockResolvedValue(2);
            const result = await repository.counttotalListSurvey(1, 1);
            expect(result).toEqual(2);
        });
    });
    describe('getUserSurveyResponses', () => {
        it('should return survey responses if they exist', async () => {
            prismaService.surveyResponse.findMany.mockResolvedValue(mockResponses);
            const result = await repository.getUserSurveyResponses(1, 1, 1);
            expect(result).toEqual([
                {
                    questionnum: 1,
                    question: 'Question 1',
                    description: 'Description 1',
                    image: 'image1.png',
                    answer: 'A',
                },
                {
                    questionnum: 2,
                    question: 'Question 2',
                    description: 'Description 2',
                    image: 'image2.png',
                    answer: 'B',
                },
            ]);
        });
        it('should return an empty array if no survey responses exist', async () => {
            prismaService.surveyResponse.findMany.mockResolvedValue([]);
            const result = await repository.getUserSurveyResponses(1, 1, 1);
            expect(result).toEqual([]);
        });
    });
    describe('getUserSurveyResponsesByAdmin', () => {
        it('should return grouped survey responses by userId', async () => {
            prismaService.surveyResponse.findMany.mockResolvedValue(mockResponsesAdmin);
            const result = await repository.getUserSurveyResponsesByAdmin(1, 1);
            expect(result).toEqual([
                {
                    userId: 1,
                    responses: [
                        {
                            questionnum: 1,
                            question: 'Question 1',
                            description: 'Description 1',
                            image: 'image1.png',
                            answer: 'A',
                        },
                        {
                            questionnum: 2,
                            question: 'Question 2',
                            description: 'Description 2',
                            image: 'image2.png',
                            answer: 'B',
                        },
                    ],
                },
                {
                    userId: 2,
                    responses: [
                        {
                            questionnum: 1,
                            question: 'Question 1',
                            description: 'Description 1',
                            image: 'image1.png',
                            answer: 'C',
                        },
                    ],
                },
            ]);
        });
        it('should return an empty array if no survey responses exist', async () => {
            prismaService.surveyResponse.findMany.mockResolvedValue([]);
            const result = await repository.getUserSurveyResponsesByAdmin(1, 1);
            expect(result).toEqual([]);
        });
    });
    describe('addSurveyResponse', () => {
        it('should return true when survey responses are added successfully', async () => {
            const mockResult = { count: 2 };
            prismaService.surveyResponse.createMany.mockResolvedValue(mockResult);
            const datas = [
                {
                    surveyid: 1,
                    instanceid: 1,
                    userid: 1,
                    surveyitemid: 1,
                    answer: 'A',
                    delete: false,
                },
                {
                    surveyid: 1,
                    instanceid: 1,
                    userid: 1,
                    surveyitemid: 2,
                    answer: 'B',
                    delete: false,
                },
            ];
            const result = await repository.addSurveyResponse(datas);
            expect(result).toBe(true);
        });
        it('should return false when no survey responses are added', async () => {
            const mockResult = { count: 0 };
            prismaService.surveyResponse.createMany.mockResolvedValue(mockResult);
            const datas = [
                {
                    surveyid: 1,
                    instanceid: 1,
                    userid: 1,
                    surveyitemid: 1,
                    answer: 'A',
                    delete: false,
                },
            ];
            const result = await repository.addSurveyResponse(datas);
            expect(result).toBe(false);
        });
        it('should return false when an error occurs', async () => {
            prismaService.surveyResponse.createMany.mockRejectedValue(new Error('Database error'));
            const datas = [
                {
                    surveyid: 1,
                    instanceid: 1,
                    userid: 1,
                    surveyitemid: 1,
                    answer: 'A',
                    delete: false,
                },
            ];
            const result = await repository.addSurveyResponse(datas);
            expect(result).toBe(false);
        });
    });
    describe('checkAdmin', () => {
        it('should return true if the user is an admin', async () => {
            prismaService.instance.count.mockResolvedValue(1);
            const result = await repository.checkAdmin(1, 1);
            expect(result).toBe(true);
        });
        it('should return false if the user is not an admin', async () => {
            prismaService.instance.count.mockResolvedValue(0);
            const result = await repository.checkAdmin(1, 1);
            expect(result).toBe(false);
        });
    });
    describe('findListSurveyByAdmin', () => {
        it('should return a list of surveys if surveys exist', async () => {
            prismaService.survey.findMany.mockResolvedValue(mockSurveys);
            const result = await repository.findListSurveyByAdmin(1, 10, 0);
            expect(result).toEqual([
                {
                    surveyName: 'Survey 1',
                    surveyDescription: 'Description 1',
                    duration: 30,
                    type: 'Type 1',
                    day: mockSurveys[0].day,
                    points: 10,
                    timestampCreated: mockSurveys[0].timestamp_created,
                },
                {
                    surveyName: 'Survey 2',
                    surveyDescription: 'Description 2',
                    duration: 45,
                    type: 'Type 2',
                    day: mockSurveys[1].day,
                    points: 20,
                    timestampCreated: mockSurveys[1].timestamp_created,
                },
            ]);
        });
        it('should return an empty array if no surveys exist', async () => {
            prismaService.survey.findMany.mockResolvedValue([]);
            const result = await repository.findListSurveyByAdmin(1, 10, 0);
            expect(result).toEqual([]);
        });
    });
    describe('counttotalListSurveyByAdmin', () => {
        it('should return the total count of surveys', async () => {
            const mockCount = 5;
            prismaService.survey.count.mockResolvedValue(mockCount);
            const result = await repository.counttotalListSurveyByAmin(1);
            expect(result).toBe(mockCount);
        });
        it('should return the total = 0 of surveys null', async () => {
            const mockCount = 0;
            prismaService.survey.count.mockResolvedValue(mockCount);
            const result = await repository.counttotalListSurveyByAmin(1);
            expect(result).toBe(mockCount);
        });
    });
});
//# sourceMappingURL=survey-module.repository.spec.js.map