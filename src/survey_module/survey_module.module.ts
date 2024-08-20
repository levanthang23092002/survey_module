import { Module } from '@nestjs/common';
import { SurveyModuleController } from './survey_module.controller';
import { SurveyModuleService } from './survey_module.service';

@Module({
  controllers: [SurveyModuleController],
  providers: [SurveyModuleService]
})
export class SurveyModuleModule {}
