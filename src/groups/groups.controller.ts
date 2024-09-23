import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ObjectGroup, UserGroup } from '@prisma/client';
import {
  ContentCreateGroup,
  DataUpdateGroup,
  inputCreateGroup,
  inputDeleteGroup,
} from './dto/obiects-group.dto';
import { DataAddUser, InputDeleteDto, InputDto } from './dto/user-group.dto';

@Controller('event')
@ApiTags('Group manage')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiBearerAuth('JWT-auth')
  @Post(':instanceId/group/add')
  createGoupdto(
    @Request() req,
    @Param() instanceId: inputCreateGroup,
    @Body() type: ContentCreateGroup,
  ): Promise<ObjectGroup> {
    const userId = req.user?.userId;

    return this.groupsService.createGroup(
      userId,
      Number(instanceId.instanceId),
      type.type,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':instanceId/group/:groupId/detele')
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
  @Put(':instanceId/group/:groupId/undetele')
  undeleteGroupd(
    @Request() req,
    @Param() input: inputDeleteGroup,
  ): Promise<UserGroup> {
    const userId = req.user?.userId;

    return this.groupsService.undeleteGroup(
      userId,
      Number(input.instanceId),
      Number(input.groupId),
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':instanceId/group/:groupId/update')
  updateGroupd(
    @Request() req,
    @Param() input: inputDeleteGroup,
    @Body() data: DataUpdateGroup,
  ): Promise<UserGroup> {
    const userId = req.user?.userId;

    return this.groupsService.updateGroup(
      userId,
      Number(input.instanceId),
      Number(input.groupId),
      data,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':instanceId/group/view')
  viewGroup(
    @Request() req,
    @Param() input: inputCreateGroup,
  ): Promise<ObjectGroup[]> {
    const userId = req.user?.userId;

    return this.groupsService.viewGroup(userId, Number(input.instanceId));
  }

  @ApiBearerAuth('JWT-auth')
  @Post(':eventId/group/:groupId/add-user')
  async addUserIntoGroup(
    @Request() req,
    @Param() input: InputDto,
    @Body() data: DataAddUser,
  ): Promise<any> {
    const userId = req.user?.userId;
    return {
      message: 'add user into group',
      success: true,
      data: await this.groupsService.addUserIntoGroup(userId, input, data),
    };
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':eventId/group/:groupId/user/:userId/delete')
  async deleteUserinGroup(
    @Request() req,
    @Param() input: InputDeleteDto,
  ): Promise<any> {
    const userId = req.user?.userId;
    return {
      message: 'delete user in group',
      success: await this.groupsService.deleteUserInGroup(userId, input),
    };
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':eventId/group/:groupId/user/:userId/undelete')
  async undeleteUserinGroup(
    @Request() req,
    @Param() input: InputDeleteDto,
  ): Promise<any> {
    const userId = req.user?.userId;
    return {
      message: 'undelete user in group',
      success: await this.groupsService.undeleteUserInGroup(userId, input),
    };
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':eventId/group/:groupId/view-all-user')
  async viewAllUserinGroup(
    @Request() req,
    @Param() input: InputDto,
  ): Promise<any> {
    const userId = req.user?.userId;
    return {
      message: 'view all user in group',
      success: true,
      data: await this.groupsService.viewAllUserInGroup(userId, input),
    };
  }
  @ApiBearerAuth('JWT-auth')
  @Get(':eventId/group/:groupId/view-all-user-deleted')
  async viewAllUserDeleteInGroup(
    @Request() req,
    @Param() input: InputDto,
  ): Promise<any> {
    const userId = req.user?.userId;
    return {
      message: 'view all user was deleted in group',
      success: true,
      data: await this.groupsService.viewDeleteUserInGroup(userId, input),
    };
  }
}
