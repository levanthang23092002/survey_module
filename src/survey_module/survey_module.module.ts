import { Module } from '@nestjs/common';
import { SurveyModuleController } from './survey_module.controller';
import { SurveyModuleService } from './survey_module.service';
import { PrismaService } from 'src/prisma.service';
import { SurveyModuleRepository } from './repository/survey_module.repository';

@Module({
  controllers: [SurveyModuleController],
  providers: [SurveyModuleService, PrismaService, SurveyModuleRepository],
})
export class SurveyModuleModule {}
