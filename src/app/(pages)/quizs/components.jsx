"use client";

import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "next/navigation";

export function TakeQuizButton({ quiz }) {
  const router = useRouter();
  const setQuiz = useQuizStore((s) => s.setQuiz);

  function handleClick() {
    setQuiz(quiz);
    router.push("/instructions");
  }
  return (
    <button
      onClick={handleClick}
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
    </button>
  );
}
