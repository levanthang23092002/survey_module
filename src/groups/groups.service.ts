import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}
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
}
