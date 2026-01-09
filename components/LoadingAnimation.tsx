"use client";

import React from "react";

export function LoadingAnimation() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col items-center justify-center">
        {/* Animated Grammar Icons */}
        <div className="relative w-32 h-32 mb-8">
          {/* Central pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-[#65d5a3]/20 rounded-full animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#65d5a3] rounded-full flex items-center justify-center shadow-lg shadow-[#65d5a3]/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {/* Orbiting dots */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#65d5a3] rounded-full" />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s", animationDelay: "1s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#4bc48a] rounded-full" />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s", animationDelay: "2s" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3ab378] rounded-full" />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Analyzing your sentence...
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Breaking down grammar, identifying parts of speech, and generating
          insights
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#65d5a3] to-[#4bc48a] rounded-full animate-pulse"
            style={{
              animation: "loading 2s ease-in-out infinite",
              width: "60%",
            }}
          />
        </div>

        {/* Animated tips */}
        <div className="mt-8 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            <span className="w-2 h-2 bg-[#65d5a3] rounded-full" />
            <span>Identifying sentence structure...</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 80%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
