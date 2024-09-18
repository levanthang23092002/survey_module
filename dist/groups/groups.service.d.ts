import { PrismaService } from '../prisma.service';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserGroup(userId: number, instanceId: number): Promise<{
        groupid: number;
    }>;
    isGroupActivated(userGroupId: number, instanceId: number): Promise<boolean>;
    isGroupInSurvey(surveyId: number, groupId: number, instanceId: number): Promise<boolean>;
    createGroup(userId: number, instanceId: number): Promise<any>;
}
