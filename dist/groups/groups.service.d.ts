import { PrismaService } from '../prisma.service';
import { UserGroup } from '@prisma/client';
import { GroupRepository } from './reponsitory/group.reponsitory';
export declare class GroupsService {
    private prisma;
    private groupRepo;
    constructor(prisma: PrismaService, groupRepo: GroupRepository);
    getUserGroup(userId: number, instanceId: number): Promise<{
        groupid: number;
    }>;
    isGroupActivated(userGroupId: number, instanceId: number): Promise<boolean>;
    isGroupInSurvey(surveyId: number, groupId: number, instanceId: number): Promise<boolean>;
    createGroup(userId: number, instanceId: number): Promise<UserGroup>;
    deleteGroup(userId: number, instanceId: number, groupId: number): Promise<any>;
    viewGroup(userId: number, instanceId: number): Promise<UserGroup[]>;
}
