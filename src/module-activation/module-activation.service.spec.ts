import { PrismaService } from '../prisma.service';
import { ModuleActivationService } from './module-activation.service';

describe('SurveyModuleRepository', () => {
  let service: ModuleActivationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = {
      module: {
        findFirst: jest.fn(),
      },
      objectGroup: {
        findFirst: jest.fn(),
      },
      survey: {
        findFirst: jest.fn(),
      },
    } as unknown as PrismaService;

    service = new ModuleActivationService(prismaService);
  });

  describe('isSurveyModuleActivated', () => {
    it('should return true if the module is activated', async () => {
      (prismaService.module.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        instanceid: 1,
        deleted: false,
        activated: true,
      });

      const result = await service.isSurveyModuleActivated(1, 1);

      expect(result).toBe(true);
    });

    it('should return false if the module is not found', async () => {
      (prismaService.module.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await service.isSurveyModuleActivated(1, 1);

      expect(result).toBe(false);
    });
  });

  describe('isGroupActivated', () => {
    it('should return true if the group is activated', async () => {
      (prismaService.objectGroup.findFirst as jest.Mock).mockResolvedValue({
        groupid: 1,
        instanceid: 1,
        deleted: false,
      });

      const result = await service.isGroupActivated(1, 1);

      expect(result).toBe(true);
    });

    it('should return false if the group is not found', async () => {
      (prismaService.objectGroup.findFirst as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await service.isGroupActivated(1, 1);

      expect(result).toBe(false);
    });
  });

  describe('isGroupInSurvey', () => {
    it('should return true if the group is in the survey', async () => {
      (prismaService.survey.findFirst as jest.Mock).mockResolvedValue({
        surveyid: 1,
        instanceid: 1,
        groupid: 1,
        deleted: false,
        hidden: false,
      });

      const result = await service.isGroupInSurvey(1, 1, 1);

      expect(result).toBe(true);
    });

    it('should return false if the group is not in the survey', async () => {
      (prismaService.survey.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await service.isGroupInSurvey(1, 1, 1);

      expect(result).toBe(false);
    });
  });
});
