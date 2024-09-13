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
exports.SurveyModuleService = void 0;
const common_1 = require("@nestjs/common");
const survey_module_repository_1 = require("./repository/survey-module.repository");
const module_activation_service_1 = require("../module-activation/module-activation.service");
const groups_service_1 = require("../groups/groups.service");
let SurveyModuleService = class SurveyModuleService {
    constructor(SurveyRepo, moduleActivationService, groupService) {
        this.SurveyRepo = SurveyRepo;
        this.moduleActivationService = moduleActivationService;
        this.groupService = groupService;
    }
    async getDetailSurvey(userId, params) {
        const instanceId = Number(params.eventId);
        const moduleId = Number(params.moduleId);
        const surveyId = Number(params.surveyId);
        const isActivated = await this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId);
        if (!isActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const checkAdmin = await this.SurveyRepo.checkAdmin(userId, instanceId);
        if (checkAdmin) {
            const surveyDetail = await this.SurveyRepo.findSurveyItems(surveyId, instanceId);
            const result = {
                total: surveyDetail.length,
                data: surveyDetail,
            };
            return {
                status: 'success',
                message: 'Get all survey item retrieved successfully',
                data: result,
            };
        }
        const userGroup = await this.groupService.getUserGroup(userId, instanceId);
        if (!userGroup) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const isGroupActivated = await this.groupService.isGroupActivated(userGroup.groupid, instanceId);
        if (!isGroupActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const isGroupInSurvey = await this.groupService.isGroupInSurvey(surveyId, userGroup.groupid, instanceId);
        if (!isGroupInSurvey) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const surveyDetail = await this.SurveyRepo.findSurveyItems(surveyId, instanceId);
        const result = {
            total: surveyDetail.length,
            data: surveyDetail,
        };
        return {
            status: 'success',
            message: 'Survey details retrieved successfully',
            data: result,
        };
    }
    async getSurveys(userId, params, data) {
        const page = Number(data.page) || 1;
        const perPage = Number(data.itemPerPage) || 12;
        const skip = page > 1 ? (page - 1) * perPage : 0;
        const instanceId = Number(params.eventId);
        const moduleId = Number(params.moduleId);
        const isActivated = await this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId);
        if (!isActivated) {
            throw new common_1.NotFoundException({ message: 'Not Found' });
        }
        const checkAdmin = await this.SurveyRepo.checkAdmin(userId, instanceId);
        if (checkAdmin) {
            const listSurvey = await this.SurveyRepo.findListSurveyByAdmin(instanceId, perPage, skip);
            const total = await this.SurveyRepo.counttotalListSurveyByAmin(instanceId);
            const result = {
                total: total,
                itemPerPage: perPage,
                page: page,
                listSurvey: listSurvey,
            };
            return {
                status: 'success',
                message: 'Get all surveys retrieved successfully',
                data: result,
            };
        }
        const userGroup = await this.groupService.getUserGroup(userId, instanceId);
        if (!userGroup) {
            throw new common_1.NotFoundException({ message: 'Not Found' });
        }
        const isGroupActivated = await this.groupService.isGroupActivated(userGroup.groupid, instanceId);
        if (!isGroupActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const listSurvey = await this.SurveyRepo.findListSurvey(instanceId, userGroup.groupid, perPage, skip);
        const total = await this.SurveyRepo.counttotalListSurvey(instanceId, userGroup.groupid);
        const result = {
            total: total,
            itemPerPage: perPage,
            page: page,
            listSurvey: listSurvey,
        };
        return {
            status: 'success',
            message: 'Get all surveys retrieved successfully',
            data: result,
        };
    }
    async getSurveyResponse(userId, params) {
        const instanceId = Number(params.eventId);
        const moduleId = Number(params.moduleId);
        const surveyId = Number(params.surveyId);
        const isActivated = await this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId);
        if (!isActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const checkAdmin = await this.SurveyRepo.checkAdmin(userId, instanceId);
        if (checkAdmin) {
            const listSurvey = await this.SurveyRepo.getUserSurveyResponsesByAdmin(instanceId, surveyId);
            const result = {
                total: listSurvey.length,
                listSurvey: listSurvey,
            };
            return {
                status: 'success',
                message: 'Get Survey Results retrieved successfully',
                data: result,
            };
        }
        const userGroup = await this.groupService.getUserGroup(userId, instanceId);
        if (!userGroup) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const isGroupActivated = await this.groupService.isGroupActivated(userGroup.groupid, instanceId);
        if (!isGroupActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const isGroupInSurvey = await this.groupService.isGroupInSurvey(surveyId, userGroup.groupid, instanceId);
        if (!isGroupInSurvey) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const result = await this.SurveyRepo.getUserSurveyResponses(instanceId, surveyId, userId);
        if (!result || result.length == 0) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const results = {
            total: 1,
            listSurvey: [
                {
                    userId: userId,
                    responses: result,
                },
            ],
        };
        return {
            status: 'success',
            message: 'Get Survey Results retrieved successfully',
            data: results,
        };
    }
    async addSurveyResponse(userId, params, body) {
        const instanceId = Number(params.eventId);
        const moduleId = Number(params.moduleId);
        const surveyId = Number(params.surveyId);
        const data = body.data;
        const isActivated = await this.moduleActivationService.isSurveyModuleActivated(moduleId, instanceId);
        if (!isActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const userGroup = await this.groupService.getUserGroup(userId, instanceId);
        if (!userGroup) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const isGroupActivated = await this.groupService.isGroupActivated(userGroup.groupid, instanceId);
        if (!isGroupActivated) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const isGroupInSurvey = await this.groupService.isGroupInSurvey(surveyId, userGroup.groupid, instanceId);
        if (!isGroupInSurvey) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const listSurvayItemId = data.map((item) => item.surveyItemId);
        const checkListAnswer = await this.SurveyRepo.checkDataResponse(surveyId, listSurvayItemId);
        if (!checkListAnswer) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const userCompletedSurvey = await this.SurveyRepo.hasUserCompletedSurvey(userId, surveyId);
        if (userCompletedSurvey) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        const datas = data.map((item) => {
            return {
                surveyid: surveyId,
                instanceid: instanceId,
                userid: userId,
                surveyitemid: item.surveyItemId,
                ...item,
            };
        });
        const results = await this.SurveyRepo.addSurveyResponse(datas);
        if (!results) {
            throw new common_1.NotFoundException({
                message: 'Not Found',
            });
        }
        return {
            status: 'success',
            message: 'Post survey answer retrieved successfully',
            data: data,
        };
    }
};
exports.SurveyModuleService = SurveyModuleService;
exports.SurveyModuleService = SurveyModuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [survey_module_repository_1.SurveyModuleRepository,
        module_activation_service_1.ModuleActivationService,
        groups_service_1.GroupsService])
], SurveyModuleService);
//# sourceMappingURL=survey-module.service.js.map