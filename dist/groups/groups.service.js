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
    async isGroupActivated(userGroupId, instanceId) {
        const objectGroup = await this.prisma.objectGroup.findFirst({
            where: {
                groupid: userGroupId,
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
    async createGroup(userId, instanceId) {
        const data = {
            userid: userId,
            instanceid: instanceId,
            deleted: false,
        };
        const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
        console.log(checkIntance);
        if (checkIntance == false) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission to create a group for this event.',
            });
        }
        const userGroup = this.prisma.userGroup.create({
            data: data,
        });
        return userGroup;
    }
    async deleteGroup(userId, instanceId, groupId) {
        const data = {
            deleted: true,
        };
        const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
        console.log(checkIntance);
        if (checkIntance == false) {
            throw new common_1.BadRequestException({
                message: 'You do not have permission to create a group for this event.',
            });
        }
        const userGroup = await this.prisma.userGroup.updateMany({
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
        const group = await this.prisma.userGroup.findMany({
            where: {
                userid: userId,
                instanceid: instanceId,
            },
        });
        return group;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        group_reponsitory_1.GroupRepository])
], GroupsService);
//# sourceMappingURL=groups.service.js.map