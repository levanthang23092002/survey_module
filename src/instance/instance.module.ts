import { MiddlewareConsumer, Module } from '@nestjs/common';
import { InstanceController } from './instance.controller';
import { InstanceService } from './instance.service';
import { PrismaService } from 'src/prisma.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { InstanceRepository } from './reponsitory/instance.reponsitory';

@Module({
  controllers: [InstanceController],
  providers: [InstanceService, PrismaService, InstanceRepository],
})
export class InstanceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(InstanceController);
  }
}
