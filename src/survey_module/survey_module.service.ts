import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  DetailSurvey,
  InputSurvey,
  ListSurvey,
  UserdDetailSurvey,
} from './dto/survey.dto';

@Injectable()
export class SurveyModuleService {
  constructor(private prismaservice: PrismaService) {}

  async isSurveyModuleActivated(moduleId: number, instanceId: number) {
    const module = await this.prismaservice.module.findFirst({
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
    const userGroup = await this.prismaservice.userGroup.findFirst({
      where: {
        userid: userId,
        instanceid: instanceId,
        deleted: false,
      },
    });
    return userGroup;
  }
  async isGroupActivated(userGroupId: number, instanceId: number) {
    const objectGroup = await this.prismaservice.objectGroup.findFirst({
      where: {
        groupid: userGroupId,
        instanceid: instanceId,
        deleted: false,
      },
    });
    return !!objectGroup; // Trả về true nếu nhóm đã được kích hoạt
  }
  async isgroupinsurvey(surveyId: number, groupId: number, instanceId: number) {
    const survey = await this.prismaservice.survey.findFirst({
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

  // eslint-disable-next-line prettier/prettier
  async getdetailsurvey(
    body: UserdDetailSurvey,
    surveyid: number,
    moduleid: number,
  ): Promise<DetailSurvey> {
    const instanceId = Number(body.instanceid);
    const isActivated = await this.isSurveyModuleActivated(
      moduleid,
      instanceId,
    );

    if (!isActivated) {
      throw new HttpException(
        { message: 'Survey module is not activated' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const usergroup = await this.getUserGroup(Number(body.userid), instanceId);
    if (!usergroup) {
      throw new HttpException(
        { message: 'You Do Not Have Permission In This Event ' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isGroupActivated = await this.isGroupActivated(
      usergroup.groupid,
      instanceId,
    );
    if (!isGroupActivated) {
      throw new HttpException(
        { message: 'You Do Not Have Permission In This Event ' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isgroupinsurvey = await this.isgroupinsurvey(
      surveyid,
      usergroup.groupid,
      instanceId,
    );
    if (!isgroupinsurvey) {
      throw new HttpException(
        { message: 'You Do Not Have Permission In This Event ' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const surveydetail = await this.prismaservice.surveyItem.findMany({
      where: {
        surveyid: Number(surveyid),
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

    if (!surveydetail.length) {
      throw new HttpException(
        { message: 'This Survey Not Found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: DetailSurvey = {
      data: surveydetail,
      total: surveydetail.length,
    };
    return result;
  }

  getsurveys = async (
    body: UserdDetailSurvey,
    data: InputSurvey,
    moduleid: number,
  ): Promise<ListSurvey> => {
    const userId = Number(body.userid);
    const instanceId = Number(body.instanceid);
    const page = Number(data.page) || 1;
    const per_page = Number(data.item_per_page) || 12;
    const skip = page > 1 ? (page - 1) * per_page : 0;

    const isActivated = await this.isSurveyModuleActivated(
      moduleid,
      instanceId,
    );

    if (!isActivated) {
      throw new HttpException(
        { message: 'Survey module is not activated' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const usergroup = await this.getUserGroup(userId, instanceId);
    if (!usergroup) {
      throw new HttpException(
        { message: 'You Do Not Have Permission In This Event ' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isGroupActivated = await this.isGroupActivated(
      usergroup.groupid,
      instanceId,
    );
    if (!isGroupActivated) {
      throw new HttpException(
        { message: 'You Do Not Have Permission In This Event ' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const survey = await this.prismaservice.survey.findMany({
      take: per_page,
      skip,
      where: {
        instanceid: instanceId,
        groupid: usergroup.groupid,
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
    const total = await this.prismaservice.survey.count({
      where: {
        instanceid: instanceId,
        groupid: usergroup.groupid,
        deleted: false,
        hidden: false,
      },
    });

    const result: ListSurvey = {
      total: total,
      item_per_page: per_page,
      page: page,
      list_survey: survey,
    };
    return result;
  };
}
