import { Test, TestingModule } from '@nestjs/testing';
import { SurveyModuleService } from './survey_module.service';

describe('SurveyModuleService', () => {
  let service: SurveyModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyModuleService],
    }).compile();

    service = module.get<SurveyModuleService>(SurveyModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
