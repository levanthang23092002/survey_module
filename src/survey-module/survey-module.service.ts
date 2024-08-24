import { Injectable, NotFoundException } from '@nestjs/common';
import { SurveyModuleRepository } from './repository/survey-module.repository';
import {
  CreateSurveyResponse,
  DetailSurvey,
  SurveyRouteParamsDto,
  InputSurvey,
  ListSurvey,
  BasicRouteParamsDto,
  SuccessResponseDto,
} from './dto/survey.dto';
import { ModuleActivationService } from '../module-activation/module-activation.service';
import { GroupsService } from '../groups/groups.service';

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
  ): Promise<SuccessResponseDto> {
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
        message: 'Not Found',
      });
    }
    const checkAdmin = await this.SurveyRepo.checkAdmin(userId, instanceId);
    if (checkAdmin) {
      const surveyDetail = await this.SurveyRepo.findSurveyItems(
        surveyId,
        instanceId,
      );
      const result: DetailSurvey = {
        total: surveyDetail.length,
        data: surveyDetail,
      };
      return {
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: result,
      };
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

    const surveyDetail = await this.SurveyRepo.findSurveyItems(
      surveyId,
      instanceId,
    );
    const result: DetailSurvey = {
      total: surveyDetail.length,
      data: surveyDetail,
    };
    return {
      status: 'success',
      message: 'Survey details retrieved successfully',
      data: result,
    };
  }

  async getSurveys(
    userId: number,
    params: BasicRouteParamsDto,
    data: InputSurvey,
  ): Promise<SuccessResponseDto> {
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
      throw new NotFoundException({ message: 'Not Found' });
    }
    const checkAdmin = await this.SurveyRepo.checkAdmin(userId, instanceId);
    if (checkAdmin) {
      const listSurvey = await this.SurveyRepo.findListSurveyByAdmin(
        instanceId,
        perPage,
        skip,
      );
      const total =
        await this.SurveyRepo.counttotalListSurveyByAmin(instanceId);

      const result: ListSurvey = {
        total: total,
        itemPerPage: perPage,
        page: page,
        listSurvey: listSurvey,
      };

      return {
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: result,
      };
    }

    const userGroup = await this.groupService.getUserGroup(userId, instanceId);
    if (!userGroup) {
      throw new NotFoundException({ message: 'Not Found' });
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

    return {
      status: 'success',
      message: 'Survey details retrieved successfully',
      data: result,
    };
  }

  async getSurveyResponse(
    userId: number,
    params: SurveyRouteParamsDto,
  ): Promise<SuccessResponseDto> {
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
        message: 'Not Found',
      });
    }
    const checkAdmin = await this.SurveyRepo.checkAdmin(userId, instanceId);
    if (checkAdmin) {
      const listSurvey = await this.SurveyRepo.getUserSurveyResponsesByAdmin(
        instanceId,
        surveyId,
      );

      const result = {
        total: listSurvey.length,
        listSurvey: listSurvey,
      };
      return {
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: result,
      };
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

    const result = await this.SurveyRepo.getUserSurveyResponses(
      instanceId,
      surveyId,
      userId,
    );
    if (!result || result.length == 0) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }
    const results = {
      total: 1,
      listSurvey: [
        {
          userId: userId,
          responses: result,
        },
      ],
    };
    return {
      status: 'success',
      message: 'Survey details retrieved successfully',
      data: results,
    };
  }

  async addSurveyResponse(
    userId: number,
    params: SurveyRouteParamsDto,
    body: CreateSurveyResponse,
  ): Promise<SuccessResponseDto> {
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
        message: 'Not Found',
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

    const listSurvayItemId = data.map((item) => item.surveyItemId);

    const checkListAnswer = await this.SurveyRepo.checkDataResponse(
      surveyId,
      listSurvayItemId,
    );
    if (!checkListAnswer) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }

    const userCompletedSurvey = await this.SurveyRepo.hasUserCompletedSurvey(
      userId,
      surveyId,
    );
    if (userCompletedSurvey) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }
    const datas = data.map((item) => {
      return {
        surveyid: surveyId,
        instanceid: instanceId,
        userid: userId,
        surveyitemid: item.surveyItemId,
        ...item,
      };
    });
    const results = await this.SurveyRepo.addSurveyResponse(datas);
    if (!results) {
      throw new NotFoundException({
        message: 'Not Found',
      });
    }
    return {
      status: 'success',
      message: 'Survey details retrieved successfully',
      data: data,
    };
  }
}
