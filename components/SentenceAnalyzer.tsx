'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AnalysisDisplay } from './AnalysisDisplay';
import { LoadingAnimation } from './LoadingAnimation';
import type { AnalysisResponse } from './types';

// const ANALYZE_URL = 'https://temp-server-u0iz.onrender.com/analyze-sentence';
const ANALYZE_URL = 'http://localhost:5000/analyze-sentence';

async function analyzeSentence(sentence: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(ANALYZE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze sentence. Please try again.');
    }

    const data = await response.json();

    // Validate that we got some analysis back
    if (!data || (!data.analysis && !data.success)) {
      throw new Error('Invalid response from server. Please try again.');
    }
    console;
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to the server. Please check your connection.'
      );
    }
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred. Please try again.');
  }
}

export function SentenceAnalyzer() {
  const [sentence, setSentence] = useState('');

  const mutation = useMutation({
    mutationFn: analyzeSentence,
  });

  const handleAnalyze = () => {
    if (sentence.trim()) {
      mutation.mutate(sentence);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const handleRetry = () => {
    if (sentence.trim()) {
      mutation.mutate(sentence);
    }
  };

  return (
    <div className='min-h-screen bg-green-50/20 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-6xl px-4 py-8 mx-auto'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-[#65d5a3] to-[#4bc48a] bg-clip-text text-transparent mb-3'>
            Sentence Analyzer
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Enter a sentence to get a detailed grammatical analysis
          </p>
        </div>

        {/* Input Section */}
        <div className='p-6 mb-8 bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700'>
          <div className='space-y-4'>
            <div className='relative'>
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type your sentence here...'
                className='w-full h-28 px-5 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#65d5a3] focus:ring-4 focus:ring-[#65d5a3]/20 outline-none transition-all duration-200 resize-none bg-gray-50 dark:bg-gray-700 dark:text-white placeholder-gray-400'
                rows={3}
              />
              <div className='absolute text-sm text-gray-400 bottom-3 right-3'>
                Press Enter to analyze
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!sentence.trim() || mutation.isPending}
              className='w-full py-4 px-6 bg-gradient-to-r from-[#65d5a3] to-[#4bc48a] text-white font-semibold text-lg rounded-xl hover:from-[#5ac996] hover:to-[#40b87e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3'
            >
              {mutation.isPending ? (
                <>
                  <svg className='w-5 h-5 animate-spin' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                  Analyze Sentence
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {mutation.isPending && <LoadingAnimation />}

        {/* Error State */}
        {mutation.isError && (
          <div className='p-6 mb-8 border border-red-200 bg-red-50 dark:bg-red-900/30 dark:border-red-800 rounded-2xl'>
            <div className='flex items-start gap-4'>
              <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-100 rounded-full dark:bg-red-800'>
                <svg
                  className='w-6 h-6 text-red-600 dark:text-red-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-red-800 dark:text-red-200'>
                  An error occurred
                </h3>
                <p className='mt-1 text-red-600 dark:text-red-300'>
                  {mutation.error?.message ||
                    'Something went wrong. Please try again.'}
                </p>
                <button
                  onClick={handleRetry}
                  className='flex items-center gap-2 px-6 py-2 mt-4 font-medium text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700'
                >
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
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {mutation.isSuccess && mutation.data?.analysis && (
          <AnalysisDisplay analysis={mutation.data.analysis} />
        )}
      </div>
    </div>
  );
}
