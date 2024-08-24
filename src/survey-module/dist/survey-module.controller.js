"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.SurveyModuleController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var SurveyModuleController = /** @class */ (function () {
    function SurveyModuleController(surveyService) {
        this.surveyService = surveyService;
    }
    SurveyModuleController.prototype.getSurveyDetail = function (params, req) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var userid, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                        return [4 /*yield*/, this.surveyService.getDetailSurvey(userid, params)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_1 = _b.sent();
                        throw new common_1.NotFoundException({
                            status: 'error',
                            message: 'Survey not found',
                            errorCode: 'NOT_FOUND'
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SurveyModuleController.prototype.getListSurvey = function (params, page, req) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var userid, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                        return [4 /*yield*/, this.surveyService.getSurveys(userid, params, page)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_2 = _b.sent();
                        throw new common_1.NotFoundException({
                            status: 'error',
                            message: 'Survey not found',
                            errorCode: 'NOT_FOUND'
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SurveyModuleController.prototype.getUserSurveyResponse = function (req, params) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var userid, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                        return [4 /*yield*/, this.surveyService.getSurveyResponse(userid, params)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_3 = _b.sent();
                        throw new common_1.NotFoundException({
                            status: 'error',
                            message: 'Survey not found',
                            errorCode: 'NOT_FOUND'
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SurveyModuleController.prototype.addUserSurveyResponse = function (req, params, body) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var userid, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                        return [4 /*yield*/, this.surveyService.addSurveyResponse(userid, params, body)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_4 = _b.sent();
                        throw new common_1.NotFoundException({
                            status: 'error',
                            message: 'Survey not found',
                            errorCode: 'NOT_FOUND'
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        swagger_1.ApiBearerAuth('JWT-auth'),
        common_1.Get('event/:eventId/module/:moduleId/surveys/:surveyId'),
        __param(0, common_1.Param()),
        __param(1, common_1.Request())
    ], SurveyModuleController.prototype, "getSurveyDetail");
    __decorate([
        swagger_1.ApiBearerAuth('JWT-auth'),
        common_1.Get('event/:eventId/module/:moduleId/surveys'),
        __param(0, common_1.Param()),
        __param(1, common_1.Query()),
        __param(2, common_1.Request())
    ], SurveyModuleController.prototype, "getListSurvey");
    __decorate([
        swagger_1.ApiBearerAuth('JWT-auth'),
        common_1.Get('event/:eventId/module/:moduleId/surveys/:surveyId/result'),
        __param(0, common_1.Request()),
        __param(1, common_1.Param())
    ], SurveyModuleController.prototype, "getUserSurveyResponse");
    __decorate([
        swagger_1.ApiBearerAuth('JWT-auth'),
        common_1.Post('event/:eventId/module/:moduleId/surveys/:surveyId'),
        __param(0, common_1.Request()),
        __param(1, common_1.Param()),
        __param(2, common_1.Body())
    ], SurveyModuleController.prototype, "addUserSurveyResponse");
    SurveyModuleController = __decorate([
        common_1.Controller(''),
        swagger_1.ApiTags('Survey')
    ], SurveyModuleController);
    return SurveyModuleController;
}());
exports.SurveyModuleController = SurveyModuleController;
