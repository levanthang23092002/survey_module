"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.SurveyModuleService = void 0;
var common_1 = require("@nestjs/common");
var SurveyModuleService = /** @class */ (function () {
    function SurveyModuleService(SurveyRepo, moduleActivationService, groupService) {
        this.SurveyRepo = SurveyRepo;
        this.moduleActivationService = moduleActivationService;
        this.groupService = groupService;
    }
    SurveyModuleService.prototype.getDetailSurvey = function (userId, params) {
        return __awaiter(this, void 0, Promise, function () {
            var instanceId, moduleId, surveyId, isActivated, checkAdmin, surveyDetail_1, result_1, userGroup, isGroupActivated, isGroupInSurvey, surveyDetail, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceId = Number(params.eventId);
                        moduleId = Number(params.moduleId);
                        surveyId = Number(params.surveyId);
                        return [4 /*yield*/, this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId)];
                    case 1:
                        isActivated = _a.sent();
                        if (!isActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.SurveyRepo.checkAdmin(userId, instanceId)];
                    case 2:
                        checkAdmin = _a.sent();
                        if (!checkAdmin) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.SurveyRepo.findSurveyItems(surveyId, instanceId)];
                    case 3:
                        surveyDetail_1 = _a.sent();
                        result_1 = {
                            total: surveyDetail_1.length,
                            data: surveyDetail_1
                        };
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: result_1
                            }];
                    case 4: return [4 /*yield*/, this.groupService.getUserGroup(userId, instanceId)];
                    case 5:
                        userGroup = _a.sent();
                        if (!userGroup) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.isGroupActivated(userGroup.groupid, instanceId)];
                    case 6:
                        isGroupActivated = _a.sent();
                        if (!isGroupActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.isGroupInSurvey(surveyId, userGroup.groupid, instanceId)];
                    case 7:
                        isGroupInSurvey = _a.sent();
                        if (!isGroupInSurvey) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.SurveyRepo.findSurveyItems(surveyId, instanceId)];
                    case 8:
                        surveyDetail = _a.sent();
                        result = {
                            total: surveyDetail.length,
                            data: surveyDetail
                        };
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: result
                            }];
                }
            });
        });
    };
    SurveyModuleService.prototype.getSurveys = function (userId, params, data) {
        return __awaiter(this, void 0, Promise, function () {
            var page, perPage, skip, instanceId, moduleId, isActivated, checkAdmin, listSurvey_1, total_1, result_2, userGroup, isGroupActivated, listSurvey, total, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = Number(data.page) || 1;
                        perPage = Number(data.itemPerPage) || 12;
                        skip = page > 1 ? (page - 1) * perPage : 0;
                        instanceId = Number(params.eventId);
                        moduleId = Number(params.moduleId);
                        return [4 /*yield*/, this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId)];
                    case 1:
                        isActivated = _a.sent();
                        if (!isActivated) {
                            throw new common_1.NotFoundException({ message: 'Not Found' });
                        }
                        return [4 /*yield*/, this.SurveyRepo.checkAdmin(userId, instanceId)];
                    case 2:
                        checkAdmin = _a.sent();
                        if (!checkAdmin) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.SurveyRepo.findListSurveyByAdmin(instanceId, perPage, skip)];
                    case 3:
                        listSurvey_1 = _a.sent();
                        return [4 /*yield*/, this.SurveyRepo.counttotalListSurveyByAmin(instanceId)];
                    case 4:
                        total_1 = _a.sent();
                        result_2 = {
                            total: total_1,
                            itemPerPage: perPage,
                            page: page,
                            listSurvey: listSurvey_1
                        };
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: result_2
                            }];
                    case 5: return [4 /*yield*/, this.groupService.getUserGroup(userId, instanceId)];
                    case 6:
                        userGroup = _a.sent();
                        if (!userGroup) {
                            throw new common_1.NotFoundException({ message: 'Not Found' });
                        }
                        return [4 /*yield*/, this.groupService.isGroupActivated(userGroup.groupid, instanceId)];
                    case 7:
                        isGroupActivated = _a.sent();
                        if (!isGroupActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.SurveyRepo.findListSurvey(instanceId, userGroup.groupid, perPage, skip)];
                    case 8:
                        listSurvey = _a.sent();
                        return [4 /*yield*/, this.SurveyRepo.counttotalListSurvey(instanceId, userGroup.groupid)];
                    case 9:
                        total = _a.sent();
                        result = {
                            total: total,
                            itemPerPage: perPage,
                            page: page,
                            listSurvey: listSurvey
                        };
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: result
                            }];
                }
            });
        });
    };
    SurveyModuleService.prototype.getSurveyResponse = function (userId, params) {
        return __awaiter(this, void 0, Promise, function () {
            var instanceId, moduleId, surveyId, isActivated, checkAdmin, listSurvey, result_3, userGroup, isGroupActivated, isGroupInSurvey, result, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceId = Number(params.eventId);
                        moduleId = Number(params.moduleId);
                        surveyId = Number(params.surveyId);
                        return [4 /*yield*/, this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId)];
                    case 1:
                        isActivated = _a.sent();
                        if (!isActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.SurveyRepo.checkAdmin(userId, instanceId)];
                    case 2:
                        checkAdmin = _a.sent();
                        if (!checkAdmin) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.SurveyRepo.getUserSurveyResponsesByAdmin(instanceId, surveyId)];
                    case 3:
                        listSurvey = _a.sent();
                        result_3 = {
                            total: listSurvey.length,
                            listSurvey: listSurvey
                        };
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: result_3
                            }];
                    case 4: return [4 /*yield*/, this.groupService.getUserGroup(userId, instanceId)];
                    case 5:
                        userGroup = _a.sent();
                        if (!userGroup) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.isGroupActivated(userGroup.groupid, instanceId)];
                    case 6:
                        isGroupActivated = _a.sent();
                        if (!isGroupActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.isGroupInSurvey(surveyId, userGroup.groupid, instanceId)];
                    case 7:
                        isGroupInSurvey = _a.sent();
                        if (!isGroupInSurvey) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.SurveyRepo.getUserSurveyResponses(instanceId, surveyId, userId)];
                    case 8:
                        result = _a.sent();
                        if (!result || result.length == 0) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        results = {
                            total: 1,
                            listSurvey: [
                                {
                                    userId: userId,
                                    responses: result
                                },
                            ]
                        };
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: results
                            }];
                }
            });
        });
    };
    SurveyModuleService.prototype.addSurveyResponse = function (userId, params, body) {
        return __awaiter(this, void 0, Promise, function () {
            var instanceId, moduleId, surveyId, data, isActivated, userGroup, isGroupActivated, isGroupInSurvey, listSurvayItemId, checkListAnswer, userCompletedSurvey, datas, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceId = Number(params.eventId);
                        moduleId = Number(params.moduleId);
                        surveyId = Number(params.surveyId);
                        data = body.data;
                        return [4 /*yield*/, this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId)];
                    case 1:
                        isActivated = _a.sent();
                        if (!isActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.getUserGroup(userId, instanceId)];
                    case 2:
                        userGroup = _a.sent();
                        if (!userGroup) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.isGroupActivated(userGroup.groupid, instanceId)];
                    case 3:
                        isGroupActivated = _a.sent();
                        if (!isGroupActivated) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.groupService.isGroupInSurvey(surveyId, userGroup.groupid, instanceId)];
                    case 4:
                        isGroupInSurvey = _a.sent();
                        if (!isGroupInSurvey) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        listSurvayItemId = data.map(function (item) { return item.surveyItemId; });
                        return [4 /*yield*/, this.SurveyRepo.checkDataResponse(surveyId, listSurvayItemId)];
                    case 5:
                        checkListAnswer = _a.sent();
                        if (!checkListAnswer) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [4 /*yield*/, this.SurveyRepo.hasUserCompletedSurvey(userId, surveyId)];
                    case 6:
                        userCompletedSurvey = _a.sent();
                        if (userCompletedSurvey) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        datas = data.map(function (item) {
                            return __assign({ surveyid: surveyId, instanceid: instanceId, userid: userId, surveyitemid: item.surveyItemId }, item);
                        });
                        return [4 /*yield*/, this.SurveyRepo.addSurveyResponse(datas)];
                    case 7:
                        results = _a.sent();
                        if (!results) {
                            throw new common_1.NotFoundException({
                                message: 'Not Found'
                            });
                        }
                        return [2 /*return*/, {
                                status: 'success',
                                message: 'Survey details retrieved successfully',
                                data: data
                            }];
                }
            });
        });
    };
    SurveyModuleService = __decorate([
        common_1.Injectable()
    ], SurveyModuleService);
    return SurveyModuleService;
}());
exports.SurveyModuleService = SurveyModuleService;
