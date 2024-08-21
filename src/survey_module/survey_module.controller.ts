import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SurveyModuleService } from './survey_module.service';
import {
  CreateSurveyResponse,
  DetailSurvey,
  InputSurvey,
  ListSurvey,
} from './dto/survey.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Survey')
export class SurveyModuleController {
  constructor(private surveyService: SurveyModuleService) {}

  @Get(':userId/:instanceId/module/:moduleid/surveys/:surveyid')
  async getSurveyDetail(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('instanceId', ParseIntPipe) instanceId: number,
    @Param('moduleid', ParseIntPipe) moduleId: number, // hoặc dùng kiểu dữ liệu phù hợp với moduleid
    @Param('surveyid', ParseIntPipe) surveyId: number, // hoặc dùng kiểu dữ liệu phù hợp với surveyid
  ): Promise<DetailSurvey> {
    return await this.surveyService.getDetailSurvey(
      userId,
      instanceId,
      surveyId,
      moduleId,
    );
  }
  @Get(':userId/:instanceId/module/:moduleid/surveys')
  async getListSurvey(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('instanceId', ParseIntPipe) instanceId: number,
    @Param('moduleid', ParseIntPipe) moduleId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('itemPerPage', ParseIntPipe) itemPerPage: number,
  ): Promise<ListSurvey> {
    const data: InputSurvey = {
      page,
      itemPerPage,
    };
    return await this.surveyService.getSurveys(
      userId,
      instanceId,
      data,
      moduleId,
    );
  }

  @Get(':userId/:instanceId/module:moduleid/surveys/:surveyid/result')
  async getUserSurveyResponse(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('instanceId', ParseIntPipe) instanceId: number,
    @Param('surveyid', ParseIntPipe) surveyId: number,
    @Param('moduleid', ParseIntPipe) moduleId: number, // hoặc dùng kiểu dữ liệu phù hợp với moduleid
    // hoặc dùng kiểu dữ liệu phù hợp với surveyid
  ): Promise<any> {
    return await this.surveyService.getSurveyResponse(
      userId,
      instanceId,
      moduleId,
      surveyId,
    );
  }

  @Post(':userId/:instanceId/module:moduleid/surveys/:surveyid/submit')
  async addUserSurveyResponse(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('instanceId', ParseIntPipe) instanceId: number,
    @Param('surveyid', ParseIntPipe) surveyId: number,
    @Param('moduleid', ParseIntPipe) moduleId: number,
    @Body() body: CreateSurveyResponse,
  ): Promise<any> {
    return await this.surveyService.addSurveyResponse(
      userId,
      instanceId,
      moduleId,
      surveyId,
      body,
    );
  }
}
