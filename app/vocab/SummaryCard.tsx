import { motion } from "framer-motion";
import { Response } from "./types";

type SummaryCardProps = {
  responses: Response[];
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  points: number;
  averageTimeSeconds: number;
  maxStreak: number;
  totalTimeSeconds: number;
  totalHintsUsed: number;
  onRestart: () => void;
};

const hintLevelText = ["No hints", "Similar word", "Similar + elimination"];

export function SummaryCard({
  responses,
  totalQuestions,
  correctCount,
  accuracy,
  points,
  averageTimeSeconds,
  maxStreak,
  totalTimeSeconds,
  totalHintsUsed,
  onRestart,
}: SummaryCardProps) {
  return (
    <motion.section
      key="summary"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative flex flex-col w-full h-full max-w-4xl gap-4 p-4 overflow-hidden border shadow-xl rounded-3xl border-slate-200 bg-white/90 backdrop-blur sm:p-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-slate-900">Test summary</h2>
        <p className="text-sm text-slate-500">
          You answered {correctCount} out of {totalQuestions} correctly (
          {accuracy}% accuracy).
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-4">
        <div className="rounded-2xl border border-[#04693f1f] bg-[#f3faf6] px-4 py-3">
          <p className="text-xs tracking-wide uppercase text-slate-500">
            Points
          </p>
          <p className="text-2xl font-semibold text-slate-900">{points}</p>
        </div>
        <div className="rounded-2xl border border-[#04693f1f] bg-[#f3faf6] px-4 py-3">
          <p className="text-xs tracking-wide uppercase text-slate-500">
            Accuracy
          </p>
          <p className="text-2xl font-semibold text-slate-900">{accuracy}%</p>
        </div>
        <div className="rounded-2xl border border-[#04693f1f] bg-[#f3faf6] px-4 py-3">
          <p className="text-xs tracking-wide uppercase text-slate-500">
            Avg. time
          </p>
          <p className="text-2xl font-semibold text-slate-900">
            {averageTimeSeconds}s
          </p>
        </div>
        <div className="rounded-2xl border border-[#04693f1f] bg-[#f3faf6] px-4 py-3">
          <p className="text-xs tracking-wide uppercase text-slate-500">
            Max streak
          </p>
          <p className="text-2xl font-semibold text-slate-900">{maxStreak}</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#04693f1f] bg-white px-4 py-3 shadow-sm">
          <p className="text-xs tracking-wide uppercase text-slate-500">
            Total time
          </p>
          <p className="text-xl font-semibold text-slate-900">
            {totalTimeSeconds}s
          </p>
        </div>
        <div className="rounded-2xl border border-[#04693f1f] bg-white px-4 py-3 shadow-sm">
          <p className="text-xs tracking-wide uppercase text-slate-500">
            Hints used
          </p>
          <p className="text-xl font-semibold text-slate-900">
            {totalHintsUsed}
          </p>
        </div>
      </div>

      <ul className="flex flex-col flex-1 gap-3 pr-1 overflow-y-auto">
        {responses.map((response) => {
          const statusColor = response.isCorrect
            ? "text-emerald-600"
            : "text-rose-600";
          const pointsLabel =
            response.pointsDelta > 0
              ? `+${response.pointsDelta}`
              : response.pointsDelta.toString();

          return (
            <motion.li
              key={response.questionId}
              layout
              className="p-3 border shadow-sm rounded-2xl border-slate-100 bg-white/90">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm tracking-wide uppercase text-slate-500">
                    {response.difficulty ?? "unrated"}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {response.word}
                  </h3>
                </div>
                <span className={`text-sm font-medium ${statusColor}`}>
                  {response.isCorrect ? "Correct" : "Reviewed"}
                </span>
              </div>

              <div className="grid gap-2 mt-3 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">
                    Correct meaning:
                  </span>{" "}
                  {response.correctDefinition}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">
                    Your choice:
                  </span>{" "}
                  {response.selectedDefinition ?? "Skipped"}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">
                    Points change:
                  </span>{" "}
                  {pointsLabel}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">
                    Hint level:
                  </span>{" "}
                  {hintLevelText[response.hintsUsed]}
                </p>
                <p className="text-xs text-slate-400">
                  Time on question:{" "}
                  {Math.round(response.timeSpentMs / 100) / 10}s
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex items-center justify-center rounded-lg bg-[#04693f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#035533]">
        Retake test
      </button>
    </motion.section>
  );
}
