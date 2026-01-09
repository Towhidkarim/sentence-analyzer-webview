import { AnimatePresence, motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Question } from './types';
import { REQUIRED_STREAK } from './constants';
import { LeaderboardWidget } from './LeaderboardWidget';

type QuestionCardProps = {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isAnswerRevealed: boolean;
  eliminatedOptionId: string | null;
  hintSynonym: string | null;
  hintStep: 0 | 1 | 2;
  points: number;
  streak: number;
  maxStreak: number;
  hasMetRequiredStreak: boolean;
  correctAnswerLetter: string | null;
  finishGuardMessage: string | null;
  shouldShowSummaryCTA: boolean;
  onOptionSelect: (optionId: string) => void;
  onRevealSynonym: () => void;
  onEliminateOption: () => void;
  onSubmit: () => void;
  onNext: () => void;
};

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  isAnswerRevealed,
  eliminatedOptionId,
  hintSynonym,
  hintStep,
  points,
  streak,
  maxStreak,
  hasMetRequiredStreak,
  correctAnswerLetter,
  finishGuardMessage,
  shouldShowSummaryCTA,
  onOptionSelect,
  onRevealSynonym,
  onEliminateOption,
  onSubmit,
  onNext,
}: QuestionCardProps) {
  const scoreboardItems = [
    { label: 'Points', value: points },
    { label: 'Max', value: maxStreak },
  ];

  return (
    <motion.section
      key={question.id}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      className='relative flex flex-col w-full max-w-4xl overflow-hidden border shadow-xl rounded-3xl border-slate-200 bg-white/90 backdrop-blur h-[calc(100vh-4rem)] mt-8'
    >
      {correctAnswerLetter ? (
        <div className='absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#04693f33] bg-white/90 text-sm font-semibold lowercase text-[#035533] shadow-sm z-10'>
          {correctAnswerLetter.toLowerCase()}
        </div>
      ) : null}

      {/* Scrollable content area */}
      <div className='flex-1 p-4 pb-24 overflow-y-auto sm:p-6'>
        <header className='flex flex-col gap-3 mb-4'>
          {/* Compact stats row at the very top */}
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <LeaderboardWidget />
              <p className='text-xs tracking-wide uppercase text-slate-500'>
                Question {currentIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <AnimatePresence>
                {scoreboardItems.map((item) => (
                  <motion.div
                    key={`${item.label}-${item.value}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    className='rounded-lg border border-[#04693f1a] bg-[#f3faf6] px-2.5 py-1.5 flex flex-col-reverse'
                  >
                    <span className='text-[8px] tracking-wide uppercase text-slate-400'>
                      {item.label}
                    </span>
                    <span className='text-sm font-bold text-center text-slate-900'>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Animated milestoned streak progress bar */}
          <div className='relative'>
            <div className='w-full h-3 overflow-hidden rounded-full shadow-inner bg-gradient-to-r from-slate-100 to-slate-200'>
              <motion.div
                layout
                className='h-full rounded-full shadow-lg bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500'
                style={{
                  width: `${Math.min((streak / REQUIRED_STREAK) * 100, 100)}%`,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min((streak / REQUIRED_STREAK) * 100, 100)}%`,
                  boxShadow:
                    streak > 0
                      ? [
                          '0 0 0px rgba(251, 146, 60, 0.3)',
                          '0 0 20px rgba(251, 146, 60, 0.6)',
                          '0 0 0px rgba(251, 146, 60, 0.3)',
                        ]
                      : '0 0 0px rgba(251, 146, 60, 0)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 20,
                  boxShadow: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />
            </div>

            {/* Milestone markers */}
            <div className='absolute top-0 left-0 w-full h-3 flex items-center justify-between px-[2px]'>
              {Array.from({ length: REQUIRED_STREAK }).map((_, idx) => {
                const milestonePosition = ((idx + 1) / REQUIRED_STREAK) * 100;
                const isPassed = streak >= idx + 1;
                return (
                  <motion.div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      isPassed ? 'bg-white shadow-md' : 'bg-slate-300/60'
                    }`}
                    style={{
                      position: 'absolute',
                      left: `${milestonePosition}%`,
                      transform: 'translateX(-50%)',
                    }}
                    initial={{ scale: 0.5 }}
                    animate={{
                      scale: isPassed ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      scale: isPassed
                        ? {
                            duration: 0.5,
                            ease: 'easeOut',
                          }
                        : {},
                    }}
                  />
                );
              })}
            </div>

            <div className='flex items-center justify-between mt-1.5'>
              <p className='text-[10px] font-semibold text-amber-600'>
                Streak: {streak}/{REQUIRED_STREAK}
              </p>
              {hasMetRequiredStreak ? (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className='text-[10px] font-semibold text-emerald-600'
                >
                  ✓ Goal reached!
                </motion.p>
              ) : null}
            </div>
          </div>

          {/* Centered and prominent word display */}
          <div className='flex flex-col items-center justify-center gap-3 py-2'>
            <div className='flex items-center gap-3'>
              <h2 className='text-5xl font-bold tracking-tight text-center text-slate-900'>
                {question.word.word}
              </h2>
              {question.word.synonyms?.length && hintStep === 0 ? (
                <motion.button
                  type='button'
                  whileTap={{ scale: 0.95 }}
                  onClick={onRevealSynonym}
                  className='inline-flex items-center justify-center w-8 h-8 transition border rounded-full border-amber-300 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:border-amber-400'
                >
                  <Lightbulb className='w-4 h-4' />
                </motion.button>
              ) : null}
            </div>
            <div className='flex flex-row justify-center gap-2'>
              {question.word.partOfSpeech ? (
                <motion.span
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className='rounded-full bg-[#04693f1a] px-4 py-1.5 text-sm font-semibold text-[#035533]'
                >
                  {question.word.partOfSpeech}
                </motion.span>
              ) : null}
              {question.word.difficulty && (
                <motion.span
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className='rounded-full capitalize bg-[#1cea941a] px-4 py-1.5 text-sm font-semibold text-[#035533]'
                >
                  {question.word.difficulty} difficulty
                </motion.span>
              )}
            </div>

            {/* Hint Display Section */}
            <AnimatePresence>
              {hintSynonym && hintStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className='w-full p-3 mt-2 border rounded-lg shadow-sm border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50'
                >
                  <div className='flex items-start gap-2'>
                    <Lightbulb className='w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1.5'>
                        💡 Hint
                      </p>
                      <div className='space-y-2'>
                        <div>
                          <p className='text-[10px] font-semibold text-amber-600 mb-0.5'>
                            Synonym:
                          </p>
                          <p className='text-lg font-bold text-amber-900'>
                            {hintSynonym}
                          </p>
                          <p className='text-[10px] text-amber-600 mt-0.5'>
                            similar meaning to "{question.word.word}"
                          </p>
                        </div>
                        {question.word.example && (
                          <div>
                            <p className='text-[10px] font-semibold text-amber-600 mb-0.5'>
                              Example:
                            </p>
                            <p className='text-xs italic leading-relaxed text-amber-900'>
                              "{question.word.example}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className='flex flex-col gap-3 pb-2'>
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.isCorrect;
            const isEliminated =
              !isAnswerRevealed && option.id === eliminatedOptionId;

            const baseClasses =
              'w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition focus:outline-none';
            let stateClasses =
              'border-[#d3ded9] bg-white text-slate-700 hover:border-[#b7cbc1] hover:shadow-sm';

            if (isEliminated) {
              stateClasses =
                'border-dashed border-rose-200 bg-rose-50/70 text-slate-500 opacity-60 pointer-events-none';
            } else if (!isAnswerRevealed && isSelected) {
              stateClasses =
                'border-blue-300 bg-blue-50/60 text-blue-700 shadow-sm';
            }

            if (isAnswerRevealed) {
              if (isCorrectOption) {
                stateClasses =
                  'border-[#04693f] border-2 bg-gradient-to-r from-[#d4f1e3] to-[#e6f4ef] text-[#023b24] shadow-lg';
              } else if (isSelected) {
                stateClasses = 'border-rose-400 bg-rose-50 text-rose-700';
              } else {
                stateClasses = 'border-[#d3ded9] bg-[#f8faf9] text-slate-600';
              }
            }

            return (
              <motion.button
                key={option.id}
                type='button'
                layout
                initial={
                  isAnswerRevealed && isCorrectOption ? { scale: 0.98 } : {}
                }
                animate={
                  isAnswerRevealed && isCorrectOption ? { scale: 1 } : {}
                }
                transition={
                  isAnswerRevealed && isCorrectOption
                    ? { type: 'spring', stiffness: 200, damping: 15 }
                    : {}
                }
                whileHover={{
                  scale: isAnswerRevealed || isEliminated ? 1 : 1.01,
                }}
                whileTap={{
                  scale: isAnswerRevealed || isEliminated ? 1 : 0.99,
                }}
                onClick={() => onOptionSelect(option.id)}
                className={`${baseClasses} ${stateClasses} flex items-center justify-between gap-2`}
              >
                <span>{option.label}</span>
                {isAnswerRevealed && (
                  <span className='flex-shrink-0'>
                    {isCorrectOption ? (
                      <svg
                        className='w-5 h-5 text-[#04693f]'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2.5}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    ) : isSelected ? (
                      <svg
                        className='w-5 h-5 text-rose-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2.5}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    ) : null}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className='mt-3 text-xs text-center text-slate-500 sm:text-sm'>
          {isAnswerRevealed
            ? question.word.example
            : 'Choose the closest meaning to the highlighted word.'}
        </div>

        {finishGuardMessage ? (
          <p className='rounded-xl border border-[#04693f33] bg-[#f3faf6] px-3 py-2 text-xs font-semibold text-[#035533] mt-3'>
            {finishGuardMessage}
          </p>
        ) : null}
      </div>

      {/* Absolute positioned footer at bottom of card */}
      <footer className='absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 p-4 border-t shadow-lg border-slate-200 bg-white/95 backdrop-blur-sm sm:px-6'>
        <motion.button
          type='button'
          whileTap={{ scale: 0.97 }}
          onClick={onEliminateOption}
          disabled={hintStep < 1 || hintStep >= 2 || isAnswerRevealed}
          className='inline-flex items-center justify-center rounded-lg border border-[#04693f33] px-3 py-3 text-xs font-semibold text-[#035533] transition enabled:hover:border-[#04693f55] enabled:hover:text-[#023b24] disabled:cursor-not-allowed disabled:opacity-50'
        >
          {hintStep >= 2 ? 'Option eliminated' : 'Eliminate one option'}
        </motion.button>
        {isAnswerRevealed ? (
          <motion.button
            type='button'
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className='inline-flex items-center justify-center rounded-lg bg-[#04693f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#035533] flex-1 sm:flex-initial sm:min-w-[200px] w-1/2'
          >
            {shouldShowSummaryCTA ? 'View summary' : 'Next'}
          </motion.button>
        ) : (
          <motion.button
            type='button'
            whileTap={{ scale: 0.97 }}
            onClick={onSubmit}
            disabled={!selectedOption}
            className='inline-flex items-center justify-center rounded-lg bg-[#04693f] px-6 py-3 text-sm font-semibold text-white transition enabled:hover:bg-[#035533] disabled:cursor-not-allowed disabled:bg-[#9bb5aa] flex-1 sm:flex-initial sm:min-w-[200px] w-3/4'
          >
            Check answer
          </motion.button>
        )}
      </footer>
    </motion.section>
  );
}
