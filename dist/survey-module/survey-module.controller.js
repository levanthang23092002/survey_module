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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModuleController = void 0;
const common_1 = require("@nestjs/common");
const survey_module_service_1 = require("./survey-module.service");
const survey_dto_1 = require("./dto/survey.dto");
const swagger_1 = require("@nestjs/swagger");
let SurveyModuleController = class SurveyModuleController {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    async getSurveyDetail(params, req) {
        const userid = req.user?.userId;
        return await this.surveyService.getDetailSurvey(userid, params);
    }
    async getListSurvey(params, page, req) {
        const userid = req.user?.userId;
        return await this.surveyService.getSurveys(userid, params, page);
    }
    async getUserSurveyResponse(req, params) {
        const userid = req.user?.userId;
        return await this.surveyService.getSurveyResponse(userid, params);
    }
    async addUserSurveyResponse(req, params, body) {
        const userid = req.user?.userId;
        return await this.surveyService.addSurveyResponse(userid, params, body);
    }
};
exports.SurveyModuleController = SurveyModuleController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('event/:eventId/module/:moduleId/surveys/:surveyId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_dto_1.SurveyRouteParamsDto, Object]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "getSurveyDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('event/:eventId/module/:moduleId/surveys'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [survey_dto_1.BasicRouteParamsDto,
        survey_dto_1.InputSurvey, Object]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "getListSurvey", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('event/:eventId/module/:moduleId/surveys/:surveyId/result'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, survey_dto_1.SurveyRouteParamsDto]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "getUserSurveyResponse", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('event/:eventId/module/:moduleId/surveys/:surveyId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, survey_dto_1.SurveyRouteParamsDto,
        survey_dto_1.CreateSurveyResponse]),
    __metadata("design:returntype", Promise)
], SurveyModuleController.prototype, "addUserSurveyResponse", null);
exports.SurveyModuleController = SurveyModuleController = __decorate([
    (0, common_1.Controller)(''),
    (0, swagger_1.ApiTags)('Survey'),
    __metadata("design:paramtypes", [survey_module_service_1.SurveyModuleService])
], SurveyModuleController);
//# sourceMappingURL=survey-module.controller.js.map