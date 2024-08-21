import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SurveyModuleRepository } from './repository/survey_module.repository';
import {
  CreateSurveyResponse,
  DetailSurvey,
  InputSurvey,
  ListSurvey,
} from './dto/survey.dto';
import { SurveyResponseEntity } from './entities/survey_response';

@Injectable()
export class SurveyModuleService {
  constructor(private SurveyRepo: SurveyModuleRepository) {}

  async getDetailSurvey(
    userId: number,
    instanceId: number,
    surveyId: number,
    moduleId: number,
  ): Promise<DetailSurvey> {
    try {
      const isActivated = await this.SurveyRepo.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );

      if (!isActivated) {
        throw new NotFoundException({
          message: 'Survey module is not activated',
        });
      }
      const userGroup = await this.SurveyRepo.getUserGroup(userId, instanceId);
      if (!userGroup) {
        throw new NotFoundException({
          message: 'No friends found in this event',
        });
      }
      const isGroupActivated = await this.SurveyRepo.isGroupActivated(
        userGroup.groupid,
        instanceId,
      );
      if (!isGroupActivated) {
        throw new NotFoundException({
          message: 'No friends found in this event  ',
        });
      }
      const isGroupInSurvey = await this.SurveyRepo.isGroupInSurvey(
        surveyId,
        userGroup.groupid,
        instanceId,
      );
      if (!isGroupInSurvey) {
        throw new NotFoundException({
          message: 'No friends found in this event  ',
        });
      }

      const surveyDetail = await this.SurveyRepo.findSurveyItems(
        surveyId,
        instanceId,
      );
      const result: DetailSurvey = {
        data: surveyDetail,
        total: surveyDetail.length,
      };
      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }

  async getSurveys(
    userId: number,
    instanceId: number,
    data: InputSurvey,
    moduleId: number,
  ): Promise<ListSurvey> {
    try {
      const page = Number(data.page) || 1;
      const perPage = Number(data.itemPerPage) || 12;
      const skip = page > 1 ? (page - 1) * perPage : 0;

      const isActivated = await this.SurveyRepo.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );

      if (!isActivated) {
        throw new HttpException(
          { message: 'Survey module is not activated' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const userGroup = await this.SurveyRepo.getUserGroup(userId, instanceId);
      if (!userGroup) {
        throw new HttpException(
          { message: 'You Do Not Have Permission In This Event ' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isGroupActivated = await this.SurveyRepo.isGroupActivated(
        userGroup.groupid,
        instanceId,
      );

      if (!isGroupActivated) {
        throw new UnauthorizedException({
          message: 'You Do Not Have Permission In This Event ',
        });
      }

      const listSurvey = await this.SurveyRepo.findListSurvey(
        instanceId,
        userGroup.groupid,
        perPage,
        skip,
      );
      const total = await this.SurveyRepo.counttotalListSurvey(
        instanceId,
        userGroup.groupid,
      );

      const result: ListSurvey = {
        total: total,
        itemPerPage: perPage,
        page: page,
        listSurvey: listSurvey,
      };

      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }

  async getSurveyResponse(
    userId: number,
    instanceId: number,
    moduleId: number,
    surveyId: number,
  ): Promise<SurveyResponseEntity[]> {
    try {
      const isActivated = await this.SurveyRepo.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );
      if (!isActivated) {
        throw new NotFoundException({
          message: 'Survey module is not activated',
        });
      }

      const userGroup = await this.SurveyRepo.getUserGroup(userId, instanceId);
      if (!userGroup) {
        throw new NotFoundException({
          message: 'No friends found in this event',
        });
      }

      const isGroupActivated = await this.SurveyRepo.isGroupActivated(
        userGroup.groupid,
        instanceId,
      );
      if (!isGroupActivated) {
        throw new NotFoundException({
          message: 'No friends found in this event  ',
        });
      }

      const isGroupInSurvey = await this.SurveyRepo.isGroupInSurvey(
        surveyId,
        userGroup.groupid,
        instanceId,
      );
      if (!isGroupInSurvey) {
        throw new NotFoundException({
          message: 'No friends found in this event ',
        });
      }

      const results = await this.SurveyRepo.getUserSurveyResponses(
        instanceId,
        surveyId,
        userId,
      );
      if (!results || results.length == 0) {
        throw new NotFoundException({
          message: 'Your survey was not found for this event. ',
        });
      }
      return results;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }

  async addSurveyResponse(
    userId: number,
    instanceId: number,
    moduleId: number,
    surveyId: number,
    body: CreateSurveyResponse,
  ): Promise<any> {
    const data = body.data;

    const isActivated = await this.SurveyRepo.isSurveyModuleActivated(
      moduleId,
      instanceId,
    );
    if (!isActivated) {
      throw new NotFoundException({
        message: 'Survey module is not activated',
      });
    }

    const userGroup = await this.SurveyRepo.getUserGroup(userId, instanceId);
    if (!userGroup) {
      throw new NotFoundException({
        message: 'No friends found in this event',
      });
    }

    const isGroupActivated = await this.SurveyRepo.isGroupActivated(
      userGroup.groupid,
      instanceId,
    );
    if (!isGroupActivated) {
      throw new NotFoundException({
        message: 'No friends found in this event  ',
      });
    }

    const isGroupInSurvey = await this.SurveyRepo.isGroupInSurvey(
      surveyId,
      userGroup.groupid,
      instanceId,
    );
    if (!isGroupInSurvey) {
      throw new NotFoundException({
        message: 'No friends found in this event ',
      });
    }

    const listSurvayItemId = data.map((item) => item.surveyitemid);

    const checkListAnswer = await this.SurveyRepo.checkDataResponse(
      surveyId,
      listSurvayItemId,
    );
    if (!checkListAnswer) {
      throw new NotFoundException({
        message: 'Some questions in the survey were not found.',
      });
    }

    const userCompletedSurvey = await this.SurveyRepo.hasUserCompletedSurvey(
      userId,
      surveyId,
    );
    if (userCompletedSurvey) {
      throw new NotFoundException({
        message: 'You have already taken this survey.',
      });
    }
    const datas = data.map((item) => {
      return {
        surveyid: surveyId,
        instanceid: instanceId,
        userid: userId,
        ...item,
      };
    });
    const results = await this.SurveyRepo.addSurveyResponse(datas);
    if (!results) {
      throw new NotFoundException({
        message: 'You have failed to add survey.',
      });
    }
    return {
      success: true,
      message: 'You have completed the survey.',
    };
  }
}
