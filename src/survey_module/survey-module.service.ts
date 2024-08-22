import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SurveyModuleRepository } from './repository/survey-module.repository';
import {
  CreateSurveyResponse,
  DetailSurvey,
  SurveyRouteParamsDto,
  InputSurvey,
  ListSurvey,
  BasicRouteParamsDto,
} from './dto/survey.dto';
import { SurveyResponseEntity } from './entities/survey-response';
import { ModuleActivationService } from 'src/module-activation/module-activation.service';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class SurveyModuleService {
  constructor(
    private SurveyRepo: SurveyModuleRepository,
    private moduleActivationService: ModuleActivationService,
    private groupService: GroupsService,
  ) {}

  async getDetailSurvey(
    userId: number,
    params: SurveyRouteParamsDto,
  ): Promise<DetailSurvey> {
    const instanceId = Number(params.eventId);
    const moduleId = Number(params.moduleId);
    const surveyId = Number(params.surveyId);

    const isActivated =
      await this.moduleActivationService.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );

    if (!isActivated) {
      throw new NotFoundException({
        message: 'Survey module is not activated',
      });
    }
    const userGroup = await this.groupService.getUserGroup(userId, instanceId);
    if (!userGroup) {
      throw new NotFoundException({
        message: 'No friends found in this event',
      });
    }
    const isGroupActivated = await this.groupService.isGroupActivated(
      userGroup.groupid,
      instanceId,
    );
    if (!isGroupActivated) {
      throw new NotFoundException({
        message: 'No friends found in this event  ',
      });
    }
    const isGroupInSurvey = await this.groupService.isGroupInSurvey(
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
  }

  async getSurveys(
    userId: number,
    params: BasicRouteParamsDto,
    data: InputSurvey,
  ): Promise<ListSurvey> {
    const page = Number(data.page) || 1;
    const perPage = Number(data.itemPerPage) || 12;
    const skip = page > 1 ? (page - 1) * perPage : 0;
    const instanceId = Number(params.eventId);
    const moduleId = Number(params.moduleId);

    const isActivated =
      await this.moduleActivationService.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );

    if (!isActivated) {
      throw new HttpException(
        { message: 'Survey module is not activated' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userGroup = await this.groupService.getUserGroup(userId, instanceId);
    if (!userGroup) {
      throw new HttpException(
        { message: 'You Do Not Have Permission In This Event ' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isGroupActivated = await this.groupService.isGroupActivated(
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
  }

  async getSurveyResponse(
    userId: number,
    params: SurveyRouteParamsDto,
  ): Promise<SurveyResponseEntity[]> {
    const instanceId = Number(params.eventId);
    const moduleId = Number(params.moduleId);
    const surveyId = Number(params.surveyId);
    const isActivated =
      await this.moduleActivationService.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );
    if (!isActivated) {
      throw new NotFoundException({
        message: 'Survey module is not activated',
      });
    }

    const userGroup = await this.groupService.getUserGroup(userId, instanceId);
    if (!userGroup) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }

    const isGroupActivated = await this.groupService.isGroupActivated(
      userGroup.groupid,
      instanceId,
    );
    if (!isGroupActivated) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }

    const isGroupInSurvey = await this.groupService.isGroupInSurvey(
      surveyId,
      userGroup.groupid,
      instanceId,
    );
    if (!isGroupInSurvey) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }

    const results = await this.SurveyRepo.getUserSurveyResponses(
      instanceId,
      surveyId,
      userId,
    );
    if (!results || results.length == 0) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }
    return results;
  }

  async addSurveyResponse(
    userId: number,
    params: SurveyRouteParamsDto,
    body: CreateSurveyResponse,
  ): Promise<any> {
    const instanceId = Number(params.eventId);
    const moduleId = Number(params.moduleId);
    const surveyId = Number(params.surveyId);
    const data = body.data;
    const isActivated =
      await this.moduleActivationService.isSurveyModuleActivated(
        moduleId,
        instanceId,
      );
    if (!isActivated) {
      throw new NotFoundException({
        message: 'Survey module is not activated',
      });
    }

    const userGroup = await this.groupService.getUserGroup(userId, instanceId);
    if (!userGroup) {
      throw new NotFoundException({
        message: 'No friends found in this event',
      });
    }

    const isGroupActivated = await this.groupService.isGroupActivated(
      userGroup.groupid,
      instanceId,
    );
    if (!isGroupActivated) {
      throw new NotFoundException({
        message: 'No friends found in this event  ',
      });
    }

    const isGroupInSurvey = await this.groupService.isGroupInSurvey(
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
