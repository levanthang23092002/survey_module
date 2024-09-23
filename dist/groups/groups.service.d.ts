import { PrismaService } from '../prisma.service';
import { ObjectGroup, UserGroup } from '@prisma/client';
import { GroupRepository } from './reponsitory/group.reponsitory';
import { DataAddUser, InputDeleteDto, InputDto } from './dto/user-group.dto';
import { DataUpdateGroup } from './dto/obiects-group.dto';
export declare class GroupsService {
    private prisma;
    private groupRepo;
    constructor(prisma: PrismaService, groupRepo: GroupRepository);
    getUserGroup(userId: number, instanceId: number): Promise<{
        groupid: number;
    }>;
    isGroupActivated(groupId: number, instanceId: number): Promise<boolean>;
    isGroupInSurvey(surveyId: number, groupId: number, instanceId: number): Promise<boolean>;
    createGroup(userId: number, instanceId: number, type: string): Promise<ObjectGroup>;
    deleteGroup(userId: number, instanceId: number, groupId: number): Promise<any>;
    viewGroup(userId: number, instanceId: number): Promise<ObjectGroup[]>;
    undeleteGroup(userId: number, instanceId: number, groupId: number): Promise<any>;
    updateGroup(userId: number, instanceId: number, groupId: number, data: DataUpdateGroup): Promise<any>;
    addUserIntoGroup(userId: number, input: InputDto, data: DataAddUser): Promise<UserGroup>;
    deleteUserInGroup(userId: number, input: InputDeleteDto): Promise<boolean>;
    undeleteUserInGroup(userId: number, input: InputDeleteDto): Promise<boolean>;
    viewAllUserInGroup(userId: number, input: InputDto): Promise<any>;
    viewDeleteUserInGroup(userId: number, input: InputDto): Promise<any>;
}
