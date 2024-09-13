import { SurveyItemEntity } from '../entities/survey-item.entity';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyResponseEntity } from '../entities/survey-response';
export declare class DetailSurvey {
    data: SurveyItemEntity[];
    total: number;
}
export declare class CreateSurveyResponse {
    data: InputSurveyResponse[];
}
export declare class InputSurveyResponse {
    surveyItemId: number;
    answer: string;
}
export declare class ListResultAnswer {
    total: number;
    listSurvey: ListResultUserAnswer[];
}
export declare class ListResultUserAnswer {
    userId: number;
    responses: SurveyResponseEntity[];
}
export declare class ListSurvey {
    listSurvey: SurveyEntity[];
    total: number;
    itemPerPage: number;
    page: number;
}
export declare class InputSurvey {
    page?: number;
    itemPerPage?: number;
}
export declare class BasicRouteParamsDto {
    eventId: number;
    moduleId: number;
}
export declare class SurveyRouteParamsDto extends BasicRouteParamsDto {
    surveyId: number;
}
export declare class ErrorResponseDto {
    status: string;
    message: string;
    errorCode?: string;
}
export declare class SuccessResponseDto {
    status: string;
    message: string;
    data: any;
}
