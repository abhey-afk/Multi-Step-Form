export type QuestionType = 'text' | 'radio' | 'checkbox';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
}

export interface Screen {
  id: string;
  title: string;
  questions: Question[];
}

export interface Chapter {
  id: string;
  title: string;
  screens: Screen[];
}

export type FormAnswers = {
  [key: string]: string | string[];
};
