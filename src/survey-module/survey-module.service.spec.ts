import { Test, TestingModule } from '@nestjs/testing';
import { SurveyModuleService } from './survey-module.service';
import { ModuleActivationService } from '../module-activation/module-activation.service';
import { GroupsService } from '../groups/groups.service';
import { SurveyModuleRepository } from './repository/survey-module.repository';
import { NotFoundException } from '@nestjs/common';
import { SurveyItemEntity } from './entities/survey-item.entity';
import {
  BasicRouteParamsDto,
  InputSurvey,
  SuccessResponseDto,
  SurveyRouteParamsDto,
} from './dto/survey.dto';

describe('SurveyService', () => {
  let surveyService: SurveyModuleService;
  let moduleActivationService: ModuleActivationService;
  let groupService: GroupsService;
  let surveyRepo: SurveyModuleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyModuleService,
        {
          provide: ModuleActivationService,
          useValue: {
            isSurveyModuleActivated: jest.fn(),
          },
        },
        {
          provide: GroupsService,
          useValue: {
            getUserGroup: jest.fn(),
            isGroupActivated: jest.fn(),
            isGroupInSurvey: jest.fn(),
          },
        },
        {
          provide: SurveyModuleRepository,
          useValue: {
            checkAdmin: jest.fn(),
            findSurveyItems: jest.fn(),
            findListSurveyByAdmin: jest.fn(),
            counttotalListSurveyByAmin: jest.fn(),
            getUserSurveyResponsesByAdmin: jest.fn(),
            getUserSurveyResponses: jest.fn(),
            addSurveyResponse: jest.fn(),
            checkDataResponse: jest.fn(),
            hasUserCompletedSurvey: jest.fn(),
            findListSurvey: jest.fn(),
            counttotalListSurvey: jest.fn(),
          },
        },
      ],
    }).compile();

    surveyService = module.get<SurveyModuleService>(SurveyModuleService);
    moduleActivationService = module.get<ModuleActivationService>(
      ModuleActivationService,
    );
    groupService = module.get<GroupsService>(GroupsService);
    surveyRepo = module.get<SurveyModuleRepository>(SurveyModuleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDetailSurvey', () => {
    it('should return survey details if the user is an admin', async () => {
      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(true);

      const surveyItem: SurveyItemEntity[] = [
        {
          questionNum: 1,
          question: 'What is your favorite programming language?',
          description: 'Please select one from the following choices.',
          image: 'https://example.com/question-image.png',
          choice1: 'JavaScript',
          choice2: 'Python',
          choice3: 'Java',
          choice4: 'C++',
          type: 'multiple-choice',
          required: true,
          showDescription: true,
          shuffleChoice: false,
          hasCommentField: true,
          subQuestions: [
            {
              subQuestion: 'Why do you prefer this language?',
              subNum: 1,
            },
            {
              subQuestion: 'Which other languages do you use frequently?',
              subNum: 2,
            },
          ],
        },
      ];

      jest.spyOn(surveyRepo, 'findSurveyItems').mockResolvedValue(surveyItem);

      const result = await surveyService.getDetailSurvey(1, {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      });

      expect(result).toEqual({
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: {
          total: 1,
          data: surveyItem,
        },
      });
    });

    it('should throw NotFoundException if the survey module is not activated', async () => {
      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(false);

      await expect(
        surveyService.getDetailSurvey(1, {
          eventId: 1,
          moduleId: 1,
          surveyId: 1,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if the user is not an admin', async () => {
      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);

      await expect(
        surveyService.getDetailSurvey(1, {
          eventId: 1,
          moduleId: 1,
          surveyId: 1,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSurveys', () => {
    const listSurvers = [
      {
        surveyName: 'Customer Satisfaction Survey',
        surveyDescription: 'This survey aims to gather feedback.',
        duration: 30,
        type: 'Customer Feedback',
        day: new Date('2024-08-23'),
        points: 10,
        timestampCreated: new Date(),
      },
    ];
    it('should return survey details for an admin user', async () => {
      const userId = 1;
      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const data: InputSurvey = { page: 1, itemPerPage: 10 };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(true);
      jest
        .spyOn(surveyRepo, 'findListSurveyByAdmin')
        .mockResolvedValue(listSurvers);
      jest.spyOn(surveyRepo, 'counttotalListSurveyByAmin').mockResolvedValue(2);

      const result: SuccessResponseDto = await surveyService.getSurveys(
        userId,
        params,
        data,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: {
          total: 2,
          itemPerPage: 10,
          page: 1,
          listSurvey: listSurvers,
        },
      });
    });

    it('should throw NotFoundException if module is not activated', async () => {
      const userId = 1;
      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const data: InputSurvey = { page: 1, itemPerPage: 10 };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(false);

      await expect(
        surveyService.getSurveys(userId, params, data),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });

    it('should return survey details for a user in an activated group', async () => {
      const userId = 1;
      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const data: InputSurvey = { page: 1, itemPerPage: 10 };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest
        .spyOn(groupService, 'getUserGroup')
        .mockResolvedValue({ groupid: 1 });
      jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'findListSurvey').mockResolvedValue(listSurvers);
      jest.spyOn(surveyRepo, 'counttotalListSurvey').mockResolvedValue(2);

      const result: SuccessResponseDto = await surveyService.getSurveys(
        userId,
        params,
        data,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: {
          total: 2,
          itemPerPage: 10,
          page: 1,
          listSurvey: listSurvers,
        },
      });
    });

    it('should throw NotFoundException if user group is not found', async () => {
      const userId = 1;
      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const data: InputSurvey = { page: 1, itemPerPage: 10 };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest.spyOn(groupService, 'getUserGroup').mockResolvedValue(null);

      await expect(
        surveyService.getSurveys(userId, params, data),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });

    it('should throw NotFoundException if group is not activated', async () => {
      const userId = 1;
      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const data: InputSurvey = { page: 1, itemPerPage: 10 };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest
        .spyOn(groupService, 'getUserGroup')
        .mockResolvedValue({ groupid: 1 });
      jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(false);

      await expect(
        surveyService.getSurveys(userId, params, data),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });
  });

  describe('getSurveyResponse', () => {
    const responses = [
      {
        userid: 1,
        surveyItem: {
          questionnum: 1,
          question: 'What is your favorite color?',
          description: 'Choose your favorite color.',
          image: 'color.png',
        },
        answer: 'Blue',
      },
    ];
    const responseuser = [
      {
        questionnum: 1,
        question: 'What is your favorite color?',
        description: 'Choose your favorite color.',
        image: 'color.png',
        answer: 'Blue',
      },
    ];

    it('should return survey responses for an admin user', async () => {
      const userId = 1;
      const params: SurveyRouteParamsDto = {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(true);
      jest
        .spyOn(surveyRepo, 'getUserSurveyResponsesByAdmin')
        .mockResolvedValue([{ userId: 1, responses: responses }]);

      const result: SuccessResponseDto = await surveyService.getSurveyResponse(
        userId,
        params,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: {
          total: 1,
          listSurvey: [{ userId: 1, responses: responses }],
        },
      });
    });

    it('should return survey responses for a user', async () => {
      const userId = 1;
      const params: SurveyRouteParamsDto = {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest
        .spyOn(groupService, 'getUserGroup')
        .mockResolvedValue({ groupid: 1 });
      jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
      jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
      jest
        .spyOn(surveyRepo, 'getUserSurveyResponses')
        .mockResolvedValue(responseuser);

      const result: SuccessResponseDto = await surveyService.getSurveyResponse(
        userId,
        params,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Survey details retrieved successfully',
        data: {
          total: 1,
          listSurvey: [{ userId: 1, responses: responseuser }],
        },
      });
    });

    it('should throw NotFoundException if module is not activated', async () => {
      const userId = 1;
      const params: SurveyRouteParamsDto = {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(false);

      await expect(
        surveyService.getSurveyResponse(userId, params),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });

    it('should throw NotFoundException if user is not  a user group is not found', async () => {
      const userId = 1;
      const params: SurveyRouteParamsDto = {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest.spyOn(groupService, 'getUserGroup').mockResolvedValue(null);

      await expect(
        surveyService.getSurveyResponse(userId, params),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });

    it('should throw NotFoundException if user group is not activated', async () => {
      const userId = 1;
      const params: SurveyRouteParamsDto = {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest
        .spyOn(groupService, 'getUserGroup')
        .mockResolvedValue({ groupid: 1 });
      jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(false);

      await expect(
        surveyService.getSurveyResponse(userId, params),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });

    it('should throw NotFoundException if group is not in survey', async () => {
      const userId = 1;
      const params: SurveyRouteParamsDto = {
        eventId: 1,
        moduleId: 1,
        surveyId: 1,
      };

      jest
        .spyOn(moduleActivationService, 'isSurveyModuleActivated')
        .mockResolvedValue(true);
      jest.spyOn(surveyRepo, 'checkAdmin').mockResolvedValue(false);
      jest
        .spyOn(groupService, 'getUserGroup')
        .mockResolvedValue({ groupid: 1 });
      jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
      jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(false);

      await expect(
        surveyService.getSurveyResponse(userId, params),
      ).rejects.toThrow(new NotFoundException({ message: 'Not Found' }));
    });
    describe('addSurveyResponse', () => {
      const userId = 1;
      const params = { eventId: 1, moduleId: 1, surveyId: 1 };
      const body = {
        data: [
          { surveyItemId: 1, answer: 'Answer 1' },
          { surveyItemId: 2, answer: 'Answer 2' },
          { surveyItemId: 3, answer: 'Answer 3' },
        ],
      };

      it('should add survey response successfully', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(true);
        jest
          .spyOn(groupService, 'getUserGroup')
          .mockResolvedValue({ groupid: 1 });
        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
        jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
        jest.spyOn(surveyRepo, 'checkDataResponse').mockResolvedValue(true);
        jest
          .spyOn(surveyRepo, 'hasUserCompletedSurvey')
          .mockResolvedValue(false);
        jest
          .spyOn(surveyRepo, 'addSurveyResponse')
          .mockResolvedValue(body.data);

        const result = await surveyService.addSurveyResponse(
          userId,
          params,
          body,
        );

        expect(result.status).toBe('success');
        expect(result.message).toBe('Survey details retrieved successfully');
        expect(result.data).toEqual(body.data);
      });

      it('should throw NotFoundException if module is not activated', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(false);

        await expect(
          surveyService.addSurveyResponse(userId, params, body),
        ).rejects.toThrow(NotFoundException);
      });

      it('should throw NotFoundException if user group is not found', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(true);
        jest.spyOn(groupService, 'getUserGroup').mockResolvedValue(null);

        await expect(
          surveyService.addSurveyResponse(userId, params, body),
        ).rejects.toThrow(NotFoundException);
      });

      it('should throw NotFoundException if group is not activated', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(true);
        jest
          .spyOn(groupService, 'getUserGroup')
          .mockResolvedValue({ groupid: 1 });
        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(false);

        await expect(
          surveyService.addSurveyResponse(userId, params, body),
        ).rejects.toThrow(NotFoundException);
      });

      it('should throw NotFoundException if group is not in survey', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(true);
        jest
          .spyOn(groupService, 'getUserGroup')
          .mockResolvedValue({ groupid: 1 });
        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
        jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(false);

        await expect(
          surveyService.addSurveyResponse(userId, params, body),
        ).rejects.toThrow(NotFoundException);
      });

      it('should throw NotFoundException if data response is invalid', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(true);
        jest
          .spyOn(groupService, 'getUserGroup')
          .mockResolvedValue({ groupid: 1 });
        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
        jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
        jest.spyOn(surveyRepo, 'checkDataResponse').mockResolvedValue(false);

        await expect(
          surveyService.addSurveyResponse(userId, params, body),
        ).rejects.toThrow(NotFoundException);
      });

      it('should throw NotFoundException if user has already completed the survey', async () => {
        jest
          .spyOn(moduleActivationService, 'isSurveyModuleActivated')
          .mockResolvedValue(true);
        jest
          .spyOn(groupService, 'getUserGroup')
          .mockResolvedValue({ groupid: 1 });
        jest.spyOn(groupService, 'isGroupActivated').mockResolvedValue(true);
        jest.spyOn(groupService, 'isGroupInSurvey').mockResolvedValue(true);
        jest.spyOn(surveyRepo, 'checkDataResponse').mockResolvedValue(true);
        jest
          .spyOn(surveyRepo, 'hasUserCompletedSurvey')
          .mockResolvedValue(true);

        await expect(
          surveyService.addSurveyResponse(userId, params, body),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });
});
