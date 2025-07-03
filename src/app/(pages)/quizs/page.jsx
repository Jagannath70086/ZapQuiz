import { loadPreviewQuiz } from "@/actions/quizLoader";
import Link from "next/link";
import React from "react";

export default async function QuizViewer() {
  const { quiz, success, errors } = await loadPreviewQuiz();

  if (!success) {
    console.error("Failed to load quiz:", errors);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-orange-950 dark:via-yellow-900 dark:to-amber-900">
        <div className="backdrop-blur-xl bg-white/30 dark:bg-orange-900/40 border border-amber-200/50 dark:border-amber-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="text-center text-red-500 dark:text-red-400 flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            Error loading quiz
          </div>
        </div>
      </div>
    );
  }

  const categorized = quiz.reduce((acc, q) => {
    acc[q.category] = acc[q.category] || [];
    acc[q.category].push(q);
    return acc;
  }, {});

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500/20 text-green-800 dark:text-green-300 border-green-300/50";
      case "medium":
        return "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 border-yellow-300/50";
      case "hard":
        return "bg-red-500/20 text-red-800 dark:text-red-300 border-red-300/50";
      default:
        return "bg-gray-500/20 text-gray-800 dark:text-gray-300 border-gray-300/50";
    }
  };

  const formatTimeLimit = (minutes) => {
    if (!minutes) return "No time limit";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 dark:from-orange-950 dark:via-yellow-900 dark:to-amber-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Explore Quizzes
          </h1>
          <p className="text-lg text-amber-800/80 dark:text-amber-200/80 max-w-2xl mx-auto">
            Challenge yourself with our curated collection of quizzes across
            various topics and difficulty levels
          </p>
        </div>

        {Object.entries(categorized).map(([category, quizzes]) => (
          <div key={category} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
              <h2 className="text-3xl font-bold text-amber-700 dark:text-yellow-400 px-6 py-2 backdrop-blur-md bg-white/20 dark:bg-orange-900/30 rounded-full border border-amber-200/30 dark:border-amber-700/30">
                {category}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {quizzes.map((q) => (
                <div
                  key={q.id}
                  className="group relative backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/20 to-white/10 dark:from-orange-900/40 dark:via-orange-800/30 dark:to-yellow-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-300/30 dark:hover:shadow-orange-400/20 hover:scale-[1.02]"
                >
                  {q.allowRetake && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Retakable
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-3 text-amber-900 dark:text-yellow-200 leading-tight">
                    {q.title}
                  </h3>

                  <p className="text-sm text-amber-800/80 dark:text-amber-200/80 mb-4 line-clamp-3 leading-relaxed">
                    {q.description}
                  </p>

                  {q.tags && q.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {q.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full border border-amber-200/50 dark:border-amber-700/50"
                        >
                          #{tag}
                        </span>
                      ))}
                      {q.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100/30 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full border border-amber-200/30 dark:border-amber-700/30">
                          +{q.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between gap-2">
                      {q.difficulty && (
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(
                            q.difficulty
                          )}`}
                        >
                          {q.difficulty}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formatTimeLimit(q.timeLimit)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {q.totalAttempts !== null && (
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          {q.totalAttempts} attempts
                        </div>
                      )}
                      {q.averageScore !== null && (
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          {q.averageScore?.toFixed(1)}% avg
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/quiz/${q.id}`}
                    className="block w-full text-center bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform group-hover:scale-105"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start Quiz
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center py-8">
          <div className="backdrop-blur-md bg-white/20 dark:bg-orange-900/30 rounded-2xl p-6 border border-amber-200/30 dark:border-amber-700/30 inline-block">
            <p className="text-amber-800/80 dark:text-amber-200/80">
              Found{" "}
              <span className="font-bold text-amber-700 dark:text-yellow-400">
                {quiz.length}
              </span>{" "}
              quizzes across{" "}
              <span className="font-bold text-amber-700 dark:text-yellow-400">
                {Object.keys(categorized).length}
              </span>{" "}
              categories
            </p>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
}
