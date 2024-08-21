import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SurveyModuleModule } from './survey_module/survey_module.module';

@Module({
  imports: [
    SurveyModuleModule,
    ConfigModule.forRoot({
      isGlobal: true, // Cấu hình module này thành global để không cần import lại ở các module khác
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
