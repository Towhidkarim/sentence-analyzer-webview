import { VocabWord } from "./words";
import { Question, QuestionOption } from "./types";
import { CHOICES_PER_QUESTION } from "./constants";

export const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const buildQuestionForWord = (
  word: VocabWord,
  words: VocabWord[],
  idOverride?: string,
): Question => {
  const distractorPool = shuffle(
    words.filter((candidate) => candidate.id !== word.id),
  );

  const distractors = distractorPool
    .slice(0, CHOICES_PER_QUESTION - 1)
    .map<QuestionOption>((distractor, index) => ({
      id: `${word.id}-distractor-${index}`,
      label: distractor.definition,
      isCorrect: false,
      sourceWordId: distractor.id,
    }));

  const correctOption: QuestionOption = {
    id: `${word.id}-correct`,
    label: word.definition,
    isCorrect: true,
    sourceWordId: word.id,
  };

  return {
    id: idOverride ?? word.id,
    word,
    options: shuffle([correctOption, ...distractors]),
  };
};

export const buildQuestions = (words: VocabWord[]): Question[] => {
  const shuffledWords = shuffle(words);
  return shuffledWords
    .slice(0, 10)
    .map((word) => buildQuestionForWord(word, words));
};
