"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleActivationModule = void 0;
const common_1 = require("@nestjs/common");
const module_activation_service_1 = require("./module-activation.service");
const module_activation_controller_1 = require("./module-activation.controller");
const prisma_service_1 = require("../prisma.service");
let ModuleActivationModule = class ModuleActivationModule {
};
exports.ModuleActivationModule = ModuleActivationModule;
exports.ModuleActivationModule = ModuleActivationModule = __decorate([
    (0, common_1.Module)({
        controllers: [module_activation_controller_1.ModuleActivationController],
        providers: [module_activation_service_1.ModuleActivationService, prisma_service_1.PrismaService],
    })
], ModuleActivationModule);
//# sourceMappingURL=module-activation.module.js.map