import { create } from "zustand";

export const useQuizStore = create((set) => ({
  quiz: null,

  setQuiz: (quizData) => set({ quiz: { ...quizData } }),
}));
