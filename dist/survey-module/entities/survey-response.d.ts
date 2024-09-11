export declare class SurveyResponseEntity {
    questionnum: number;
    question: string;
    description?: string;
    image?: string;
    answer: string;
}
export declare class CreateSurveyResponseEntity {
    surveyid: number;
    instanceid: number;
    userid: number;
    surveyitemid: number;
    answer?: string;
    delete?: boolean;
    timestamp_created?: Date;
    timestamp_updated?: Date;
}
