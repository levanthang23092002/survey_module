import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { GroupRepository } from './reponsitory/group.reponsitory';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService, GroupRepository],
})
export class GroupsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GroupsController);
  }
}
