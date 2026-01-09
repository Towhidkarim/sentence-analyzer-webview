"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { VOCAB_WORDS } from "./words";
import { Question, Response } from "./types";
import {
  BASE_POINTS,
  STREAK_BONUS,
  PENALTY_BASE,
  PENALTY_PER_STREAK,
  REQUIRED_STREAK,
} from "./constants";
import { buildQuestions, buildQuestionForWord } from "./utils";
import { SummaryCard } from "./SummaryCard";
import { QuestionCard } from "./QuestionCard";

export function VocabTestClient() {
  const [questions, setQuestions] = useState<Question[]>(() =>
    buildQuestions(VOCAB_WORDS),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [quizStartTime, setQuizStartTime] = useState(() => Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [quizDurationMs, setQuizDurationMs] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hintStepsByQuestion, setHintStepsByQuestion] = useState<
    Record<string, 0 | 1 | 2>
  >({});
  const [hintSynonymsByQuestion, setHintSynonymsByQuestion] = useState<
    Record<string, string | null>
  >({});
  const [eliminatedOptionsByQuestion, setEliminatedOptionsByQuestion] =
    useState<Record<string, string | null>>({});
  const [pendingReviewWordIds, setPendingReviewWordIds] = useState<string[]>(
    [],
  );
  const [finishGuardMessage, setFinishGuardMessage] = useState<string | null>(
    null,
  );
  const [
    hasAttemptedSummaryWithoutStreak,
    setHasAttemptedSummaryWithoutStreak,
  ] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentQuestionId = currentQuestion?.id ?? null;
  const hintStep = currentQuestionId
    ? (hintStepsByQuestion[currentQuestionId] ?? 0)
    : 0;
  const hintSynonym = currentQuestionId
    ? (hintSynonymsByQuestion[currentQuestionId] ?? null)
    : null;
  const eliminatedOptionId = currentQuestionId
    ? (eliminatedOptionsByQuestion[currentQuestionId] ?? null)
    : null;

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  useEffect(() => {
    if (eliminatedOptionId && selectedOption === eliminatedOptionId) {
      setSelectedOption(null);
    }
  }, [eliminatedOptionId, selectedOption]);

  const totalQuestions = questions.length;
  const correctCount = useMemo(
    () => responses.filter((response) => response.isCorrect).length,
    [responses],
  );
  const accuracy = totalQuestions
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  const averageTimeSeconds = useMemo(() => {
    if (!responses.length) {
      return 0;
    }

    const totalMs = responses.reduce(
      (total, response) => total + response.timeSpentMs,
      0,
    );
    return Math.round(totalMs / responses.length / 100) / 10;
  }, [responses]);

  const totalHintsUsed = useMemo(
    () => responses.reduce((sum, response) => sum + response.hintsUsed, 0),
    [responses],
  );

  const handleOptionSelect = (optionId: string) => {
    if (isAnswerRevealed || optionId === eliminatedOptionId) {
      return;
    }
    setSelectedOption(optionId);
  };

  const handleRevealSynonym = () => {
    if (!currentQuestion || !currentQuestionId) {
      return;
    }

    const synonyms = currentQuestion.word.synonyms ?? [];
    if (!synonyms.length) {
      return;
    }

    const existingHint = hintSynonymsByQuestion[currentQuestionId];
    const chosenSynonym =
      existingHint ?? synonyms[Math.floor(Math.random() * synonyms.length)];

    setHintSynonymsByQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: chosenSynonym,
    }));

    setHintStepsByQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: Math.max(prev[currentQuestionId] ?? 0, 1) as
        | 0
        | 1
        | 2,
    }));
  };

  const handleEliminateOption = () => {
    if (!currentQuestion || !currentQuestionId) {
      return;
    }

    const incorrectOptions = currentQuestion.options.filter(
      (option) => !option.isCorrect && option.id !== eliminatedOptionId,
    );

    if (!incorrectOptions.length) {
      return;
    }

    const chosenOption =
      incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

    setEliminatedOptionsByQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: chosenOption.id,
    }));

    if (selectedOption === chosenOption.id) {
      setSelectedOption(null);
    }

    setHintStepsByQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: 2,
    }));
  };

  const handleSubmit = () => {
    if (!currentQuestion || !selectedOption) {
      return;
    }

    const chosenOption = currentQuestion.options.find(
      (option) => option.id === selectedOption,
    );

    if (!chosenOption) {
      return;
    }

    const existingResponse = responses.find(
      (response) => response.questionId === currentQuestion.id,
    );

    const timeSpentMs = Date.now() - questionStartTime;
    const hintsUsed = hintStepsByQuestion[currentQuestion.id] ?? 0;

    let pointsDelta = 0;
    let streakAfter = chosenOption.isCorrect ? streak + 1 : 0;

    if (!existingResponse) {
      if (chosenOption.isCorrect) {
        const updatedStreak = streak + 1;
        const earned = BASE_POINTS + updatedStreak * STREAK_BONUS;
        pointsDelta = earned;
        streakAfter = updatedStreak;
        setPoints((prev) => prev + earned);
        setStreak(updatedStreak);
        setMaxStreak((prev) => Math.max(prev, updatedStreak));
        setPendingReviewWordIds((prev) =>
          prev.filter((id) => id !== currentQuestion.word.id),
        );
        setFinishGuardMessage(null);
      } else {
        const penalty = PENALTY_BASE + streak * PENALTY_PER_STREAK;
        pointsDelta = -penalty;
        streakAfter = 0;
        setPoints((prev) => Math.max(0, prev - penalty));
        setStreak(0);
        setPendingReviewWordIds((prev) =>
          prev.includes(currentQuestion.word.id)
            ? prev
            : [...prev, currentQuestion.word.id],
        );
      }
    } else {
      pointsDelta = existingResponse.pointsDelta;
      streakAfter = existingResponse.streakAfter;
      if (chosenOption.isCorrect) {
        setPendingReviewWordIds((prev) =>
          prev.filter((id) => id !== currentQuestion.word.id),
        );
        setFinishGuardMessage(null);
      }
    }

    setIsAnswerRevealed(true);
    setResponses((prev) => {
      const responsePayload: Response = {
        questionId: currentQuestion.id,
        word: currentQuestion.word.word,
        selectedOptionId: chosenOption.id,
        selectedDefinition: chosenOption.label,
        correctDefinition: currentQuestion.word.definition,
        isCorrect: chosenOption.isCorrect,
        difficulty: currentQuestion.word.difficulty,
        timeSpentMs,
        pointsDelta,
        streakAfter,
        hintsUsed,
      };

      const existingIndex = prev.findIndex(
        (response) => response.questionId === currentQuestion.id,
      );

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = responsePayload;
        return next;
      }

      return [...prev, responsePayload];
    });
  };

  const handleNext = () => {
    if (!currentQuestion) {
      return;
    }

    const isLastQuestion = currentIndex + 1 >= totalQuestions;

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setFinishGuardMessage(null);
      return;
    }

    if (hasMetRequiredStreak) {
      setQuizDurationMs(Date.now() - quizStartTime);
      setIsSummaryVisible(true);
      setFinishGuardMessage(null);
      setHasAttemptedSummaryWithoutStreak(false);
      return;
    }

    const pendingWordId = pendingReviewWordIds[0];
    setHasAttemptedSummaryWithoutStreak(true);
    const appended = appendReviewQuestion(pendingWordId);

    if (!appended) {
      appendReviewQuestion();
    }
  };

  const handleRestart = () => {
    setQuestions(buildQuestions(VOCAB_WORDS));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setResponses([]);
    setIsSummaryVisible(false);
    const restartTime = Date.now();
    setQuizStartTime(restartTime);
    setQuestionStartTime(restartTime);
    setQuizDurationMs(null);
    setPoints(0);
    setStreak(0);
    setMaxStreak(0);
    setHintStepsByQuestion({});
    setHintSynonymsByQuestion({});
    setEliminatedOptionsByQuestion({});
    setPendingReviewWordIds([]);
    setFinishGuardMessage(null);
    setHasAttemptedSummaryWithoutStreak(false);
  };

  useEffect(() => {
    if (isSummaryVisible && !responses.length) {
      setIsSummaryVisible(false);
    }
  }, [isSummaryVisible, responses]);

  if (!currentQuestion && !isSummaryVisible) {
    return null;
  }

  const progress = totalQuestions
    ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
    : 0;
  const quizTotalMs = quizDurationMs ?? Date.now() - quizStartTime;
  const totalTimeSeconds = Math.round(quizTotalMs / 100) / 10;
  const hasMetRequiredStreak = maxStreak >= REQUIRED_STREAK;
  const correctAnswerLetter = useMemo(() => {
    if (!currentQuestion) {
      return null;
    }
    const correctIndex = currentQuestion.options.findIndex(
      (option) => option.isCorrect,
    );
    return correctIndex >= 0 ? String.fromCharCode(65 + correctIndex) : null;
  }, [currentQuestion]);
  const isLastQuestion = currentQuestion
    ? currentIndex + 1 === totalQuestions
    : false;
  const shouldShowSummaryCTA =
    isLastQuestion &&
    (hasMetRequiredStreak || !hasAttemptedSummaryWithoutStreak);

  const appendReviewQuestion = (wordId?: string): boolean => {
    const fromPending = wordId
      ? VOCAB_WORDS.find((word) => word.id === wordId)
      : undefined;
    const fallbackWord =
      fromPending ??
      VOCAB_WORDS[Math.floor(Math.random() * VOCAB_WORDS.length)];

    if (!fallbackWord) {
      return false;
    }

    const retryQuestion = buildQuestionForWord(
      fallbackWord,
      VOCAB_WORDS,
      `${fallbackWord.id}-retry-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 6)}`,
    );

    setQuestions((prev) => [...prev, retryQuestion]);
    setPendingReviewWordIds((prev) =>
      prev.filter((id) => id !== fallbackWord.id),
    );
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setCurrentIndex((prev) => prev + 1);
    setQuestionStartTime(Date.now());
    setFinishGuardMessage(
      `Reach a streak of ${REQUIRED_STREAK} to finish. Keep going!`,
    );
    return true;
  };

  return (
    <div className="flex items-stretch justify-center w-full h-full px-3 py-4 -translate-y-5 sm:px-6 sm:pb-6">
      <AnimatePresence mode="wait">
        {isSummaryVisible ? (
          <SummaryCard
            responses={responses}
            totalQuestions={totalQuestions}
            correctCount={correctCount}
            accuracy={accuracy}
            points={points}
            averageTimeSeconds={averageTimeSeconds}
            maxStreak={maxStreak}
            totalTimeSeconds={totalTimeSeconds}
            totalHintsUsed={totalHintsUsed}
            onRestart={handleRestart}
          />
        ) : currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            selectedOption={selectedOption}
            isAnswerRevealed={isAnswerRevealed}
            eliminatedOptionId={eliminatedOptionId}
            hintSynonym={hintSynonym}
            hintStep={hintStep}
            points={points}
            streak={streak}
            maxStreak={maxStreak}
            hasMetRequiredStreak={hasMetRequiredStreak}
            correctAnswerLetter={correctAnswerLetter}
            finishGuardMessage={finishGuardMessage}
            shouldShowSummaryCTA={shouldShowSummaryCTA}
            onOptionSelect={handleOptionSelect}
            onRevealSynonym={handleRevealSynonym}
            onEliminateOption={handleEliminateOption}
            onSubmit={handleSubmit}
            onNext={handleNext}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
