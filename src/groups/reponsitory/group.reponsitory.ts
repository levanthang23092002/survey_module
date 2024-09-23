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
  async checkUserGroupExists(userId: number, instanceId: number) {
    const userGroup = await this.prisma.userGroup.findFirst({
      where: {
        userid: userId,
        instanceid: instanceId,
      },
      select: {
        groupid: true,
      },
    });
    return userGroup;
  }
  async isAdminGroup(userId: number, groupId: number, instanceId: number) {
    const objectGroup = await this.prisma.objectGroup.findFirst({
      where: {
        groupid: groupId,
        instanceid: instanceId,
        userid: userId,
        deleted: false,
      },
    });
    return !!objectGroup;
  }
}
