import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { SurveyModuleService } from './survey-module.service';

import {
  CreateSurveyResponse,
  DetailSurvey,
  SurveyRouteParamsDto,
  InputSurvey,
  ListSurvey,
  BasicRouteParamsDto,
} from './dto/survey.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SurveyResponseEntity } from './entities/survey-response';

@Controller('')
@ApiTags('Survey')
export class SurveyModuleController {
  constructor(private surveyService: SurveyModuleService) {}

  @ApiBearerAuth('JWT-auth')
  @Get('event/:eventId/module/:moduleId/surveys/:surveyId')
  async getSurveyDetail(
    @Param() params: SurveyRouteParamsDto,
    @Request() req,
  ): Promise<DetailSurvey> {
    const userid = req.user?.userId;
    return await this.surveyService.getDetailSurvey(userid, params);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('event/:eventId/module/:moduleId/surveys')
  async getListSurvey(
    @Param() params: BasicRouteParamsDto,
    @Query() page: InputSurvey,
    @Request() req,
  ): Promise<ListSurvey> {
    const userid = req.user?.userId;
    return await this.surveyService.getSurveys(userid, params, page);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('event/:eventId/module/:moduleId/surveys/:surveyId/result')
  async getUserSurveyResponse(
    @Request() req,
    @Param() params: SurveyRouteParamsDto,
  ): Promise<SurveyResponseEntity[]> {
    const userid = req.user?.userId;
    return await this.surveyService.getSurveyResponse(userid, params);
  }

  @ApiBearerAuth('JWT-auth')
  @Post('event/:eventId/module/:moduleId/surveys/:surveyId/submit')
  async addUserSurveyResponse(
    @Request() req,
    @Param() params: SurveyRouteParamsDto,
    @Body() body: CreateSurveyResponse,
  ): Promise<any> {
    const userid = req.user?.userId;
    return await this.surveyService.addSurveyResponse(userid, params, body);
  }
}
