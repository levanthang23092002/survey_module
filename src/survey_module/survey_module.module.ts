import { Module } from '@nestjs/common';
import { SurveyModuleController } from './survey_module.controller';
import { SurveyModuleService } from './survey_module.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SurveyModuleController],
  providers: [SurveyModuleService, PrismaService],
})
export class SurveyModuleModule {}
