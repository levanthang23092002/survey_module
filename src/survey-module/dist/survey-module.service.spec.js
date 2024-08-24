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
var survey_module_service_1 = require("./survey-module.service");
var module_activation_service_1 = require("../module-activation/module-activation.service");
var groups_service_1 = require("../groups/groups.service");
var survey_module_repository_1 = require("./repository/survey-module.repository");
var common_1 = require("@nestjs/common");
describe('SurveyService', function () {
    var surveyService;
    var moduleActivationService;
    var groupService;
    var surveyRepo;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            survey_module_service_1.SurveyModuleService,
                            {
                                provide: module_activation_service_1.ModuleActivationService,
                                useValue: {
                                    isSurveyModuleActivated: jest.fn()
                                }
                            },
                            {
                                provide: groups_service_1.GroupsService,
                                useValue: {
                                    getUserGroup: jest.fn(),
                                    isGroupActivated: jest.fn(),
                                    isGroupInSurvey: jest.fn()
                                }
                            },
                            {
                                provide: survey_module_repository_1.SurveyModuleRepository,
                                useValue: {
                                    checkAdmin: jest.fn(),
                                    findSurveyItems: jest.fn(),
                                    findListSurveyByAdmin: jest.fn(),
                                    counttotalListSurveyByAmin: jest.fn(),
                                    getUserSurveyResponsesByAdmin: jest.fn(),
                                    getUserSurveyResponses: jest.fn(),
                                    addSurveyResponse: jest.fn(),
                                    checkDataResponse: jest.fn(),
                                    hasUserCompletedSurvey: jest.fn(),
                                    findListSurvey: jest.fn(),
                                    counttotalListSurvey: jest.fn()
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    surveyService = module.get(survey_module_service_1.SurveyModuleService);
                    moduleActivationService = module.get(module_activation_service_1.ModuleActivationService);
                    groupService = module.get(groups_service_1.GroupsService);
                    surveyRepo = module.get(survey_module_repository_1.SurveyModuleRepository);
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe('getDetailSurvey', function () {
        it('should return survey details if the user is an admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var surveyItem, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(true);
                        surveyItem = [
                            {
                                questionNum: 1,
                                question: 'What is your favorite programming language?',
                                description: 'Please select one from the following choices.',
                                image: 'https://example.com/question-image.png',
                                choice1: 'JavaScript',
                                choice2: 'Python',
                                choice3: 'Java',
                                choice4: 'C++',
                                type: 'multiple-choice',
                                required: true,
                                showDescription: true,
                                shuffleChoice: false,
                                hasCommentField: true,
                                subQuestions: [
                                    {
                                        subQuestion: 'Why do you prefer this language?',
                                        subNum: 1
                                    },
                                    {
                                        subQuestion: 'Which other languages do you use frequently?',
                                        subNum: 2
                                    },
                                ]
                            },
                        ];
                        jest.spyOn(surveyRepo, 'findSurveyItems').mockResolvedValue(surveyItem);
                        return [4 /*yield*/, surveyService.getDetailSurvey(1, {
                                eventId: 1,
                                moduleId: 1,
                                surveyId: 1
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            status: 'success',
                            message: 'Survey details retrieved successfully',
                            data: {
                                total: 1,
                                data: surveyItem
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if the survey module is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getDetailSurvey(1, {
                                eventId: 1,
                                moduleId: 1,
                                surveyId: 1
                            })).rejects.toThrow(common_1.NotFoundException)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if the user is not an admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getDetailSurvey(1, {
                                eventId: 1,
                                moduleId: 1,
                                surveyId: 1
                            })).rejects.toThrow(common_1.NotFoundException)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getSurveys', function () {
        var listSurvers = [
            {
                surveyName: 'Customer Satisfaction Survey',
                surveyDescription: 'This survey aims to gather feedback.',
                duration: 30,
                type: 'Customer Feedback',
                day: new Date('2024-08-23'),
                points: 10,
                timestampCreated: new Date()
            },
        ];
        it('should return survey details for an admin user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = { eventId: 1, moduleId: 1 };
                        data = { page: 1, itemPerPage: 10 };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(true);
                        jest
                            .spyOn(surveyRepo, 'findListSurveyByAdmin')
                            .mockResolvedValue(listSurvers);
                        jest.spyOn(surveyRepo, 'counttotalListSurveyByAmin').mockResolvedValue(2);
                        return [4 /*yield*/, surveyService.getSurveys(userId, params, data)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            status: 'success',
                            message: 'Survey details retrieved successfully',
                            data: {
                                total: 2,
                                itemPerPage: 10,
                                page: 1,
                                listSurvey: listSurvers
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if module is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = { eventId: 1, moduleId: 1 };
                        data = { page: 1, itemPerPage: 10 };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getSurveys(userId, params, data)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return survey details for a user in an activated group', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = { eventId: 1, moduleId: 1 };
                        data = { page: 1, itemPerPage: 10 };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest
                            .spyOn(groupService, 'getUserGroup')
                            .mockResolvedValue({ groupid: 1 });
                        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'findListSurvey').mockResolvedValue(listSurvers);
                        jest.spyOn(surveyRepo, 'counttotalListSurvey').mockResolvedValue(2);
                        return [4 /*yield*/, surveyService.getSurveys(userId, params, data)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            status: 'success',
                            message: 'Survey details retrieved successfully',
                            data: {
                                total: 2,
                                itemPerPage: 10,
                                page: 1,
                                listSurvey: listSurvers
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if user group is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = { eventId: 1, moduleId: 1 };
                        data = { page: 1, itemPerPage: 10 };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest.spyOn(groupService, 'getUserGroup').mockResolvedValue(null);
                        return [4 /*yield*/, expect(surveyService.getSurveys(userId, params, data)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if group is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = { eventId: 1, moduleId: 1 };
                        data = { page: 1, itemPerPage: 10 };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest
                            .spyOn(groupService, 'getUserGroup')
                            .mockResolvedValue({ groupid: 1 });
                        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getSurveys(userId, params, data)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getSurveyResponse', function () {
        var responses = [
            {
                userid: 1,
                surveyItem: {
                    questionnum: 1,
                    question: 'What is your favorite color?',
                    description: 'Choose your favorite color.',
                    image: 'color.png'
                },
                answer: 'Blue'
            },
        ];
        var responseuser = [
            {
                questionnum: 1,
                question: 'What is your favorite color?',
                description: 'Choose your favorite color.',
                image: 'color.png',
                answer: 'Blue'
            },
        ];
        it('should return survey responses for an admin user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = {
                            eventId: 1,
                            moduleId: 1,
                            surveyId: 1
                        };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(true);
                        jest
                            .spyOn(surveyRepo, 'getUserSurveyResponsesByAdmin')
                            .mockResolvedValue([{ userId: 1, responses: responses }]);
                        return [4 /*yield*/, surveyService.getSurveyResponse(userId, params)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            status: 'success',
                            message: 'Survey details retrieved successfully',
                            data: {
                                total: 1,
                                listSurvey: [{ userId: 1, responses: responses }]
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return survey responses for a user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = {
                            eventId: 1,
                            moduleId: 1,
                            surveyId: 1
                        };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest
                            .spyOn(groupService, 'getUserGroup')
                            .mockResolvedValue({ groupid: 1 });
                        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                        jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
                        jest
                            .spyOn(surveyRepo, 'getUserSurveyResponses')
                            .mockResolvedValue(responseuser);
                        return [4 /*yield*/, surveyService.getSurveyResponse(userId, params)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            status: 'success',
                            message: 'Survey details retrieved successfully',
                            data: {
                                total: 1,
                                listSurvey: [{ userId: 1, responses: responseuser }]
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if module is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = {
                            eventId: 1,
                            moduleId: 1,
                            surveyId: 1
                        };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getSurveyResponse(userId, params)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if user is not  a user group is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = {
                            eventId: 1,
                            moduleId: 1,
                            surveyId: 1
                        };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest.spyOn(groupService, 'getUserGroup').mockResolvedValue(null);
                        return [4 /*yield*/, expect(surveyService.getSurveyResponse(userId, params)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if user group is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = {
                            eventId: 1,
                            moduleId: 1,
                            surveyId: 1
                        };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest
                            .spyOn(groupService, 'getUserGroup')
                            .mockResolvedValue({ groupid: 1 });
                        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getSurveyResponse(userId, params)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw NotFoundException if group is not in survey', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = 1;
                        params = {
                            eventId: 1,
                            moduleId: 1,
                            surveyId: 1
                        };
                        jest
                            .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                            .mockResolvedValue(true);
                        jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
                        jest
                            .spyOn(groupService, 'getUserGroup')
                            .mockResolvedValue({ groupid: 1 });
                        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                        jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(false);
                        return [4 /*yield*/, expect(surveyService.getSurveyResponse(userId, params)).rejects.toThrow(new common_1.NotFoundException({ message: 'Not Found' }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('addSurveyResponse', function () {
            var userId = 1;
            var params = { eventId: 1, moduleId: 1, surveyId: 1 };
            var body = {
                data: [
                    { surveyItemId: 1, answer: 'Answer 1' },
                    { surveyItemId: 2, answer: 'Answer 2' },
                    { surveyItemId: 3, answer: 'Answer 3' },
                ]
            };
            it('should add survey response successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(true);
                            jest
                                .spyOn(groupService, 'getUserGroup')
                                .mockResolvedValue({ groupid: 1 });
                            jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                            jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
                            jest.spyOn(surveyRepo, 'checkDataResponse').mockResolvedValue(true);
                            jest
                                .spyOn(surveyRepo, 'hasUserCompletedSurvey')
                                .mockResolvedValue(false);
                            jest
                                .spyOn(surveyRepo, 'addSurveyResponse')
                                .mockResolvedValue(body.data);
                            return [4 /*yield*/, surveyService.addSurveyResponse(userId, params, body)];
                        case 1:
                            result = _a.sent();
                            expect(result.status).toBe('success');
                            expect(result.message).toBe('Survey details retrieved successfully');
                            expect(result.data).toEqual(body.data);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw NotFoundException if module is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(false);
                            return [4 /*yield*/, expect(surveyService.addSurveyResponse(userId, params, body)).rejects.toThrow(common_1.NotFoundException)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw NotFoundException if user group is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(true);
                            jest.spyOn(groupService, 'getUserGroup').mockResolvedValue(null);
                            return [4 /*yield*/, expect(surveyService.addSurveyResponse(userId, params, body)).rejects.toThrow(common_1.NotFoundException)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw NotFoundException if group is not activated', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(true);
                            jest
                                .spyOn(groupService, 'getUserGroup')
                                .mockResolvedValue({ groupid: 1 });
                            jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(false);
                            return [4 /*yield*/, expect(surveyService.addSurveyResponse(userId, params, body)).rejects.toThrow(common_1.NotFoundException)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw NotFoundException if group is not in survey', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(true);
                            jest
                                .spyOn(groupService, 'getUserGroup')
                                .mockResolvedValue({ groupid: 1 });
                            jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                            jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(false);
                            return [4 /*yield*/, expect(surveyService.addSurveyResponse(userId, params, body)).rejects.toThrow(common_1.NotFoundException)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw NotFoundException if data response is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(true);
                            jest
                                .spyOn(groupService, 'getUserGroup')
                                .mockResolvedValue({ groupid: 1 });
                            jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                            jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
                            jest.spyOn(surveyRepo, 'checkDataResponse').mockResolvedValue(false);
                            return [4 /*yield*/, expect(surveyService.addSurveyResponse(userId, params, body)).rejects.toThrow(common_1.NotFoundException)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw NotFoundException if user has already completed the survey', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jest
                                .spyOn(moduleActivationService, 'isSurveyModuleActivated')
                                .mockResolvedValue(true);
                            jest
                                .spyOn(groupService, 'getUserGroup')
                                .mockResolvedValue({ groupid: 1 });
                            jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
                            jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
                            jest.spyOn(surveyRepo, 'checkDataResponse').mockResolvedValue(true);
                            jest
                                .spyOn(surveyRepo, 'hasUserCompletedSurvey')
                                .mockResolvedValue(true);
                            return [4 /*yield*/, expect(surveyService.addSurveyResponse(userId, params, body)).rejects.toThrow(common_1.NotFoundException)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
