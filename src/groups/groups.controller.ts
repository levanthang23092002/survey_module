import { Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserGroup } from '@prisma/client';
import { inputCreateGroup, inputDeleteGroup } from './dto/create-group.dto';

@Controller('groups')
@ApiTags('Group manage')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post(':instanceId/update')
  createGoupdto(
    @Request() req,
    @Param() instanceId: inputCreateGroup,
  ): Promise<UserGroup> {
    const userId = req.user?.userId;

    return this.groupsService.createGroup(
      userId,
      Number(instanceId.instanceId),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':instanceId/:groupId')
  deleteGroupd(
    @Request() req,
    @Param() input: inputDeleteGroup,
  ): Promise<UserGroup> {
    const userId = req.user?.userId;

    return this.groupsService.deleteGroup(
      userId,
      Number(input.instanceId),
      Number(input.groupId),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':instanceId/view')
  viewGroup(
    @Request() req,
    @Param() input: inputCreateGroup,
  ): Promise<UserGroup[]> {
    const userId = req.user?.userId;

    return this.groupsService.viewGroup(userId, Number(input.instanceId));
  }
}
