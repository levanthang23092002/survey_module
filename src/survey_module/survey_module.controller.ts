import { Controller, Get } from '@nestjs/common';
import { SurveyModuleService } from './survey_module.service';

@Controller('survey-module')
export class SurveyModuleController {
  constructor(private surveyservice: SurveyModuleService) {}

  @Get('all')
  async getall(): Promise<any> {
    return 'hello world';
  }

  @Get(':mod')
}
