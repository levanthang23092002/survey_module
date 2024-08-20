import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModuleModule } from './survey_module/survey_module.module';

@Module({
  imports: [SurveyModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
