import { SurveyModuleService } from './survey-module.service';
import { CreateSurveyResponse, SurveyRouteParamsDto, InputSurvey, SuccessResponseDto, BasicRouteParamsDto } from './dto/survey.dto';
export declare class SurveyModuleController {
    private surveyService;
    constructor(surveyService: SurveyModuleService);
    getSurveyDetail(params: SurveyRouteParamsDto, req: any): Promise<SuccessResponseDto>;
    getListSurvey(params: BasicRouteParamsDto, page: InputSurvey, req: any): Promise<SuccessResponseDto>;
    getUserSurveyResponse(req: any, params: SurveyRouteParamsDto): Promise<SuccessResponseDto>;
    addUserSurveyResponse(req: any, params: SurveyRouteParamsDto, body: CreateSurveyResponse): Promise<SuccessResponseDto>;
}
