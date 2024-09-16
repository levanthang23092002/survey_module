import { IsArray, IsNumber, Max } from 'class-validator';
import { SurveyItemEntity } from '../entities/survey-item.entity';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyResponseEntity } from '../entities/survey-response';

import { ApiProperty } from '@nestjs/swagger';

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
  surveyItemId: number;
  answer: string;
}

export class ListResultAnswer {
  total: number;
  listSurvey: ListResultUserAnswer[];
}
export class ListResultUserAnswer {
  userId: number;
  responses: SurveyResponseEntity[];
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

export class BasicRouteParamsDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  eventId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  moduleId: number;
}

export class SurveyRouteParamsDto extends BasicRouteParamsDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  surveyId: number;
}

export class ErrorResponseDto {
  status: string;
  message: string;
  errorCode?: string;
}

export class SuccessResponseDto {
  @ApiProperty({ description: 'Status of the response' })
  status: string;

  @ApiProperty({ description: 'Message associated with the response' })
  message: string;

  @ApiProperty({ description: 'Data payload of the response' })
  data: any;
}
