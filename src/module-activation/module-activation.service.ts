import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModuleActivationService {
  constructor(private prisma: PrismaService) {}

  async isSurveyModuleActivated(moduleId: number, instanceId: number) {
    const module = await this.prisma.module.findFirst({
      where: {
        id: moduleId,
        instanceid: instanceId,
        deleted: false,
        activated: true,
      },
    });
    return !!module;
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
    });
    return !!survey;
  }
}
