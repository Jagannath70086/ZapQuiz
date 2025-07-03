"use client";

import { createContext, useState } from "react";

export const QuizContext = createContext(null);

function Context({ children }) {
  const [quizs, setQuiz] = useState([]);

  return (
    <QuizContext.Provider value={{ quizs, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export default Context;
