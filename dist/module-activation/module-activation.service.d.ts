import { PrismaService } from '../prisma.service';
export declare class ModuleActivationService {
    private prisma;
    constructor(prisma: PrismaService);
    isSurveyModuleActivated(moduleId: number, instanceId: number): Promise<boolean>;
    isGroupActivated(userGroupId: number, instanceId: number): Promise<boolean>;
    isGroupInSurvey(surveyId: number, groupId: number, instanceId: number): Promise<boolean>;
}
