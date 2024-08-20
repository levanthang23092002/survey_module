export class DetailSurvey {
  data: Question[];
  total: number;
}

export interface Question {
  questionnum: number;
  question: string;
  description: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}
export interface UserdDetailSurvey {
  userid: number;
  instanceid: number;
}

export interface Survey {
  surveyName: string;
  surveyDescription: string;
  duration: number;
  type: string;
  day: Date;
  points: number;
  timestamp_created: Date;
}
export interface ListSurvey {
  list_survey: Survey[];
  total: number;
  item_per_page: number;
  page: number;
}

export interface InputSurvey {
  page?: number;
  item_per_page?: number;
}
