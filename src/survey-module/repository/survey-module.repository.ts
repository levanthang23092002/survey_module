import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyItemEntity } from '../entities/survey-item.entity';
import { Group } from '../../groups/entities/group.entity';
import {
  CreateSurveyResponseEntity,
  SurveyResponseEntity,
} from '../entities/survey-response';

@Injectable()
export class SurveyModuleRepository {
  constructor(private prisma: PrismaService) {}

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
        image: true,
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
      image: item.image,
      choice1: item.choice1,
      choice2: item.choice2,
      choice3: item.choice3,
      choice4: item.choice4,
    }));
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
        delete: false,
      },
      orderBy: {
        surveyItem: {
          questionnum: 'asc',
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

    return responses.map((response) => ({
      questionnum: response.surveyItem.questionnum,
      question: response.surveyItem.question,
      description: response.surveyItem.description,
      image: response.surveyItem.image,
      answer: response.answer,
    }));
  }
  async getUserSurveyResponsesByAdmin(
    instanceid: number,
    surveyId: number,
  ): Promise<any> {
    const responses = await this.prisma.surveyResponse.findMany({
      where: {
        surveyid: surveyId,
        instanceid: instanceid,
        delete: false,
      },
      orderBy: {
        surveyItem: {
          questionnum: 'asc',
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
        userid: true,
      },
    });

    // Nhóm các câu trả lời theo userId
    const groupedResponses = responses.reduce((acc, response) => {
      const { userid, surveyItem, answer } = response;

      if (!acc[userid]) {
        acc[userid] = {
          userId: userid,
          responses: [],
        };
      }

      acc[userid].responses.push({
        questionnum: surveyItem.questionnum,
        question: surveyItem.question,
        description: surveyItem.description,
        image: surveyItem.image,
        answer: answer,
      });

      return acc;
    }, {});

    // Chuyển đổi thành mảng để trả về
    return Object.values(groupedResponses);
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
  async checkAdmin(userId: number, instanceId: number): Promise<boolean> {
    const check = await this.prisma.instance.count({
      where: {
        adminid: userId,
        instanceid: instanceId,
      },
    });
    if (check > 0) {
      return true;
    } else {
      return false;
    }
  }
  async findListSurveyByAdmin(
    instanceId: number,
    perPage: number,
    skip: number,
  ): Promise<SurveyEntity[]> {
    const survey = await this.prisma.survey.findMany({
      take: perPage,
      skip,
      where: {
        instanceid: instanceId,
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
  async counttotalListSurveyByAmin(instanceId: number): Promise<number> {
    const total = await this.prisma.survey.count({
      where: {
        instanceid: instanceId,
        deleted: false,
        hidden: false,
      },
    });
    return total;
  }
}
