import { GroupsService } from './groups.service';
import { ObjectGroup, UserGroup } from '@prisma/client';
import { ContentCreateGroup, DataUpdateGroup, inputCreateGroup, inputDeleteGroup } from './dto/obiects-group.dto';
import { DataAddUser, InputDeleteDto, InputDto } from './dto/user-group.dto';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    createGoupdto(req: any, instanceId: inputCreateGroup, type: ContentCreateGroup): Promise<ObjectGroup>;
    deleteGroupd(req: any, input: inputDeleteGroup): Promise<UserGroup>;
    undeleteGroupd(req: any, input: inputDeleteGroup): Promise<UserGroup>;
    updateGroupd(req: any, input: inputDeleteGroup, data: DataUpdateGroup): Promise<UserGroup>;
    viewGroup(req: any, input: inputCreateGroup): Promise<ObjectGroup[]>;
    addUserIntoGroup(req: any, input: InputDto, data: DataAddUser): Promise<any>;
    deleteUserinGroup(req: any, input: InputDeleteDto): Promise<any>;
    undeleteUserinGroup(req: any, input: InputDeleteDto): Promise<any>;
    viewAllUserinGroup(req: any, input: InputDto): Promise<any>;
    viewAllUserDeleteInGroup(req: any, input: InputDto): Promise<any>;
}
