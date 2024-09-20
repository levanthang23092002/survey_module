import { GroupsService } from './groups.service';
import { UserGroup } from '@prisma/client';
import { inputCreateGroup, inputDeleteGroup } from './dto/create-group.dto';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    createGoupdto(req: any, instanceId: inputCreateGroup): Promise<UserGroup>;
    deleteGroupd(req: any, input: inputDeleteGroup): Promise<UserGroup>;
    viewGroup(req: any, input: inputCreateGroup): Promise<UserGroup[]>;
}
