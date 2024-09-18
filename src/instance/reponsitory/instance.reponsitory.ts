import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class InstanceRepository {
  constructor(private prisma: PrismaService) {}

  async getDateStart(userId: number, instanceId: number): Promise<any> {
    const dateStart = this.prisma.instance.findUnique({
      where: {
        instanceid: instanceId,
        adminid: userId,
      },
      select: {
        startDate: true,
      },
    });
    return dateStart;
  }

  async getDateEnd(userId: number, instanceId: number): Promise<any> {
    const endStart = this.prisma.instance.findUnique({
      where: {
        instanceid: instanceId,
        adminid: userId,
      },
      select: {
        endDate: true,
      },
    });
    return endStart;
  }
}
