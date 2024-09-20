import { BadRequestException, Injectable } from '@nestjs/common';
import { Instance } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateInstanceDto } from './Dto/instance.dto';
import { InstanceRepository } from './reponsitory/instance.reponsitory';

@Injectable()
export class InstanceService {
  constructor(
    private prisma: PrismaService,
    private instanceRepository: InstanceRepository,
  ) {}

  createInstance = async (
    userId: number,
    data: CreateInstanceDto,
  ): Promise<Instance> => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const now = new Date();
    if (start < now) {
      throw new BadRequestException({
        message: 'Event start date must be after current time',
      });
    }

    if (end < start) {
      throw new BadRequestException({
        message: 'Event end date must be after event start date',
      });
    }
    const newData = {
      startDate: start,
      endDate: end,
      adminid: userId,
      instanceDescription: data.instanceDescription,
      instanceName: data.instanceName,
    };

    const newInstance = this.prisma.instance.create({
      data: newData,
    });
    return newInstance;
  };

  UpadteInstance = async (
    userId: number,
    intanceId: number,
    data: CreateInstanceDto,
  ): Promise<Instance> => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const now = new Date();
    const startDate = await this.instanceRepository.getDateStart(
      userId,
      Number(intanceId),
    );
    const endDate = await this.instanceRepository.getDateEnd(
      userId,
      Number(intanceId),
    );

    if (now > new Date(startDate.startDate)) {
      if (new Date(startDate.startDate).getTime() !== start.getTime()) {
        throw new BadRequestException({
          message:
            'Event start date can only be changed if the event has not started yet.',
        });
      }
      if (new Date(endDate.endDate) < now) {
        if (end < new Date(endDate.endDate)) {
          throw new BadRequestException({
            message: 'Cannot move event end date back in time',
          });
        }
      } else {
        if (end < now) {
          throw new BadRequestException({
            message: 'Cannot move event end date before current time',
          });
        }
      }
    } else {
      if (start < now) {
        throw new BadRequestException({
          message: 'Only change event start date after current time',
        });
      }
    }
    if (end < start) {
      throw new BadRequestException({
        message: 'Event end date must after event start date',
      });
    }
    const newData = {
      startDate: start,
      endDate: end,
      adminid: userId,
      instanceDescription: data.instanceDescription,
      instanceName: data.instanceName,
      updatedAt: now,
    };

    const newInstance = this.prisma.instance.update({
      where: {
        instanceid: Number(intanceId),
      },
      data: newData,
    });
    return newInstance;
  };

  viewAllInstance = async (userId: number): Promise<Instance[]> => {
    const instance = await this.prisma.instance.findMany({
      where: {
        adminid: userId,
      },
    });
    return instance;
  };

  viewDetailInstance = async (
    userId: number,
    instanceId: number,
  ): Promise<Instance> => {
    const viewDetail = await this.prisma.instance.findUnique({
      where: {
        adminid: userId,
        instanceid: instanceId,
      },
    });
    return viewDetail;
  };
}
