"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.SurveyModuleRepository = void 0;
var common_1 = require("@nestjs/common");
var SurveyModuleRepository = /** @class */ (function () {
    function SurveyModuleRepository(prisma) {
        this.prisma = prisma;
    }
    SurveyModuleRepository.prototype.findSurveyItems = function (surveyId, instanceId) {
        return __awaiter(this, void 0, Promise, function () {
            var surveyItems, groupedQuestions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.surveyItem.findMany({
                            where: {
                                surveyid: surveyId,
                                deleted: false,
                                instanceid: instanceId
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
                                hasCommentField: true
                            }
                        })];
                    case 1:
                        surveyItems = _a.sent();
                        groupedQuestions = surveyItems.reduce(function (acc, item) {
                            var mainQuestion = acc.find(function (q) { return q.questionNum === item.questionnum; });
                            if (mainQuestion) {
                                if (!mainQuestion.subQuestions) {
                                    mainQuestion.subQuestions = [];
                                }
                                mainQuestion.subQuestions.push({
                                    subQuestion: item.subquestion,
                                    subNum: item.subnum
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
                                                subNum: item.subnum
                                            },
                                        ]
                                        : []
                                });
                            }
                            return acc;
                        }, []);
                        return [2 /*return*/, groupedQuestions];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.checkDataResponse = function (surveyId, surveyItemId) {
        return __awaiter(this, void 0, Promise, function () {
            var surveyItems, surveyItemsid, check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.surveyItem.findMany({
                            where: {
                                surveyid: surveyId
                            },
                            select: {
                                surveyitemid: true
                            }
                        })];
                    case 1:
                        surveyItems = _a.sent();
                        surveyItemsid = surveyItems.map(function (item) { return item.surveyitemid; });
                        check = surveyItemId.every(function (id) { return surveyItemsid.includes(id); });
                        return [2 /*return*/, check];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.hasUserCompletedSurvey = function (userId, surveyId) {
        return __awaiter(this, void 0, Promise, function () {
            var surveyItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.surveyResponse.findMany({
                            where: {
                                surveyid: surveyId,
                                userid: userId,
                                "delete": false
                            }
                        })];
                    case 1:
                        surveyItems = _a.sent();
                        if (!surveyItems || surveyItems.length < 1) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.findListSurvey = function (instanceId, userGroup, perPage, skip) {
        return __awaiter(this, void 0, Promise, function () {
            var survey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.survey.findMany({
                            take: perPage,
                            skip: skip,
                            where: {
                                instanceid: instanceId,
                                groupid: userGroup,
                                deleted: false,
                                hidden: false
                            },
                            orderBy: {
                                timestamp_created: 'desc'
                            },
                            select: {
                                surveyName: true,
                                surveyDescription: true,
                                duration: true,
                                type: true,
                                day: true,
                                points: true,
                                timestamp_created: true
                            }
                        })];
                    case 1:
                        survey = _a.sent();
                        return [2 /*return*/, survey.map(function (item) { return ({
                                surveyName: item.surveyName,
                                surveyDescription: item.surveyDescription,
                                duration: item.duration,
                                type: item.type,
                                day: item.day,
                                points: item.points,
                                timestampCreated: item.timestamp_created
                            }); })];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.counttotalListSurvey = function (instanceId, userGroup) {
        return __awaiter(this, void 0, Promise, function () {
            var total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.survey.count({
                            where: {
                                instanceid: instanceId,
                                groupid: userGroup,
                                deleted: false,
                                hidden: false
                            }
                        })];
                    case 1:
                        total = _a.sent();
                        return [2 /*return*/, total];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.getUserSurveyResponses = function (instanceid, surveyId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var responses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.surveyResponse.findMany({
                            where: {
                                userid: userId,
                                surveyid: surveyId,
                                instanceid: instanceid,
                                "delete": false
                            },
                            orderBy: {
                                surveyItem: {
                                    questionnum: 'asc'
                                }
                            },
                            select: {
                                surveyItem: {
                                    select: {
                                        questionnum: true,
                                        question: true,
                                        description: true,
                                        image: true
                                    }
                                },
                                answer: true
                            }
                        })];
                    case 1:
                        responses = _a.sent();
                        return [2 /*return*/, responses.map(function (response) { return ({
                                questionnum: response.surveyItem.questionnum,
                                question: response.surveyItem.question,
                                description: response.surveyItem.description,
                                image: response.surveyItem.image,
                                answer: response.answer
                            }); })];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.getUserSurveyResponsesByAdmin = function (instanceid, surveyId) {
        return __awaiter(this, void 0, Promise, function () {
            var responses, groupedResponses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.surveyResponse.findMany({
                            where: {
                                surveyid: surveyId,
                                instanceid: instanceid,
                                "delete": false
                            },
                            orderBy: {
                                surveyItem: {
                                    questionnum: 'asc'
                                }
                            },
                            select: {
                                surveyItem: {
                                    select: {
                                        questionnum: true,
                                        question: true,
                                        description: true,
                                        image: true
                                    }
                                },
                                answer: true,
                                userid: true
                            }
                        })];
                    case 1:
                        responses = _a.sent();
                        groupedResponses = responses.reduce(function (acc, response) {
                            var userid = response.userid, surveyItem = response.surveyItem, answer = response.answer;
                            if (!acc[userid]) {
                                acc[userid] = {
                                    userId: userid,
                                    responses: []
                                };
                            }
                            acc[userid].responses.push({
                                questionnum: surveyItem.questionnum,
                                question: surveyItem.question,
                                description: surveyItem.description,
                                image: surveyItem.image,
                                answer: answer
                            });
                            return acc;
                        }, {});
                        return [2 /*return*/, Object.values(groupedResponses)];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.addSurveyResponse = function (datas) {
        return __awaiter(this, void 0, Promise, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.surveyResponse.createMany({
                                data: datas.map(function (data) {
                                    var _a;
                                    return ({
                                        surveyid: data.surveyid,
                                        instanceid: data.instanceid,
                                        userid: data.userid,
                                        surveyitemid: data.surveyitemid,
                                        answer: data.answer,
                                        "delete": (_a = data["delete"]) !== null && _a !== void 0 ? _a : false
                                    });
                                }),
                                skipDuplicates: true
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.count > 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.checkAdmin = function (userId, instanceId) {
        return __awaiter(this, void 0, Promise, function () {
            var check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.instance.count({
                            where: {
                                adminid: userId,
                                instanceid: instanceId
                            }
                        })];
                    case 1:
                        check = _a.sent();
                        if (check > 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.findListSurveyByAdmin = function (instanceId, perPage, skip) {
        return __awaiter(this, void 0, Promise, function () {
            var survey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.survey.findMany({
                            take: perPage,
                            skip: skip,
                            where: {
                                instanceid: instanceId,
                                deleted: false,
                                hidden: false
                            },
                            orderBy: {
                                timestamp_created: 'desc'
                            },
                            select: {
                                surveyName: true,
                                surveyDescription: true,
                                duration: true,
                                type: true,
                                day: true,
                                points: true,
                                timestamp_created: true
                            }
                        })];
                    case 1:
                        survey = _a.sent();
                        return [2 /*return*/, survey.map(function (item) { return ({
                                surveyName: item.surveyName,
                                surveyDescription: item.surveyDescription,
                                duration: item.duration,
                                type: item.type,
                                day: item.day,
                                points: item.points,
                                timestampCreated: item.timestamp_created
                            }); })];
                }
            });
        });
    };
    SurveyModuleRepository.prototype.counttotalListSurveyByAmin = function (instanceId) {
        return __awaiter(this, void 0, Promise, function () {
            var total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.survey.count({
                            where: {
                                instanceid: instanceId,
                                deleted: false,
                                hidden: false
                            }
                        })];
                    case 1:
                        total = _a.sent();
                        return [2 /*return*/, total];
                }
            });
        });
    };
    SurveyModuleRepository = __decorate([
        common_1.Injectable()
    ], SurveyModuleRepository);
    return SurveyModuleRepository;
}());
exports.SurveyModuleRepository = SurveyModuleRepository;
