import { VocabWord } from "./words";

export type QuestionOption = {
  id: string;
  label: string;
  isCorrect: boolean;
  sourceWordId: string;
};

export type Question = {
  id: string;
  word: VocabWord;
  options: QuestionOption[];
};

export type Response = {
  questionId: string;
  word: string;
  selectedOptionId: string | null;
  selectedDefinition: string | null;
  correctDefinition: string;
  isCorrect: boolean;
  difficulty: VocabWord["difficulty"];
  timeSpentMs: number;
  pointsDelta: number;
  streakAfter: number;
  hintsUsed: 0 | 1 | 2;
};
