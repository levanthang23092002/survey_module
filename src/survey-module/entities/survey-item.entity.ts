export class SurveyItemEntity {
  questionNum: number;
  question: string;
  description?: string;
  image?: string;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
  type?: string;
  required?: boolean;
  showDescription?: boolean;
  shuffleChoice?: boolean;
  hasCommentField?: boolean;
  subQuestions?: SubQuestionEntity[];
}

export class SubQuestionEntity {
  subQuestion: string;
  subNum: number;
}
