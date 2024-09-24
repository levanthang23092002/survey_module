import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SurveyModuleModule } from './survey-module/survey-module.module';
import { ModuleActivationModule } from './module-activation/module-activation.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { InstanceModule } from './instance/instance.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    SurveyModuleModule,
    ConfigModule.forRoot({
      isGlobal: true, // Cấu hình module này thành global để không cần import lại ở các module khác
    }),
    ModuleActivationModule,
    GroupsModule,
    AuthModule,
    InstanceModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
