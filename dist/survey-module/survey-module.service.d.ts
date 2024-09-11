import { SurveyModuleRepository } from './repository/survey-module.repository';
import { CreateSurveyResponse, SurveyRouteParamsDto, InputSurvey, BasicRouteParamsDto, SuccessResponseDto } from './dto/survey.dto';
import { ModuleActivationService } from '../module-activation/module-activation.service';
import { GroupsService } from '../groups/groups.service';
export declare class SurveyModuleService {
    private SurveyRepo;
    private moduleActivationService;
    private groupService;
    constructor(SurveyRepo: SurveyModuleRepository, moduleActivationService: ModuleActivationService, groupService: GroupsService);
    getDetailSurvey(userId: number, params: SurveyRouteParamsDto): Promise<SuccessResponseDto>;
    getSurveys(userId: number, params: BasicRouteParamsDto, data: InputSurvey): Promise<SuccessResponseDto>;
    getSurveyResponse(userId: number, params: SurveyRouteParamsDto): Promise<SuccessResponseDto>;
    addSurveyResponse(userId: number, params: SurveyRouteParamsDto, body: CreateSurveyResponse): Promise<SuccessResponseDto>;
}
