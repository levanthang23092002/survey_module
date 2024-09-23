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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const group_reponsitory_1 = require("./reponsitory/group.reponsitory");
let GroupsService = class GroupsService {
    constructor(prisma, groupRepo) {
        this.prisma = prisma;
        this.groupRepo = groupRepo;
    }
    async getUserGroup(userId, instanceId) {
        const userGroup = await this.prisma.userGroup.findFirst({
            where: {
                userid: userId,
                instanceid: instanceId,
                deleted: false,
            },
            select: {
                groupid: true,
            },
        });
        return userGroup;
    }
    async isGroupActivated(groupId, instanceId) {
        const objectGroup = await this.prisma.objectGroup.findFirst({
            where: {
                groupid: groupId,
                instanceid: instanceId,
                deleted: false,
            },
        });
        return !!objectGroup;
    }
    async isGroupInSurvey(surveyId, groupId, instanceId) {
        const survey = await this.prisma.survey.findFirst({
            where: {
                surveyid: surveyId,
                instanceid: instanceId,
                groupid: groupId,
                deleted: false,
                hidden: false,
            },
            select: {
                groupid: true,
            },
        });
        return !!survey;
    }
    async createGroup(userId, instanceId, type) {
        const data = {
            type: type,
            userid: userId,
            instanceid: instanceId,
            deleted: false,
        };
        const checkInstance = await this.groupRepo.checkInstance(userId, instanceId);
        if (!checkInstance) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission to create a group for this event.',
            });
        }
        const userGroup = await this.prisma.objectGroup.create({
            data: { ...data },
        });
        return userGroup;
    }
    async deleteGroup(userId, instanceId, groupId) {
        const data = {
            deleted: true,
        };
        const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
        if (checkIntance == false) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission to create a group for this event.',
            });
        }
        const userGroup = await this.prisma.objectGroup.updateMany({
            where: {
                instanceid: instanceId,
                userid: userId,
                groupid: groupId,
            },
            data: data,
        });
        if (userGroup.count === 1) {
            return 'you have deleted successfully';
        }
        else {
            return 'you have failed to delete';
        }
    }
    async viewGroup(userId, instanceId) {
        const group = await this.prisma.objectGroup.findMany({
            where: {
                userid: userId,
                instanceid: instanceId,
            },
        });
        return group;
    }
    async undeleteGroup(userId, instanceId, groupId) {
        const data = {
            deleted: false,
        };
        const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
        if (checkIntance == false) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission to create a group for this event.',
            });
        }
        const userGroup = await this.prisma.objectGroup.updateMany({
            where: {
                instanceid: instanceId,
                userid: userId,
                groupid: groupId,
            },
            data: data,
        });
        if (userGroup.count === 1) {
            return 'you have undeleted successfully';
        }
        else {
            return 'you have failed to undelete';
        }
    }
    async updateGroup(userId, instanceId, groupId, data) {
        const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
        if (checkIntance == false) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission to create a group for this event.',
            });
        }
        const group = await this.prisma.objectGroup.updateMany({
            where: {
                instanceid: instanceId,
                userid: userId,
                groupid: groupId,
            },
            data: data,
        });
        if (group.count === 1) {
            return 'you have update successfully';
        }
        else {
            return 'you have failed to update';
        }
    }
    async addUserIntoGroup(userId, input, data) {
        const checkGroup = await this.groupRepo.isAdminGroup(userId, Number(input.groupId), Number(input.eventId));
        if (!checkGroup) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission with Group',
            });
        }
        const userGroup = await this.groupRepo.checkUserGroupExists(Number(data.userId), Number(input.eventId));
        if (userGroup) {
            throw new common_1.NotFoundException({
                message: 'User aleady exists in group',
            });
        }
        const newData = {
            userid: Number(data.userId),
            instanceid: Number(input.eventId),
            groupid: Number(input.groupId),
        };
        const addUserGroup = await this.prisma.userGroup.create({
            data: newData,
        });
        return addUserGroup;
    }
    async deleteUserInGroup(userId, input) {
        const now = new Date();
        const checkGroup = await this.groupRepo.isAdminGroup(userId, Number(input.groupId), Number(input.eventId));
        if (!checkGroup) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission with Group',
            });
        }
        const deleteUser = await this.prisma.userGroup.updateMany({
            where: {
                groupid: Number(input.groupId),
                instanceid: Number(input.eventId),
                userid: Number(input.userId),
            },
            data: {
                deleted: true,
                timestamp_deleted: now,
            },
        });
        if (deleteUser.count == 1)
            return true;
        else
            return false;
    }
    async undeleteUserInGroup(userId, input) {
        const now = new Date();
        const checkGroup = await this.groupRepo.isAdminGroup(userId, Number(input.groupId), Number(input.eventId));
        if (!checkGroup) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission with Group',
            });
        }
        const deleteUser = await this.prisma.userGroup.updateMany({
            where: {
                groupid: Number(input.groupId),
                instanceid: Number(input.eventId),
                userid: Number(input.userId),
                timestamp_updated: now,
                timestamp_deleted: null,
            },
            data: {
                deleted: false,
            },
        });
        if (deleteUser.count == 1)
            return true;
        else
            return false;
    }
    async viewAllUserInGroup(userId, input) {
        const checkGroup = await this.groupRepo.isAdminGroup(userId, Number(input.groupId), Number(input.eventId));
        if (!checkGroup) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission with Group',
            });
        }
        const userGroup = this.prisma.userGroup.findMany({
            where: {
                groupid: Number(input.groupId),
                instanceid: Number(input.eventId),
                deleted: false,
            },
            select: {
                user: {
                    select: {
                        userid: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return userGroup;
    }
    async viewDeleteUserInGroup(userId, input) {
        const checkGroup = await this.groupRepo.isAdminGroup(userId, Number(input.groupId), Number(input.eventId));
        if (!checkGroup) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission with Group',
            });
        }
        const userGroup = this.prisma.userGroup.findMany({
            where: {
                groupid: Number(input.groupId),
                instanceid: Number(input.eventId),
                deleted: true,
            },
            select: {
                user: {
                    select: {
                        userid: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return userGroup;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        group_reponsitory_1.GroupRepository])
], GroupsService);
//# sourceMappingURL=groups.service.js.map