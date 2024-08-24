"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SurveyModuleModule = void 0;
var common_1 = require("@nestjs/common");
var survey_module_controller_1 = require("./survey-module.controller");
var survey_module_service_1 = require("./survey-module.service");
var prisma_service_1 = require("src/prisma.service");
var survey_module_repository_1 = require("./repository/survey-module.repository");
var module_activation_module_1 = require("src/module-activation/module-activation.module");
var module_activation_service_1 = require("src/module-activation/module-activation.service");
var groups_module_1 = require("src/groups/groups.module");
var groups_service_1 = require("src/groups/groups.service");
var auth_middleware_1 = require("src/middleware/auth.middleware");
var SurveyModuleModule = /** @class */ (function () {
    function SurveyModuleModule() {
    }
    SurveyModuleModule.prototype.configure = function (consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(survey_module_controller_1.SurveyModuleController);
    };
    SurveyModuleModule = __decorate([
        common_1.Module({
            imports: [module_activation_module_1.ModuleActivationModule, groups_module_1.GroupsModule],
            controllers: [survey_module_controller_1.SurveyModuleController],
            providers: [
                survey_module_service_1.SurveyModuleService,
                prisma_service_1.PrismaService,
                survey_module_repository_1.SurveyModuleRepository,
                module_activation_service_1.ModuleActivationService,
                groups_service_1.GroupsService,
            ]
        })
    ], SurveyModuleModule);
    return SurveyModuleModule;
}());
exports.SurveyModuleModule = SurveyModuleModule;
