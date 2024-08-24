import { PrismaService } from '../prisma.service'; // Đảm bảo đường dẫn đúng
import { GroupsService } from './groups.service'; // Đảm bảo đường dẫn đúng

describe('SurveyModuleRepository', () => {
  let repository: GroupsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = {
      userGroup: {
        findFirst: jest.fn(),
      },
      objectGroup: {
        findFirst: jest.fn(),
      },
      survey: {
        findFirst: jest.fn(),
      },
    } as unknown as PrismaService;

    repository = new GroupsService(prismaService);
  });

  const mockUserGroups = {
    usergroupid: 1,
    instanceid: 1,
    userid: 1,
    groupid: 1,
    deleted: false,
    timestamp_created: new Date('2024-08-23T12:00:00Z'),
    timestamp_updated: new Date('2024-08-23T12:00:00Z'),
    timestamp_deleted: null,
  };

  const mockObjectGroup = {
    id: 1,
    type: 'ExampleType',
    objectid: 1,
    groupid: 1,
    userid: 1,
    instanceid: 1,
    deleted: false,
    timestamp_created: new Date('2024-08-23T12:00:00Z'),
    timestamp_updated: new Date('2024-08-23T12:00:00Z'),
    timestamp_deleted: null,
  };
  const mockSurvey = {
    groupid: 1,
  };

  describe('getUserGroup', () => {
    it('should return user group if it exists', async () => {
      (prismaService.userGroup.findFirst as jest.Mock).mockResolvedValue(
        mockUserGroups,
      );

      const result = await repository.getUserGroup(1, 1);

      expect(result).toEqual(mockUserGroups);
    });

    it('should return null if user group does not exist', async () => {
      (prismaService.userGroup.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repository.getUserGroup(1, 1);

      expect(result).toBeNull();
    });
  });

  describe('isGroupActivated', () => {
    it('should return true if the group is activated', async () => {
      (prismaService.objectGroup.findFirst as jest.Mock).mockResolvedValue(
        mockObjectGroup,
      );

      const result = await repository.isGroupActivated(1, 1);

      expect(result).toBe(true);
    });

    it('should return false if the group is not found', async () => {
      (prismaService.objectGroup.findFirst as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await repository.isGroupActivated(1, 1);

      expect(result).toBe(false);
    });
  });
  describe('isGroupInSurvey', () => {
    it('should return true if the group is in the survey', async () => {
      (prismaService.survey.findFirst as jest.Mock).mockResolvedValue(
        mockSurvey,
      );

      const result = await repository.isGroupInSurvey(1, 1, 1);

      expect(result).toBe(true);
    });

    it('should return false if the group is not in the survey', async () => {
      (prismaService.survey.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repository.isGroupInSurvey(1, 1, 1);

      expect(result).toBe(false);
    });
  });
});
