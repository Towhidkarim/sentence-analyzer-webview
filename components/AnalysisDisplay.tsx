'use client';

import React from 'react';
import type { Analysis } from './types';

interface AnalysisProps {
  analysis: Analysis;
}

function SectionCard({
  title,
  icon,
  children,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}
    >
      <div className='bg-gradient-to-r from-[#65d5a3]/10 to-[#4bc48a]/10 dark:from-[#65d5a3]/20 dark:to-[#4bc48a]/20 px-5 py-4 border-b border-gray-100 dark:border-gray-700'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-[#65d5a3] rounded-lg flex items-center justify-center text-white'>
            {icon}
          </div>
          <h3 className='font-semibold text-gray-800 dark:text-white'>
            {title}
          </h3>
        </div>
      </div>
      <div className='p-5'>{children}</div>
    </div>
  );
}

function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'purple' | 'orange';
}) {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    success: 'bg-[#65d5a3]/20 text-[#3a9d6e] dark:text-[#65d5a3]',
    warning:
      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    purple:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    orange:
      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null) return null;
  return (
    <div className='flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0'>
      <span className='text-sm text-gray-500 dark:text-gray-400'>{label}</span>
      <span className='font-medium text-gray-800 capitalize dark:text-white'>
        {value}
      </span>
    </div>
  );
}

function DifficultyMeter({ score }: { score?: number }) {
  const actualScore = score ?? 0;
  const maxScore = 10;
  const percentage = (actualScore / maxScore) * 100;

  const getColor = () => {
    if (actualScore <= 3) return 'from-green-400 to-green-500';
    if (actualScore <= 6) return 'from-yellow-400 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  const getLabel = () => {
    if (actualScore <= 3) return 'Easy';
    if (actualScore <= 6) return 'Medium';
    return 'Hard';
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          Difficulty
        </span>
        <span className='text-lg font-bold text-gray-800 dark:text-white'>
          {actualScore}/10{' '}
          <span className='text-sm font-normal'>({getLabel()})</span>
        </span>
      </div>
      <div className='h-3 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700'>
        <div
          className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function AnalysisDisplay({ analysis }: AnalysisProps) {
  console.log(analysis);
  return (
    <div className='space-y-6 animate-fadeIn'>
      {/* Original Sentence Card */}
      <div className='bg-gradient-to-r from-[#65d5a3] to-[#4bc48a] rounded-2xl p-6 shadow-xl'>
        <div className='flex items-start gap-4'>
          <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl'>
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
              />
            </svg>
          </div>
          <div>
            <p className='mb-1 text-sm text-white/80'>Analyzed Sentence</p>
            <p className='text-xl font-medium leading-relaxed text-white'>
              &quot;{analysis?.original || 'N/A'}&quot;
            </p>
            {analysis?.hasErrors &&
              analysis?.corrected !== analysis?.original && (
                <div className='p-3 mt-3 rounded-lg bg-white/10'>
                  <p className='mb-1 text-sm text-white/80'>
                    Corrected Version
                  </p>
                  <p className='font-medium text-white'>
                    &quot;{analysis?.corrected}&quot;
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <div className='p-4 bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700'>
          <div className='text-3xl font-bold text-[#65d5a3] mb-1'>
            {analysis?.basicInfo?.wordCount ?? '-'}
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>Words</div>
        </div>
        <div className='p-4 bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700'>
          <div className='text-xl font-bold text-[#65d5a3] mb-1 capitalize'>
            {analysis?.basicInfo?.sentenceType || '-'}
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>Type</div>
        </div>
        <div className='p-4 bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700'>
          <div className='text-xl font-bold text-[#65d5a3] mb-1 capitalize'>
            {analysis?.basicInfo?.structure || '-'}
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Structure
          </div>
        </div>
        <div className='p-4 bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700'>
          <div className='text-xl font-bold text-[#65d5a3] mb-1 capitalize'>
            {analysis?.basicInfo?.complexityScore || '-'}
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>Level</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Basic Info */}
        <SectionCard
          title='Basic Information'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          }
        >
          <div className='space-y-1'>
            <InfoRow
              label='Sentence Type'
              value={analysis?.basicInfo?.sentenceType}
            />
            <InfoRow label='Structure' value={analysis?.basicInfo?.structure} />
            <InfoRow label='Mood' value={analysis?.basicInfo?.mood} />
            <InfoRow label='Voice' value={analysis?.basicInfo?.voice} />
            <InfoRow label='Tense' value={analysis?.basicInfo?.tense} />
          </div>
        </SectionCard>

        {/* Difficulty Rating */}
        <SectionCard
          title='Difficulty Rating'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
          }
        >
          <DifficultyMeter score={analysis?.difficultyRating?.score} />
          {analysis?.difficultyRating?.reasoning && (
            <p className='mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
              {analysis.difficultyRating.reasoning}
            </p>
          )}
        </SectionCard>

        {/* Grammatical Components */}
        <SectionCard
          title='Grammatical Components'
          className='md:col-span-2'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 10h16M4 14h16M4 18h16'
              />
            </svg>
          }
        >
          <div className='grid gap-6 md:grid-cols-2'>
            {analysis?.grammaticalComponents?.subject && (
              <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-3 h-3 bg-blue-500 rounded-full' />
                  <span className='font-semibold text-blue-700 dark:text-blue-400'>
                    Subject
                  </span>
                </div>
                <p className='font-medium text-gray-800 dark:text-white'>
                  &quot;{analysis.grammaticalComponents.subject?.text}&quot;
                </p>
                {analysis.grammaticalComponents.subject?.type && (
                  <Badge variant='info'>
                    {analysis.grammaticalComponents.subject.type}
                  </Badge>
                )}
              </div>
            )}

            {analysis?.grammaticalComponents?.predicate && (
              <div className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-3 h-3 bg-purple-500 rounded-full' />
                  <span className='font-semibold text-purple-700 dark:text-purple-400'>
                    Predicate
                  </span>
                </div>
                <p className='font-medium text-gray-800 dark:text-white'>
                  &quot;{analysis.grammaticalComponents.predicate?.text}&quot;
                </p>
                {analysis.grammaticalComponents.predicate?.mainVerb && (
                  <div className='mt-2 space-y-1 text-sm'>
                    <p className='text-gray-600 dark:text-gray-400'>
                      <span className='font-medium'>Main Verb:</span>{' '}
                      {analysis.grammaticalComponents.predicate.mainVerb}
                    </p>
                  </div>
                )}
              </div>
            )}

            {analysis?.grammaticalComponents?.object && (
              <div className='p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-3 h-3 bg-orange-500 rounded-full' />
                  <span className='font-semibold text-orange-700 dark:text-orange-400'>
                    Object
                  </span>
                </div>
                <p className='font-medium text-gray-800 dark:text-white'>
                  &quot;{analysis.grammaticalComponents.object}&quot;
                </p>
              </div>
            )}

            {analysis?.grammaticalComponents?.complement && (
              <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-xl'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-3 h-3 bg-green-500 rounded-full' />
                  <span className='font-semibold text-green-700 dark:text-green-400'>
                    Complement
                  </span>
                </div>
                <p className='font-medium text-gray-800 dark:text-white'>
                  &quot;{analysis.grammaticalComponents.complement}&quot;
                </p>
              </div>
            )}

            {(analysis?.grammaticalComponents?.modifiers?.length ?? 0) > 0 && (
              <div className='p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl md:col-span-2'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-3 h-3 bg-pink-500 rounded-full' />
                  <span className='font-semibold text-pink-700 dark:text-pink-400'>
                    Modifiers
                  </span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {analysis.grammaticalComponents?.modifiers?.map((mod, i) => (
                    <Badge key={i} variant='default'>
                      {mod}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Transformations */}
        <SectionCard
          title='Sentence Transformations'
          className='md:col-span-2'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
              />
            </svg>
          }
        >
          <div className='grid gap-4 md:grid-cols-2'>
            {analysis?.transformations?.negative && (
              <div className='p-4 border border-gray-200 rounded-lg dark:border-gray-600'>
                <p className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Negative Form
                </p>
                <p className='text-gray-800 dark:text-white'>
                  {analysis.transformations.negative}
                </p>
              </div>
            )}
            {analysis?.transformations?.question && (
              <div className='p-4 border border-gray-200 rounded-lg dark:border-gray-600'>
                <p className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Question Form
                </p>
                <p className='text-gray-800 dark:text-white'>
                  {analysis.transformations.question}
                </p>
              </div>
            )}
            {analysis?.transformations?.passive && (
              <div className='p-4 border border-gray-200 rounded-lg dark:border-gray-600'>
                <p className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Passive Voice
                </p>
                <p className='text-gray-800 dark:text-white'>
                  {analysis.transformations.passive}
                </p>
              </div>
            )}
            {analysis?.transformations?.active && (
              <div className='p-4 border border-gray-200 rounded-lg dark:border-gray-600'>
                <p className='mb-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Active Voice
                </p>
                <p className='text-gray-800 dark:text-white'>
                  {analysis.transformations.active}
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Parts of Speech */}
        <SectionCard
          title='Parts of Speech'
          className='md:col-span-2'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
              />
            </svg>
          }
        >
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {/* Nouns */}
            {(analysis?.wordsAnalysis?.nouns?.length ?? 0) > 0 && (
              <div className='space-y-2'>
                <h4 className='flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full' />
                  Nouns
                </h4>
                <div className='space-y-1'>
                  {analysis.wordsAnalysis?.nouns?.map((noun, i) => (
                    <div
                      key={i}
                      className='text-sm bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg'
                    >
                      <span className='font-medium text-gray-800 dark:text-white'>
                        {noun?.word}
                      </span>
                      {noun?.type && (
                        <span className='ml-2 text-xs text-blue-600 dark:text-blue-400'>
                          ({noun.type})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verbs */}
            {(analysis?.wordsAnalysis?.verbs?.length ?? 0) > 0 && (
              <div className='space-y-2'>
                <h4 className='flex items-center gap-2 font-semibold text-red-600 dark:text-red-400'>
                  <span className='w-2 h-2 bg-red-500 rounded-full' />
                  Verbs
                </h4>
                <div className='space-y-1'>
                  {analysis.wordsAnalysis?.verbs?.map((verb, i) => (
                    <div
                      key={i}
                      className='text-sm bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg font-medium text-gray-800 dark:text-white'
                    >
                      {verb}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Adjectives */}
            {((analysis?.wordsAnalysis?.adjectives?.positive?.length ?? 0) >
              0 ||
              (analysis?.wordsAnalysis?.adjectives?.comparative?.length ?? 0) >
                0 ||
              (analysis?.wordsAnalysis?.adjectives?.superlative?.length ?? 0) >
                0) && (
              <div className='space-y-2'>
                <h4 className='flex items-center gap-2 font-semibold text-green-600 dark:text-green-400'>
                  <span className='w-2 h-2 bg-green-500 rounded-full' />
                  Adjectives
                </h4>
                <div className='space-y-1'>
                  {analysis.wordsAnalysis?.adjectives?.positive?.map(
                    (adj, i) => (
                      <div
                        key={i}
                        className='text-sm bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg font-medium text-gray-800 dark:text-white'
                      >
                        {adj}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Prepositions */}
            {(analysis?.wordsAnalysis?.prepositions?.length ?? 0) > 0 && (
              <div className='space-y-2'>
                <h4 className='flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full' />
                  Prepositions
                </h4>
                <div className='space-y-1'>
                  {analysis.wordsAnalysis?.prepositions?.map((prep, i) => (
                    <div
                      key={i}
                      className='text-sm bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg font-medium text-gray-800 dark:text-white'
                    >
                      {prep}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Adverbs */}
            {(analysis?.wordsAnalysis?.adverbs?.length ?? 0) > 0 && (
              <div className='space-y-2'>
                <h4 className='flex items-center gap-2 font-semibold text-yellow-600 dark:text-yellow-400'>
                  <span className='w-2 h-2 bg-yellow-500 rounded-full' />
                  Adverbs
                </h4>
                <div className='space-y-1'>
                  {analysis.wordsAnalysis?.adverbs?.map((adv, i) => (
                    <div
                      key={i}
                      className='text-sm bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-lg font-medium text-gray-800 dark:text-white'
                    >
                      {adv}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pronouns */}
            {(analysis?.wordsAnalysis?.pronouns?.length ?? 0) > 0 && (
              <div className='space-y-2'>
                <h4 className='flex items-center gap-2 font-semibold text-pink-600 dark:text-pink-400'>
                  <span className='w-2 h-2 bg-pink-500 rounded-full' />
                  Pronouns
                </h4>
                <div className='space-y-1'>
                  {analysis.wordsAnalysis?.pronouns?.map((pron, i) => (
                    <div
                      key={i}
                      className='text-sm bg-pink-50 dark:bg-pink-900/20 px-3 py-1.5 rounded-lg font-medium text-gray-800 dark:text-white'
                    >
                      {pron}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Phrases */}
        <SectionCard
          title='Phrases'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              />
            </svg>
          }
        >
          <div className='space-y-4'>
            {(analysis?.phrases?.noun?.length ?? 0) > 0 && (
              <div>
                <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Noun Phrases
                </p>
                <div className='flex flex-wrap gap-2'>
                  {analysis.phrases?.noun?.map((phrase, i) => (
                    <Badge key={i} variant='info'>
                      {phrase}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(analysis?.phrases?.verb?.length ?? 0) > 0 && (
              <div>
                <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Verb Phrases
                </p>
                <div className='flex flex-wrap gap-2'>
                  {analysis.phrases?.verb?.map((phrase, i) => (
                    <Badge key={i} variant='purple'>
                      {phrase}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(analysis?.phrases?.prepositional?.length ?? 0) > 0 && (
              <div>
                <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Prepositional Phrases
                </p>
                <div className='flex flex-wrap gap-2'>
                  {analysis.phrases?.prepositional?.map((phrase, i) => (
                    <Badge key={i} variant='orange'>
                      {phrase}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Clauses */}
        <SectionCard
          title='Clauses'
          icon={
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          }
        >
          <div className='space-y-4'>
            {/* {(analysis?.clauses?.independent?.length ?? 0) > 0 && (
              <div>
                <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Independent Clauses
                </p>
                <div className='space-y-2'>
                  {analysis.clauses?.independent?.map((clause, i) => (
                    <div
                      key={i}
                      className='bg-[#65d5a3]/10 dark:bg-[#65d5a3]/20 border border-[#65d5a3]/30 rounded-lg px-4 py-2 text-gray-800 dark:text-white'
                    >
                      {clause}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(analysis?.clauses?.dependent?.length ?? 0) > 0 && (
              <div>
                <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Dependent Clauses
                </p>
                <div className='space-y-2'>
                  {analysis.clauses?.dependent?.map((clause, i) => (
                    <div
                      key={i}
                      className='px-4 py-2 text-gray-800 border rounded-lg bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 dark:text-white'
                    >
                      {clause}
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </SectionCard>

        {/* Errors */}
        {(analysis?.errors?.length ?? 0) > 0 && (
          <SectionCard
            title='Errors Found'
            className='md:col-span-2'
            icon={
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            }
          >
            <div className='space-y-2'>
              {analysis.errors?.map((error, i) => (
                <div
                  key={i}
                  className='flex items-start gap-3 px-4 py-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800'
                >
                  <span className='text-red-500'>⚠️</span>
                  <div className='flex-1'>
                    {error.type && (
                      <div className='mb-1 text-xs font-semibold text-red-600 uppercase dark:text-red-400'>
                        {error.type}
                      </div>
                    )}
                    {error.issue && (
                      <div className='mb-1 text-red-700 dark:text-red-300'>
                        {error.issue}
                      </div>
                    )}
                    {error.suggestion && (
                      <div className='text-sm text-red-600 dark:text-red-400'>
                        💡 {error.suggestion}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Learning Tips */}
        {(analysis?.learningTips?.length ?? 0) > 0 && (
          <SectionCard
            title='Learning Tips'
            icon={
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                />
              </svg>
            }
          >
            <div className='space-y-3'>
              {analysis.learningTips?.map((tip, i) => (
                <div
                  key={i}
                  className='flex items-start gap-3 px-4 py-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20'
                >
                  <span className='text-lg text-yellow-500'>💡</span>
                  <span className='text-gray-700 dark:text-gray-300'>
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Improvements */}
        {(analysis?.improvements?.length ?? 0) > 0 && (
          <SectionCard
            title='Suggestions for Improvement'
            icon={
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                />
              </svg>
            }
          >
            <div className='space-y-3'>
              {analysis.improvements?.map((improvement, i) => (
                <div
                  key={i}
                  className='flex items-start gap-3 bg-[#65d5a3]/10 dark:bg-[#65d5a3]/20 rounded-lg px-4 py-3'
                >
                  <span className='text-[#65d5a3] text-lg'>✨</span>
                  <span className='text-gray-700 dark:text-gray-300'>
                    {improvement}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Key Grammar Concepts */}
        {(analysis?.keyGrammarConcepts?.length ?? 0) > 0 && (
          <SectionCard
            title='Key Grammar Concepts'
            className='md:col-span-2'
            icon={
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                />
              </svg>
            }
          >
            <div className='flex flex-wrap gap-3'>
              {analysis.keyGrammarConcepts?.map((concept, i) => (
                <div
                  key={i}
                  className='bg-gradient-to-r from-[#65d5a3]/20 to-[#4bc48a]/20 border border-[#65d5a3]/40 rounded-full px-5 py-2 text-[#3a9d6e] dark:text-[#65d5a3] font-medium'
                >
                  {concept}
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
