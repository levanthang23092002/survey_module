"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModuleModule = void 0;
const common_1 = require("@nestjs/common");
const survey_module_controller_1 = require("./survey-module.controller");
const survey_module_service_1 = require("./survey-module.service");
const prisma_service_1 = require("../prisma.service");
const survey_module_repository_1 = require("./repository/survey-module.repository");
const module_activation_module_1 = require("../module-activation/module-activation.module");
const module_activation_service_1 = require("../module-activation/module-activation.service");
const groups_module_1 = require("../groups/groups.module");
const groups_service_1 = require("../groups/groups.service");
const auth_middleware_1 = require("../middleware/auth.middleware");
const group_reponsitory_1 = require("../groups/reponsitory/group.reponsitory");
let SurveyModuleModule = class SurveyModuleModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(survey_module_controller_1.SurveyModuleController);
    }
};
exports.SurveyModuleModule = SurveyModuleModule;
exports.SurveyModuleModule = SurveyModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [module_activation_module_1.ModuleActivationModule, groups_module_1.GroupsModule],
        controllers: [survey_module_controller_1.SurveyModuleController],
        providers: [
            survey_module_service_1.SurveyModuleService,
            prisma_service_1.PrismaService,
            survey_module_repository_1.SurveyModuleRepository,
            module_activation_service_1.ModuleActivationService,
            groups_service_1.GroupsService,
            group_reponsitory_1.GroupRepository,
        ],
    })
], SurveyModuleModule);
//# sourceMappingURL=survey-module.module.js.map