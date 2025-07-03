"use client";

import { useQuizStore } from "@/store/quizStore";
import Instructions from "./instructions";

export default function page() {
  const quiz = useQuizStore((s) => s.quiz);

  return <Instructions quiz={quiz} />;
}
