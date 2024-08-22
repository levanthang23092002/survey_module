import { Module } from '@nestjs/common';
import { ModuleActivationService } from './module-activation.service';
import { ModuleActivationController } from './module-activation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ModuleActivationController],
  providers: [ModuleActivationService, PrismaService],
})
export class ModuleActivationModule {}
