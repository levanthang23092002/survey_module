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
exports.GroupsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const swagger_1 = require("@nestjs/swagger");
const obiects_group_dto_1 = require("./dto/obiects-group.dto");
const user_group_dto_1 = require("./dto/user-group.dto");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    createGoupdto(req, instanceId, type) {
        const userId = req.user?.userId;
        return this.groupsService.createGroup(userId, Number(instanceId.instanceId), type.type);
    }
    deleteGroupd(req, input) {
        const userId = req.user?.userId;
        return this.groupsService.deleteGroup(userId, Number(input.instanceId), Number(input.groupId));
    }
    undeleteGroupd(req, input) {
        const userId = req.user?.userId;
        return this.groupsService.undeleteGroup(userId, Number(input.instanceId), Number(input.groupId));
    }
    updateGroupd(req, input, data) {
        const userId = req.user?.userId;
        return this.groupsService.updateGroup(userId, Number(input.instanceId), Number(input.groupId), data);
    }
    viewGroup(req, input) {
        const userId = req.user?.userId;
        return this.groupsService.viewGroup(userId, Number(input.instanceId));
    }
    async addUserIntoGroup(req, input, data) {
        const userId = req.user?.userId;
        return {
            message: 'add user into group',
            success: true,
            data: await this.groupsService.addUserIntoGroup(userId, input, data),
        };
    }
    async deleteUserinGroup(req, input) {
        const userId = req.user?.userId;
        return {
            message: 'delete user in group',
            success: await this.groupsService.deleteUserInGroup(userId, input),
        };
    }
    async undeleteUserinGroup(req, input) {
        const userId = req.user?.userId;
        return {
            message: 'undelete user in group',
            success: await this.groupsService.undeleteUserInGroup(userId, input),
        };
    }
    async viewAllUserinGroup(req, input) {
        const userId = req.user?.userId;
        return {
            message: 'view all user in group',
            success: true,
            data: await this.groupsService.viewAllUserInGroup(userId, input),
        };
    }
    async viewAllUserDeleteInGroup(req, input) {
        const userId = req.user?.userId;
        return {
            message: 'view all user was deleted in group',
            success: true,
            data: await this.groupsService.viewDeleteUserInGroup(userId, input),
        };
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)(':instanceId/group/add'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, obiects_group_dto_1.inputCreateGroup,
        obiects_group_dto_1.ContentCreateGroup]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "createGoupdto", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Put)(':instanceId/group/:groupId/detele'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, obiects_group_dto_1.inputDeleteGroup]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "deleteGroupd", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Put)(':instanceId/group/:groupId/undetele'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, obiects_group_dto_1.inputDeleteGroup]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "undeleteGroupd", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Put)(':instanceId/group/:groupId/update'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, obiects_group_dto_1.inputDeleteGroup,
        obiects_group_dto_1.DataUpdateGroup]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "updateGroupd", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)(':instanceId/group/view'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, obiects_group_dto_1.inputCreateGroup]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "viewGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)(':eventId/group/:groupId/add-user'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_group_dto_1.InputDto,
        user_group_dto_1.DataAddUser]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "addUserIntoGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Put)(':eventId/group/:groupId/user/:userId/delete'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_group_dto_1.InputDeleteDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "deleteUserinGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Put)(':eventId/group/:groupId/user/:userId/undelete'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_group_dto_1.InputDeleteDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "undeleteUserinGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)(':eventId/group/:groupId/view-all-user'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_group_dto_1.InputDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "viewAllUserinGroup", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)(':eventId/group/:groupId/view-all-user-deleted'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_group_dto_1.InputDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "viewAllUserDeleteInGroup", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('event'),
    (0, swagger_1.ApiTags)('Group manage'),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map