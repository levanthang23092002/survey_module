import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ObjectGroup, UserGroup } from '@prisma/client';
import { GroupRepository } from './reponsitory/group.reponsitory';
import { DataAddUser, InputDeleteDto, InputDto } from './dto/user-group.dto';
import { DataUpdateGroup } from './dto/obiects-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    private prisma: PrismaService,
    private groupRepo: GroupRepository,
  ) {}
  //  Use check UserGroup is activity
  async getUserGroup(userId: number, instanceId: number) {
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
  async isGroupActivated(groupId: number, instanceId: number) {
    const objectGroup = await this.prisma.objectGroup.findFirst({
      where: {
        groupid: groupId,
        instanceid: instanceId,
        deleted: false,
      },
    });
    return !!objectGroup;
  }
  async isGroupInSurvey(surveyId: number, groupId: number, instanceId: number) {
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
  // CRUD with ObjectGroup
  async createGroup(
    userId: number,
    instanceId: number,
    type: string,
  ): Promise<ObjectGroup> {
    const data = {
      type: type,
      userid: userId,
      instanceid: instanceId,
      deleted: false,
    };

    const checkInstance = await this.groupRepo.checkInstance(
      userId,
      instanceId,
    );

    if (!checkInstance) {
      throw new BadRequestException({
        message: 'You do not have permission to create a group for this event.',
      });
    }

    // Sử dụng await để chờ kết quả
    const userGroup = await this.prisma.objectGroup.create({
      data: { ...data },
    });

    return userGroup;
  }

  async deleteGroup(
    userId: number,
    instanceId: number,
    groupId: number,
  ): Promise<any> {
    const data = {
      deleted: true,
    };
    const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
    if (checkIntance == false) {
      throw new BadRequestException({
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
    } else {
      return 'you have failed to delete';
    }
  }

  async viewGroup(userId: number, instanceId: number): Promise<ObjectGroup[]> {
    const group = await this.prisma.objectGroup.findMany({
      where: {
        userid: userId,
        instanceid: instanceId,
      },
    });
    return group;
  }

  async undeleteGroup(
    userId: number,
    instanceId: number,
    groupId: number,
  ): Promise<any> {
    const data = {
      deleted: false,
    };
    const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
    if (checkIntance == false) {
      throw new BadRequestException({
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
    } else {
      return 'you have failed to undelete';
    }
  }

  async updateGroup(
    userId: number,
    instanceId: number,
    groupId: number,
    data: DataUpdateGroup,
  ): Promise<any> {
    const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
    if (checkIntance == false) {
      throw new BadRequestException({
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
    } else {
      return 'you have failed to update';
    }
  }
  // CRUD with ObjectGroup add user into group, delete, undetele, view all user in 1 group.

  async addUserIntoGroup(
    userId: number,
    input: InputDto,
    data: DataAddUser,
  ): Promise<UserGroup> {
    const checkGroup = await this.groupRepo.isAdminGroup(
      userId,
      Number(input.groupId),
      Number(input.eventId),
    );
    if (!checkGroup) {
      throw new BadRequestException({
        message: 'You do not have permission with Group',
      });
    }
    const userGroup = await this.groupRepo.checkUserGroupExists(
      Number(data.userId),
      Number(input.eventId),
    );
    if (userGroup) {
      throw new NotFoundException({
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

  async deleteUserInGroup(
    userId: number,
    input: InputDeleteDto,
  ): Promise<boolean> {
    const now = new Date();
    const checkGroup = await this.groupRepo.isAdminGroup(
      userId,
      Number(input.groupId),
      Number(input.eventId),
    );

    if (!checkGroup) {
      throw new BadRequestException({
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
    if (deleteUser.count == 1) return true;
    else return false;
  }

  async undeleteUserInGroup(
    userId: number,
    input: InputDeleteDto,
  ): Promise<boolean> {
    const now = new Date();
    const checkGroup = await this.groupRepo.isAdminGroup(
      userId,
      Number(input.groupId),
      Number(input.eventId),
    );
    if (!checkGroup) {
      throw new BadRequestException({
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
    if (deleteUser.count == 1) return true;
    else return false;
  }

  async viewAllUserInGroup(userId: number, input: InputDto): Promise<any> {
    const checkGroup = await this.groupRepo.isAdminGroup(
      userId,
      Number(input.groupId),
      Number(input.eventId),
    );
    if (!checkGroup) {
      throw new BadRequestException({
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

  async viewDeleteUserInGroup(userId: number, input: InputDto): Promise<any> {
    const checkGroup = await this.groupRepo.isAdminGroup(
      userId,
      Number(input.groupId),
      Number(input.eventId),
    );
    if (!checkGroup) {
      throw new BadRequestException({
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
}
