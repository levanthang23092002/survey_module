import { PrismaService } from '../../prisma.service';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyItemEntity } from '../entities/survey-item.entity';
import { CreateSurveyResponseEntity, SurveyResponseEntity } from '../entities/survey-response';
export declare class SurveyModuleRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findSurveyItems(surveyId: number, instanceId: number): Promise<SurveyItemEntity[]>;
    checkDataResponse(surveyId: number, surveyItemId: number[]): Promise<boolean>;
    hasUserCompletedSurvey(userId: number, surveyId: number): Promise<boolean>;
    findListSurvey(instanceId: number, userGroup: number, perPage: number, skip: number): Promise<SurveyEntity[]>;
    counttotalListSurvey(instanceId: number, userGroup: number): Promise<number>;
    getUserSurveyResponses(instanceid: number, surveyId: number, userId: number): Promise<SurveyResponseEntity[]>;
    getUserSurveyResponsesByAdmin(instanceid: number, surveyId: number): Promise<any>;
    addSurveyResponse(datas: CreateSurveyResponseEntity[]): Promise<any>;
    checkAdmin(userId: number, instanceId: number): Promise<boolean>;
    findListSurveyByAdmin(instanceId: number, perPage: number, skip: number): Promise<SurveyEntity[]>;
    counttotalListSurveyByAmin(instanceId: number): Promise<number>;
}
