import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserGroup } from '@prisma/client';
import { GroupRepository } from './reponsitory/group.reponsitory';

@Injectable()
export class GroupsService {
  constructor(
    private prisma: PrismaService,
    private groupRepo: GroupRepository,
  ) {}
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
  async isGroupActivated(userGroupId: number, instanceId: number) {
    const objectGroup = await this.prisma.objectGroup.findFirst({
      where: {
        groupid: userGroupId,
        instanceid: instanceId,
        deleted: false,
      },
    });
    return !!objectGroup; // Trả về true nếu nhóm đã được kích hoạt
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

  async createGroup(userId: number, instanceId: number): Promise<UserGroup> {
    const data = {
      userid: userId,
      instanceid: instanceId,
      deleted: false,
    };
    const checkIntance = await this.groupRepo.checkInstance(userId, instanceId);
    console.log(checkIntance);
    if (checkIntance == false) {
      throw new BadRequestException({
        message: 'You do not have permission to create a group for this event.',
      });
    }
    const userGroup = this.prisma.userGroup.create({
      data: data,
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
    console.log(checkIntance);
    if (checkIntance == false) {
      throw new BadRequestException({
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
    } else {
      return 'you have failed to delete';
    }
  }

  async viewGroup(userId: number, instanceId: number): Promise<UserGroup[]> {
    const group = await this.prisma.userGroup.findMany({
      where: {
        userid: userId,
        instanceid: instanceId,
      },
    });
    return group;
  }
}
