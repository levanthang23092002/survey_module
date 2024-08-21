import { IsArray, IsNumber, Max } from 'class-validator';
import { SurveyItemEntity } from '../entities/survey_item.entity';
import { SurveyEntity } from '../entities/survey.entity';

export class DetailSurvey {
  @IsArray()
  data: SurveyItemEntity[];
  @IsNumber()
  total: number;
}

export class CreateSurveyResponse {
  @IsArray()
  data: InputSurveyResponse[];
}
export class InputSurveyResponse {
  @IsNumber()
  surveyitemid: number;
  answer: string;
}
export class ListSurvey {
  @IsArray()
  listSurvey: SurveyEntity[];
  @IsNumber()
  total: number;
  @IsNumber()
  @Max(100)
  itemPerPage: number;
  @IsNumber()
  page: number;
}

export class InputSurvey {
  @IsNumber()
  page?: number;
  @IsNumber()
  @Max(50)
  itemPerPage?: number;
}
