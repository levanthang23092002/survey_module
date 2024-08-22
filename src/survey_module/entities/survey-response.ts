export class SurveyResponseEntity {
  questionnum: number;
  question: string;
  description?: string; // có thể null nên dùng dấu ?
  image?: string; // có thể null nên dùng dấu ?
  answer: string;
}

export class CreateSurveyResponseEntity {
  surveyid: number;
  instanceid: number;
  userid: number;
  surveyitemid: number;
  answer?: string;
  delete?: boolean;
  timestamp_created?: Date;
  timestamp_updated?: Date;
}
