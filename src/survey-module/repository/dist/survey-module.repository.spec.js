"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@nestjs/testing");
var survey_module_repository_1 = require("./survey-module.repository");
var prisma_service_1 = require("../../prisma.service");
describe('SurveyModuleRepository', function () {
    var repository;
    var prismaService;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            survey_module_repository_1.SurveyModuleRepository,
                            {
                                provide: prisma_service_1.PrismaService,
                                useValue: {
                                    surveyItem: {
                                        findMany: jest.fn()
                                    },
                                    surveyResponse: {
                                        findMany: jest.fn(),
                                        createMany: jest.fn()
                                    },
                                    survey: {
                                        findMany: jest.fn(),
                                        count: jest.fn()
                                    },
                                    instance: {
                                        count: jest.fn()
                                    }
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    repository = module.get(survey_module_repository_1.SurveyModuleRepository);
                    prismaService = module.get(prisma_service_1.PrismaService);
                    return [2 /*return*/];
            }
        });
    }); });
    var mockSurveyItems = [
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
            timestamp_deleted: null
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
            timestamp_deleted: null
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
            timestamp_deleted: null
        },
    ];
    var mockSurveyResponses = [
        {
            responseid: 1,
            surveyid: 1,
            instanceid: 1,
            userid: 2,
            surveyitemid: 1,
            answer: 'A',
            "delete": false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: new Date()
        },
        {
            responseid: 1,
            surveyid: 1,
            instanceid: 1,
            userid: 2,
            surveyitemid: 2,
            answer: 'A',
            "delete": false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: new Date()
        },
        {
            responseid: 1,
            surveyid: 1,
            instanceid: 1,
            userid: 2,
            surveyitemid: 3,
            answer: 'A',
            "delete": false,
            timestamp_created: new Date(),
            timestamp_updated: new Date(),
            timestamp_deleted: new Date()
        },
    ];
    var mockSurveys = [
        {
            surveyName: 'Survey 1',
            surveyDescription: 'Description 1',
            duration: 30,
            type: 'Type 1',
            day: new Date(),
            points: 10,
            timestamp_created: new Date()
        },
        {
            surveyName: 'Survey 2',
            surveyDescription: 'Description 2',
            duration: 45,
            type: 'Type 2',
            day: new Date(),
            points: 20,
            timestamp_created: new Date()
        },
    ];
    var mockResponses = [
        {
            surveyItem: {
                questionnum: 1,
                question: 'Question 1',
                description: 'Description 1',
                image: 'image1.png'
            },
            answer: 'A'
        },
        {
            surveyItem: {
                questionnum: 2,
                question: 'Question 2',
                description: 'Description 2',
                image: 'image2.png'
            },
            answer: 'B'
        },
    ];
    var mockResponsesAdmin = [
        {
            surveyItem: {
                questionnum: 1,
                question: 'Question 1',
                description: 'Description 1',
                image: 'image1.png'
            },
            answer: 'A',
            userid: 1
        },
        {
            surveyItem: {
                questionnum: 2,
                question: 'Question 2',
                description: 'Description 2',
                image: 'image2.png'
            },
            answer: 'B',
            userid: 1
        },
        {
            surveyItem: {
                questionnum: 1,
                question: 'Question 1',
                description: 'Description 1',
                image: 'image1.png'
            },
            answer: 'C',
            userid: 2
        },
    ];
    it('should be defined', function () {
        expect(repository).toBeDefined();
    });
    describe('findSurveyItems', function () {
        it('should return grouped survey items', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(prismaService.surveyItem, 'findMany')
                            .mockResolvedValue(mockSurveyItems);
                        return [4 /*yield*/, repository.findSurveyItems(1, 1)];
                    case 1:
                        result = _a.sent();
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
                                ]
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
                                subQuestions: []
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('checkDataResponse', function () {
        it('should return true if all surveyItemIds exist in the survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(prismaService.surveyItem, 'findMany')
                            .mockResolvedValue(mockSurveyItems);
                        return [4 /*yield*/, repository.checkDataResponse(1, [1, 2])];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if any surveyItemId does not exist in the survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(prismaService.surveyItem, 'findMany')
                            .mockResolvedValue(mockSurveyItems);
                        return [4 /*yield*/, repository.checkDataResponse(1, [1, 4])];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if no survey items are found for the given surveyId', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(prismaService.surveyItem, 'findMany').mockResolvedValue([]);
                        return [4 /*yield*/, repository.checkDataResponse(1, [1, 2])];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('hasUserCompletedSurvey', function () {
        it('should return true if the user has completed the survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(prismaService.surveyResponse, 'findMany')
                            .mockResolvedValue(mockSurveyResponses);
                        return [4 /*yield*/, repository.hasUserCompletedSurvey(1, 1)];
                    case 1:
                        result1 = _a.sent();
                        expect(result1).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the user has not completed the survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest
                            .spyOn(prismaService.surveyResponse, 'findMany')
                            .mockResolvedValue([]);
                        _a = expect;
                        return [4 /*yield*/, repository.hasUserCompletedSurvey(5, 5)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the user has not completed the survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest
                            .spyOn(prismaService.surveyResponse, 'findMany')
                            .mockResolvedValue([]);
                        _a = expect;
                        return [4 /*yield*/, repository.hasUserCompletedSurvey(5, 3)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findListSurvey', function () {
        it('should return a list of surveys', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.survey.findMany.mockResolvedValue(mockSurveys);
                        return [4 /*yield*/, repository.findListSurvey(1, 1, 10, 0)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            {
                                surveyName: 'Survey 1',
                                surveyDescription: 'Description 1',
                                duration: 30,
                                type: 'Type 1',
                                day: mockSurveys[0].day,
                                points: 10,
                                timestampCreated: mockSurveys[0].timestamp_created
                            },
                            {
                                surveyName: 'Survey 2',
                                surveyDescription: 'Description 2',
                                duration: 45,
                                type: 'Type 2',
                                day: mockSurveys[1].day,
                                points: 20,
                                timestampCreated: mockSurveys[1].timestamp_created
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return [] if the instance wrong input ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(prismaService.survey, 'findMany').mockResolvedValue([]);
                        return [4 /*yield*/, repository.findListSurvey(3, 1, 10, 0)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return [] if the instance and usergroup wrong input ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(prismaService.survey, 'findMany').mockResolvedValue([]);
                        return [4 /*yield*/, repository.findListSurvey(3, 3, 10, 0)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return [] if the usergroup wrong input ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(prismaService.survey, 'findMany').mockResolvedValue([]);
                        return [4 /*yield*/, repository.findListSurvey(1, 3, 10, 0)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('counttotalListSurvey', function () {
        it('should return number survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(prismaService.survey, 'count').mockResolvedValue(2);
                        return [4 /*yield*/, repository.counttotalListSurvey(1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getUserSurveyResponses', function () {
        it('should return survey responses if they exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.surveyResponse.findMany.mockResolvedValue(mockResponses);
                        return [4 /*yield*/, repository.getUserSurveyResponses(1, 1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            {
                                questionnum: 1,
                                question: 'Question 1',
                                description: 'Description 1',
                                image: 'image1.png',
                                answer: 'A'
                            },
                            {
                                questionnum: 2,
                                question: 'Question 2',
                                description: 'Description 2',
                                image: 'image2.png',
                                answer: 'B'
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty array if no survey responses exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.surveyResponse.findMany.mockResolvedValue([]);
                        return [4 /*yield*/, repository.getUserSurveyResponses(1, 1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getUserSurveyResponsesByAdmin', function () {
        it('should return grouped survey responses by userId', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.surveyResponse.findMany.mockResolvedValue(mockResponsesAdmin);
                        return [4 /*yield*/, repository.getUserSurveyResponsesByAdmin(1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            {
                                userId: 1,
                                responses: [
                                    {
                                        questionnum: 1,
                                        question: 'Question 1',
                                        description: 'Description 1',
                                        image: 'image1.png',
                                        answer: 'A'
                                    },
                                    {
                                        questionnum: 2,
                                        question: 'Question 2',
                                        description: 'Description 2',
                                        image: 'image2.png',
                                        answer: 'B'
                                    },
                                ]
                            },
                            {
                                userId: 2,
                                responses: [
                                    {
                                        questionnum: 1,
                                        question: 'Question 1',
                                        description: 'Description 1',
                                        image: 'image1.png',
                                        answer: 'C'
                                    },
                                ]
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty array if no survey responses exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.surveyResponse.findMany.mockResolvedValue([]);
                        return [4 /*yield*/, repository.getUserSurveyResponsesByAdmin(1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('addSurveyResponse', function () {
        it('should return true when survey responses are added successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockResult, datas, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockResult = { count: 2 };
                        prismaService.surveyResponse.createMany.mockResolvedValue(mockResult);
                        datas = [
                            {
                                surveyid: 1,
                                instanceid: 1,
                                userid: 1,
                                surveyitemid: 1,
                                answer: 'A',
                                "delete": false
                            },
                            {
                                surveyid: 1,
                                instanceid: 1,
                                userid: 1,
                                surveyitemid: 2,
                                answer: 'B',
                                "delete": false
                            },
                        ];
                        return [4 /*yield*/, repository.addSurveyResponse(datas)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when no survey responses are added', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockResult, datas, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockResult = { count: 0 };
                        prismaService.surveyResponse.createMany.mockResolvedValue(mockResult);
                        datas = [
                            {
                                surveyid: 1,
                                instanceid: 1,
                                userid: 1,
                                surveyitemid: 1,
                                answer: 'A',
                                "delete": false
                            },
                        ];
                        return [4 /*yield*/, repository.addSurveyResponse(datas)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false when an error occurs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var datas, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.surveyResponse.createMany.mockRejectedValue(new Error('Database error'));
                        datas = [
                            {
                                surveyid: 1,
                                instanceid: 1,
                                userid: 1,
                                surveyitemid: 1,
                                answer: 'A',
                                "delete": false
                            },
                        ];
                        return [4 /*yield*/, repository.addSurveyResponse(datas)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('checkAdmin', function () {
        it('should return true if the user is an admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.instance.count.mockResolvedValue(1);
                        return [4 /*yield*/, repository.checkAdmin(1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return false if the user is not an admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.instance.count.mockResolvedValue(0);
                        return [4 /*yield*/, repository.checkAdmin(1, 1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findListSurveyByAdmin', function () {
        it('should return a list of surveys if surveys exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prismaService.survey.findMany.mockResolvedValue(mockSurveys);
                        return [4 /*yield*/, repository.findListSurveyByAdmin(1, 10, 0)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            {
                                surveyName: 'Survey 1',
                                surveyDescription: 'Description 1',
                                duration: 30,
                                type: 'Type 1',
                                day: mockSurveys[0].day,
                                points: 10,
                                timestampCreated: mockSurveys[0].timestamp_created
                            },
                            {
                                surveyName: 'Survey 2',
                                surveyDescription: 'Description 2',
                                duration: 45,
                                type: 'Type 2',
                                day: mockSurveys[1].day,
                                points: 20,
                                timestampCreated: mockSurveys[1].timestamp_created
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an empty array if no surveys exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mocking the findMany method to return an empty array
                        prismaService.survey.findMany.mockResolvedValue([]);
                        return [4 /*yield*/, repository.findListSurveyByAdmin(1, 10, 0)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('counttotalListSurveyByAdmin', function () {
        it('should return the total count of surveys', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockCount, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockCount = 5;
                        prismaService.survey.count.mockResolvedValue(mockCount);
                        return [4 /*yield*/, repository.counttotalListSurveyByAmin(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(mockCount);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the total = 0 of surveys null', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockCount, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockCount = 0;
                        prismaService.survey.count.mockResolvedValue(mockCount);
                        return [4 /*yield*/, repository.counttotalListSurveyByAmin(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(mockCount);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
