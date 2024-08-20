import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SurveyModuleService } from './survey_module.service';
import {
  DetailSurvey,
  InputSurvey,
  ListSurvey,
  UserdDetailSurvey,
} from './dto/survey.dto';

@Controller('module')
export class SurveyModuleController {
  constructor(private surveyservice: SurveyModuleService) {}

  @Get(':moduleid/surveys/:surveyid')
  async getSurveyDetail(
    @Body() body: UserdDetailSurvey,
    @Param('moduleid', ParseIntPipe) moduleid: number, // hoặc dùng kiểu dữ liệu phù hợp với moduleid
    @Param('surveyid', ParseIntPipe) surveyid: number, // hoặc dùng kiểu dữ liệu phù hợp với surveyid
  ): Promise<DetailSurvey> {
    return await this.surveyservice.getdetailsurvey(body, surveyid, moduleid);
  }
  @Get(':moduleid/surveys')
  async getListSurvey(
    @Body() body: UserdDetailSurvey,
    @Query() data: InputSurvey,
    @Param('moduleid', ParseIntPipe) moduleid: number, // hoặc dùng kiểu dữ liệu phù hợp với moduleid
    // hoặc dùng kiểu dữ liệu phù hợp với surveyid
  ): Promise<ListSurvey> {
    return await this.surveyservice.getsurveys(body, data, moduleid);
  }
}
