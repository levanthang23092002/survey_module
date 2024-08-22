import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SurveyModuleModule } from './survey_module/survey-module.module';
import { ModuleActivationModule } from './module-activation/module-activation.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SurveyModuleModule,
    ConfigModule.forRoot({
      isGlobal: true, // Cấu hình module này thành global để không cần import lại ở các module khác
    }),
    ModuleActivationModule,
    GroupsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
