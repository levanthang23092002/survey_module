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
exports.ModuleActivationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const module_activation_service_1 = require("./module-activation.service");
let ModuleActivationController = class ModuleActivationController {
    constructor(moduleActivationService) {
        this.moduleActivationService = moduleActivationService;
    }
};
exports.ModuleActivationController = ModuleActivationController;
exports.ModuleActivationController = ModuleActivationController = __decorate([
    (0, common_1.Controller)('module-activation'),
    __metadata("design:paramtypes", [module_activation_service_1.ModuleActivationService])
], ModuleActivationController);
//# sourceMappingURL=module-activation.controller.js.map