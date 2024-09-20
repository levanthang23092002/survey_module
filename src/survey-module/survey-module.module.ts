import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SurveyModuleController } from './survey-module.controller';
import { SurveyModuleService } from './survey-module.service';
import { PrismaService } from 'src/prisma.service';
import { SurveyModuleRepository } from './repository/survey-module.repository';
import { ModuleActivationModule } from 'src/module-activation/module-activation.module';
import { ModuleActivationService } from 'src/module-activation/module-activation.service';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupsService } from 'src/groups/groups.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { GroupRepository } from 'src/groups/reponsitory/group.reponsitory';

@Module({
  imports: [ModuleActivationModule, GroupsModule],
  controllers: [SurveyModuleController],
  providers: [
    SurveyModuleService,
    PrismaService,
    SurveyModuleRepository,
    ModuleActivationService,
    GroupsService,
    GroupRepository,
  ],
})
export class SurveyModuleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SurveyModuleController);
  }
}
