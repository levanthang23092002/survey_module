import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class GroupRepository {
  constructor(private prisma: PrismaService) {}

  async checkInstance(userId: number, instanceId: number): Promise<any> {
    const instance = await this.prisma.instance.findUnique({
      where: {
        instanceid: instanceId,
        adminid: userId,
      },
    });
    if (!instance || instance == null) return false;
    else return true;
  }
}
