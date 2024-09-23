import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InstanceService } from './instance.service';
import { Instance } from '@prisma/client';
import { CreateInstanceDto, InstanceId } from './Dto/instance.dto';

@Controller('event')
@ApiTags('Event manage')
export class InstanceController {
  constructor(private instance: InstanceService) {}

  @ApiBearerAuth('JWT-auth')
  @Post('add')
  createInstance(
    @Request() req,
    @Body() body: CreateInstanceDto,
  ): Promise<Instance> {
    const userId = req.user?.userId;
    return this.instance.createInstance(userId, body);
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':instanceId/update')
  updateInstance(
    @Request() req,
    @Param() instanceId: InstanceId,
    @Body() body: CreateInstanceDto,
  ): Promise<Instance> {
    const userId = req.user?.userId;
    return this.instance.UpadteInstance(userId, instanceId.instanceId, body);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('view-All')
  viewAllInstance(@Request() req): Promise<Instance[]> {
    const userId = req.user?.userId;
    return this.instance.viewAllInstance(userId);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('view-detail/:instanceId')
  viewDetailInstance(
    @Request() req,
    @Param() input: InstanceId,
  ): Promise<Instance> {
    const userId = req.user?.userId;
    return this.instance.viewDetailInstance(userId, Number(input.instanceId));
  }
}
