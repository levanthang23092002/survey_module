import { Test, TestingModule } from '@nestjs/testing';
import { SurveyModuleController } from './survey-module.controller';
import { SurveyModuleService } from './survey-module.service';
import { NotFoundException } from '@nestjs/common';
import {
  CreateSurveyResponse,
  SurveyRouteParamsDto,
  InputSurvey,
  BasicRouteParamsDto,
} from './dto/survey.dto';
import { SurveyItemEntity } from './entities/survey-item.entity';

describe('SurveyModuleController', () => {
  let controller: SurveyModuleController;
  let surveyService: SurveyModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyModuleController],
      providers: [
        {
          provide: SurveyModuleService,
          useValue: {
            getDetailSurvey: jest.fn(),
            getSurveys: jest.fn(),
            getSurveyResponse: jest.fn(),
            addSurveyResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SurveyModuleController>(SurveyModuleController);
    surveyService = module.get<SurveyModuleService>(SurveyModuleService);
  });
  const params: SurveyRouteParamsDto = {
    eventId: 1,
    moduleId: 1,
    surveyId: 1,
  };
  function createMockSurveyDetail(data: any, text: string) {
    return {
      status: 'success',
      message: text + ' retrieved successfully',
      data: {
        total: Array.isArray(data) ? data.length : 1,
        data: data,
      },
    };
  }
  describe('getSurveyDetail', () => {
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

    it('should return survey detail successfully', async () => {
      const req = { user: { userId: 1 } };

      jest
        .spyOn(surveyService, 'getDetailSurvey')
        .mockResolvedValue(
          createMockSurveyDetail(surveyItem, 'Get all survey item '),
        );

      const result = await controller.getSurveyDetail(params, req);

      expect(result).toEqual(
        createMockSurveyDetail(surveyItem, 'Get all survey item '),
      );
      //   expect(surveyService.getDetailSurvey).toHaveBeenCalledWith(
      //     req.user.userId,
      //     params,
      //   );
    });

    it('should throw NotFoundException when survey not found', async () => {
      const req = { user: { userId: 1 } };

      jest
        .spyOn(surveyService, 'getDetailSurvey')
        .mockRejectedValue(new Error('Survey not found'));

      await expect(controller.getSurveyDetail(params, req)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getListSurvey', () => {
    it('should return list of surveys successfully', async () => {
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

      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const page: InputSurvey = { page: 1, itemPerPage: 10 };
      const req = { user: { userId: 1 } };

      jest
        .spyOn(surveyService, 'getSurveys')
        .mockResolvedValue(
          createMockSurveyDetail(listSurvers, 'Get all surveys '),
        );

      const result = await controller.getListSurvey(params, page, req);

      expect(result).toEqual(
        createMockSurveyDetail(listSurvers, 'Get all surveys '),
      );
    });

    it('should throw NotFoundException when surveys not found', async () => {
      const params: BasicRouteParamsDto = { eventId: 1, moduleId: 1 };
      const page: InputSurvey = { page: 1, itemPerPage: 10 };
      const req = { user: { userId: 1 } };

      jest
        .spyOn(surveyService, 'getSurveys')
        .mockRejectedValue(new Error('Surveys not found'));

      await expect(controller.getListSurvey(params, page, req)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUserSurveyResponse', () => {
    it('should return user survey response successfully', async () => {
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

      const req = { user: { userId: 1 } };

      jest
        .spyOn(surveyService, 'getSurveyResponse')
        .mockResolvedValue(
          createMockSurveyDetail(responses, 'Get Survey Results '),
        );

      const result = await controller.getUserSurveyResponse(req, params);

      expect(result).toEqual(
        createMockSurveyDetail(responses, 'Get Survey Results '),
      );
      expect(surveyService.getSurveyResponse).toHaveBeenCalledWith(
        req.user.userId,
        params,
      );
    });

    it('should throw NotFoundException when survey response not found', async () => {
      const req = { user: { userId: 1 } };

      jest
        .spyOn(surveyService, 'getSurveyResponse')
        .mockRejectedValue(new Error('Survey response not found'));

      await expect(
        controller.getUserSurveyResponse(req, params),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('addUserSurveyResponse', () => {
    it('should add user survey response successfully', async () => {
      const req = { user: { userId: 1 } };
      const body = {
        data: [
          { surveyItemId: 1, answer: 'Answer 1' },
          { surveyItemId: 2, answer: 'Answer 2' },
          { surveyItemId: 3, answer: 'Answer 3' },
        ],
      };
      jest
        .spyOn(surveyService, 'addSurveyResponse')
        .mockResolvedValue(createMockSurveyDetail(body, 'Post survey answer '));

      const result = await controller.addUserSurveyResponse(req, params, body);

      expect(result).toEqual(
        createMockSurveyDetail(body, 'Post survey answer '),
      );
      expect(surveyService.addSurveyResponse).toHaveBeenCalledWith(
        req.user.userId,
        params,
        body,
      );
    });

    it('should throw NotFoundException when survey response cannot be added', async () => {
      const req = { user: { userId: 1 } };
      const body: CreateSurveyResponse = {
        data: [{ surveyItemId: 1, answer: 'Yes' }],
      };

      jest
        .spyOn(surveyService, 'addSurveyResponse')
        .mockRejectedValue(new Error('Survey response not added'));

      await expect(
        controller.addUserSurveyResponse(req, params, body),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
