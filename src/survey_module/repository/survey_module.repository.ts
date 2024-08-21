import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyItemEntity } from '../entities/survey_item.entity';
import {
  CreateSurveyResponseEntity,
  SurveyResponseEntity,
} from '../entities/survey_response';

@Injectable()
export class SurveyModuleRepository {
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
  async getUserGroup(userId: number, instanceId: number) {
    const userGroup = await this.prisma.userGroup.findFirst({
      where: {
        userid: userId,
        instanceid: instanceId,
        deleted: false,
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
    });
    return !!survey;
  }
  async findSurveyItems(
    surveyId: number,
    instanceId: number,
  ): Promise<SurveyItemEntity[]> {
    const question = await this.prisma.surveyItem.findMany({
      where: {
        surveyid: surveyId,
        deleted: false,
        instanceid: instanceId,
      },
      select: {
        questionnum: true,
        question: true,
        description: true,
        choice1: true,
        choice2: true,
        choice3: true,
        choice4: true,
      },
    });
    return question.map((item) => ({
      questionNum: item.questionnum,
      question: item.question,
      description: item.description,
      choice1: item.choice1,
      choice2: item.choice2,
      choice3: item.choice3,
      choice4: item.choice4,
    }));
  }

  async findListSurvey(
    instanceId: number,
    userGroup: number,
    perPage: number,
    skip: number,
  ): Promise<SurveyEntity[]> {
    const survey = await this.prisma.survey.findMany({
      take: perPage,
      skip,
      where: {
        instanceid: instanceId,
        groupid: userGroup,
        deleted: false,
        hidden: false,
      },
      orderBy: {
        timestamp_created: 'desc',
      },
      select: {
        surveyName: true,
        surveyDescription: true,
        duration: true,
        type: true,
        day: true,
        points: true,
        timestamp_created: true,
      },
    });

    return survey.map((item) => ({
      surveyName: item.surveyName,
      surveyDescription: item.surveyDescription,
      duration: item.duration,
      type: item.type,
      day: item.day,
      points: item.points,
      timestampCreated: item.timestamp_created,
    }));
  }
  async counttotalListSurvey(
    instanceId: number,
    userGroup: number,
  ): Promise<number> {
    const total = await this.prisma.survey.count({
      where: {
        instanceid: instanceId,
        groupid: userGroup,
        deleted: false,
        hidden: false,
      },
    });
    return total;
  }
  async getUserSurveyResponses(
    instanceid: number,
    surveyId: number,
    userId: number,
  ): Promise<SurveyResponseEntity[]> {
    const responses = await this.prisma.surveyResponse.findMany({
      where: {
        userid: userId,
        surveyid: surveyId,
        instanceid: instanceid,
        delete: false, // Giả sử bạn muốn lọc những câu trả lời chưa bị xóa
      },
      orderBy: {
        surveyItem: {
          questionnum: 'asc', // Sắp xếp theo số câu hỏi theo thứ tự giảm dần
        },
      },
      select: {
        surveyItem: {
          select: {
            questionnum: true,
            question: true,
            description: true,
            image: true,
          },
        },
        answer: true,
      },
    });

    // Map lại kết quả để trả về dưới dạng mảng các đối tượng
    return responses.map((response) => ({
      questionnum: response.surveyItem.questionnum,
      question: response.surveyItem.question,
      description: response.surveyItem.description,
      image: response.surveyItem.image,
      answer: response.answer,
    }));
  }
  async addSurveyResponse(datas: CreateSurveyResponseEntity[]): Promise<any> {
    try {
      const result = await this.prisma.surveyResponse.createMany({
        data: datas.map((data) => ({
          surveyid: data.surveyid,
          instanceid: data.instanceid,
          userid: data.userid,
          surveyitemid: data.surveyitemid,
          answer: data.answer,
          delete: data.delete ?? false,
        })),
        skipDuplicates: true,
      });
      if (result.count > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async checkDataResponse(
    surveyId: number,
    surveyItemId: number[],
  ): Promise<boolean> {
    const surveyItems = await this.prisma.surveyItem.findMany({
      where: {
        surveyid: surveyId,
      },
      select: {
        surveyitemid: true,
      },
    });
    const surveyItemsid = surveyItems.map((item) => item.surveyitemid);
    const check = surveyItemId.every((id) => surveyItemsid.includes(id));

    return check;
  }
  async hasUserCompletedSurvey(
    userId: number,
    surveyId: number,
  ): Promise<boolean> {
    const surveyItems = await this.prisma.surveyResponse.findMany({
      where: {
        surveyid: surveyId,
        userid: userId,
      },
    });
    if (surveyItems.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
