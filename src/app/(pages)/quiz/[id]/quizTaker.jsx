"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  User,
  Target,
  Calendar,
  Home,
} from "lucide-react";
import { startQuizDb } from "@/actions/quizLoader";

export default function QuizPage({ myQuiz }) {
  const [quiz] = useState(myQuiz);

  const [currentPhase, setCurrentPhase] = useState("instructions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));

  useEffect(() => {
    let timer;
    if (currentPhase === "quiz" && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentPhase, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

  const startQuiz = () => {
    setCurrentPhase("quiz");
    setQuizStartTime(new Date());
    setVisitedQuestions(new Set([0]));
    startQuizDb(quiz.id);
  };

  const handleAnswerChange = (questionId, selectedOptions) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptions,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setVisitedQuestions((prev) => new Set([...prev, nextIndex]));
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => new Set([...prev, index]));
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentPhase("results");
    setShowResults(true);
    setIsSubmitting(false);
  };

  const calculateResults = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question.id] || [];
      const correctAnswers = question.correct;

      if (correctAnswers.length > 1) {
        const correctSelected = userAnswer.filter((ans) =>
          correctAnswers.includes(ans)
        );
        const incorrectSelected = userAnswer.filter(
          (ans) => !correctAnswers.includes(ans)
        );
        const partialScore = Math.max(
          0,
          (correctSelected.length - incorrectSelected.length) /
            correctAnswers.length
        );
        earnedPoints += partialScore * question.points;
      } else {
        if (
          userAnswer.length === correctAnswers.length &&
          userAnswer.every((ans) => correctAnswers.includes(ans))
        ) {
          earnedPoints += question.points;
        }
      }
    });

    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const passed = quiz.passScore ? percentage >= quiz.passScore : null;

    return { totalPoints, earnedPoints, percentage, passed };
  };

  const restartQuiz = () => {
    setCurrentPhase("instructions");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(quiz.timeLimit * 60);
    setQuizStartTime(null);
    setShowResults(false);
    setVisitedQuestions(new Set([0]));
  };

  const getQuestionStatus = (questionIndex) => {
    const question = quiz.questions[questionIndex];
    const hasAnswer = answers[question.id] && answers[question.id].length > 0;
    const isVisited = visitedQuestions.has(questionIndex);

    if (hasAnswer) return "answered";
    if (isVisited) return "visited";
    return "unvisited";
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const results = showResults ? calculateResults() : null;
  const answeredCount = Object.keys(answers).filter(
    (id) => answers[id] && answers[id].length > 0
  ).length;

  if (currentPhase === "instructions") {
    return (
      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 dark:from-orange-950 dark:via-yellow-900 dark:to-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={() => window.history.back()}
            className="mb-6 flex items-center gap-2 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Quizzes</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              {quiz.title}
            </h1>
            <p className="text-lg text-amber-800/80 dark:text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
              {quiz.description}
            </p>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/20 to-white/10 dark:from-orange-900/40 dark:via-orange-800/30 dark:to-yellow-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-3xl p-8 shadow-2xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {quiz.questions.length}
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-300">
                  Questions
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {quiz.timeLimit ? `${quiz.timeLimit}m` : "No Limit"}
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-300">
                  Time Limit
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {quiz.passScore ? `${quiz.passScore}%` : "N/A"}
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-300">
                  Pass Score
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {quiz.allowRetake ? "Yes" : "No"}
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-300">
                  Retake
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-8">
              <span
                className={`px-6 py-3 text-sm font-semibold rounded-full border shadow-lg ${getDifficultyColor(
                  quiz.difficulty
                )}`}
              >
                Difficulty: {quiz.difficulty}
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-700 dark:text-yellow-400 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Instructions
              </h2>

              <div className="space-y-4 text-amber-800 dark:text-amber-200">
                <div className="flex items-start gap-3 p-4 bg-amber-100/30 dark:bg-amber-900/20 rounded-xl">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <strong>Read each question carefully</strong> before
                    selecting your answer. Take your time to understand what's
                    being asked.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-100/30 dark:bg-amber-900/20 rounded-xl">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    {quiz.timeLimit ? (
                      <>
                        You have <strong>{quiz.timeLimit} minutes</strong> to
                        complete the quiz. The timer will start when you begin
                        and cannot be paused.
                      </>
                    ) : (
                      <>
                        There is <strong>no time limit</strong> for this quiz.
                        Take your time to think through each question.
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-100/30 dark:bg-amber-900/20 rounded-xl">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    Some questions may have{" "}
                    <strong>multiple correct answers</strong>. Select all that
                    apply. Questions with multiple answers will use checkboxes.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-100/30 dark:bg-amber-900/20 rounded-xl">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    4
                  </div>
                  <div>
                    You can navigate between questions using the{" "}
                    <strong>Previous</strong> and <strong>Next</strong> buttons,
                    or click on question numbers directly.
                  </div>
                </div>

                {quiz.passScore && (
                  <div className="flex items-start gap-3 p-4 bg-amber-100/30 dark:bg-amber-900/20 rounded-xl">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                      5
                    </div>
                    <div>
                      You need to score at least{" "}
                      <strong>{quiz.passScore}%</strong> to pass this quiz.
                      Partial credit may be awarded for multiple-choice
                      questions.
                    </div>
                  </div>
                )}

                {quiz.allowRetake && (
                  <div className="flex items-start gap-3 p-4 bg-green-100/30 dark:bg-green-900/20 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      You can <strong>retake this quiz</strong> multiple times
                      if needed. Your highest score will be recorded.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={startQuiz}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-amber-400/50 transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105"
              >
                Start Quiz
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="md:hidden h-8"></div>
        </div>
      </div>
    );
  }

  if (currentPhase === "quiz") {
    return (
      <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 dark:from-orange-950 dark:via-yellow-900 dark:to-amber-900">
        <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 backdrop-blur-xl bg-white/20 dark:bg-orange-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-amber-200/30 dark:border-amber-700/30 shadow-lg">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-bold text-amber-700 dark:text-yellow-400 truncate">
                  {quiz.title}
                </h1>
                <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-300">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}{" "}
                  • {answeredCount} answered
                </p>
              </div>
            </div>
            {quiz.timeLimit && (
              <div className="flex items-center gap-2 text-amber-700 dark:text-yellow-400 bg-amber-100/50 dark:bg-amber-900/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-lg font-mono font-bold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 sm:gap-6">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="backdrop-blur-xl bg-white/20 dark:bg-orange-900/30 rounded-2xl p-6 border border-amber-200/30 dark:border-amber-700/30 shadow-lg sticky top-6">
                <h3 className="text-lg font-semibold text-amber-700 dark:text-yellow-400 mb-4">
                  Questions
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.questions.map((_, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <button
                        key={index}
                        onClick={() => goToQuestion(index)}
                        className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
                          index === currentQuestionIndex
                            ? "bg-amber-500 text-white shadow-lg"
                            : status === "answered"
                            ? "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300/50"
                            : status === "visited"
                            ? "bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-300/50"
                            : "bg-amber-100/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 border border-amber-300/50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 space-y-2 text-xs text-amber-600 dark:text-amber-300">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500/20 border border-green-300/50 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500/20 border border-orange-300/50 rounded"></div>
                    <span>Visited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-100/50 dark:bg-amber-900/30 border border-amber-300/50 rounded"></div>
                    <span>Not visited</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                    Progress
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                    {Math.round(
                      ((currentQuestionIndex + 1) / quiz.questions.length) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="bg-amber-200/30 dark:bg-amber-900/30 rounded-full h-2 sm:h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / quiz.questions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="lg:hidden mb-4 sm:mb-6">
                <div className="backdrop-blur-xl bg-white/20 dark:bg-orange-900/30 rounded-xl p-3 sm:p-4 border border-amber-200/30 dark:border-amber-700/30 shadow-lg">
                  <h3 className="text-sm font-semibold text-amber-700 dark:text-yellow-400 mb-3">
                    Questions
                  </h3>
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 sm:gap-2">
                    {quiz.questions.map((_, index) => {
                      const status = getQuestionStatus(index);
                      return (
                        <button
                          key={index}
                          onClick={() => goToQuestion(index)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
                            index === currentQuestionIndex
                              ? "bg-amber-500 text-white shadow-lg"
                              : status === "answered"
                              ? "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300/50"
                              : status === "visited"
                              ? "bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-300/50"
                              : "bg-amber-100/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 border border-amber-300/50"
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/20 to-white/10 dark:from-orange-900/40 dark:via-orange-800/30 dark:to-yellow-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                      {currentQuestionIndex + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-amber-900 dark:text-yellow-200 leading-relaxed mb-2">
                        {currentQuestion.text}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                          {currentQuestion.points} point
                          {currentQuestion.points !== 1 ? "s" : ""}
                        </span>
                        {currentQuestion.correct.length > 1 && (
                          <span className="px-2 py-1 bg-amber-100/50 dark:bg-amber-900/30 rounded-full text-xs font-medium">
                            Multiple answers
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected =
                      answers[currentQuestion.id]?.includes(option) || false;
                    const isMultipleChoice = currentQuestion.correct.length > 1;

                    return (
                      <label
                        key={index}
                        className={`block p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.01] ${
                          isSelected
                            ? "border-amber-400 bg-amber-100/50 dark:bg-amber-900/30 shadow-lg"
                            : "border-amber-200/50 dark:border-amber-700/50 hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-900/20"
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              isMultipleChoice ? "rounded-lg" : "rounded-full"
                            } border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                              isSelected
                                ? "border-amber-500 bg-amber-500"
                                : "border-amber-300 dark:border-amber-600"
                            }`}
                          >
                            {isSelected && (
                              <div
                                className={`${
                                  isMultipleChoice
                                    ? "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm"
                                    : "w-2 h-2 rounded-full"
                                } bg-white`}
                              ></div>
                            )}
                          </div>
                          <span className="text-amber-900 dark:text-amber-100 font-medium flex-1 text-sm sm:text-base break-words">
                            {option}
                          </span>
                        </div>
                        <input
                          type={isMultipleChoice ? "checkbox" : "radio"}
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={isSelected}
                          onChange={(e) => {
                            const currentAnswers =
                              answers[currentQuestion.id] || [];
                            let newAnswers;

                            if (isMultipleChoice) {
                              if (e.target.checked) {
                                newAnswers = [...currentAnswers, option];
                              } else {
                                newAnswers = currentAnswers.filter(
                                  (ans) => ans !== option
                                );
                              }
                            } else {
                              newAnswers = e.target.checked ? [option] : [];
                            }

                            handleAnswerChange(currentQuestion.id, newAnswers);
                          }}
                          className="sr-only"
                        />
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center gap-2 sm:gap-4">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amber-200/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 flex items-center gap-1 sm:gap-2"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  <div className="text-center px-2">
                    <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                      {answeredCount} of {quiz.questions.length} answered
                    </p>
                  </div>

                  {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-1 sm:gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="hidden sm:inline">
                            Submitting...
                          </span>
                          <span className="sm:hidden">...</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Submit Quiz</span>
                          <span className="sm:hidden">Submit</span>
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-1 sm:gap-2"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">Next</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="md:hidden h-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 dark:from-orange-950 dark:via-yellow-900 dark:to-amber-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-yellow-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-orange-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="relative inline-block mb-3 sm:mb-4 md:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl">
              {results.passed === null ? (
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              ) : results.passed ? (
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              ) : (
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              )}
            </div>
            <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-amber-400/30 animate-pulse"></div>
            <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-orange-400/20 animate-ping"></div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-700 dark:text-yellow-400 mb-2 sm:mb-3 md:mb-4">
            Quiz Completed!
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-600 dark:text-amber-300 max-w-2xl mx-auto px-2 sm:px-4">
            {results.passed === null
              ? "Great job completing the quiz! Here are your results."
              : results.passed
              ? "🎉 Congratulations! You've successfully passed the quiz!"
              : "Don't worry! Learning is a journey - review the explanations and try again!"}
          </p>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/20 to-white/10 dark:from-orange-900/40 dark:via-orange-800/30 dark:to-yellow-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl mb-4 sm:mb-6 md:mb-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="relative inline-block">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-amber-700 dark:text-yellow-400 mb-1 sm:mb-2">
                {results.percentage}%
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-bounce"></div>
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-600 dark:text-amber-300 mb-3 sm:mb-4">
              {results.earnedPoints.toFixed(1)} out of {results.totalPoints}{" "}
              points
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
              <div className="bg-amber-100/30 dark:bg-amber-900/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {Math.round(
                    (results.earnedPoints / results.totalPoints) * 100
                  )}
                  %
                </div>
                <div className="text-xs sm:text-sm text-amber-600 dark:text-amber-300">
                  Accuracy
                </div>
              </div>
              <div className="bg-amber-100/30 dark:bg-amber-900/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {answeredCount}/{quiz.questions.length}
                </div>
                <div className="text-xs sm:text-sm text-amber-600 dark:text-amber-300">
                  Answered
                </div>
              </div>
              <div className="bg-amber-100/30 dark:bg-amber-900/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-amber-700 dark:text-yellow-400">
                  {quizStartTime
                    ? Math.ceil((new Date() - quizStartTime) / 60000)
                    : 0}
                  m
                </div>
                <div className="text-xs sm:text-sm text-amber-600 dark:text-amber-300">
                  Time Taken
                </div>
              </div>
            </div>

            {quiz.passScore && (
              <div
                className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-semibold shadow-lg ${
                  results.passed
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                }`}
              >
                {results.passed ? (
                  <>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span className="hidden sm:inline">PASSED</span>
                    <span className="sm:hidden">PASS</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span className="hidden sm:inline">FAILED</span>
                    <span className="sm:hidden">FAIL</span>
                  </>
                )}
                <span className="text-white/80 text-xs sm:text-sm md:text-base">
                  (Required: {quiz.passScore}%)
                </span>
              </div>
            )}
          </div>

          {quiz.showCorrectAnswers && (
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-700 dark:text-yellow-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">Review Your Answers</span>
                  <span className="sm:hidden">Review</span>
                </h3>
                <div className="text-xs sm:text-sm text-amber-600 dark:text-amber-300">
                  {
                    quiz.questions.filter((q, i) => {
                      const userAnswer = answers[q.id] || [];
                      return (
                        userAnswer.length === q.correct.length &&
                        userAnswer.every((ans) => q.correct.includes(ans))
                      );
                    }).length
                  }{" "}
                  correct out of {quiz.questions.length}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {quiz.questions.map((question, index) => {
                  const userAnswer = answers[question.id] || [];
                  const isCorrect =
                    userAnswer.length === question.correct.length &&
                    userAnswer.every((ans) => question.correct.includes(ans));

                  let partialScore = 0;
                  if (question.correct.length > 1) {
                    const correctSelected = userAnswer.filter((ans) =>
                      question.correct.includes(ans)
                    );
                    const incorrectSelected = userAnswer.filter(
                      (ans) => !question.correct.includes(ans)
                    );
                    partialScore = Math.max(
                      0,
                      (correctSelected.length - incorrectSelected.length) /
                        question.correct.length
                    );
                  }

                  return (
                    <div
                      key={question.id}
                      className="border border-amber-200/30 dark:border-amber-700/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-white/10 dark:bg-amber-900/10"
                    >
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base flex-shrink-0 ${
                            isCorrect
                              ? "bg-green-500"
                              : partialScore > 0
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {isCorrect ? "✓" : partialScore > 0 ? "~" : "✗"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
                            <h4 className="font-semibold text-amber-900 dark:text-yellow-200 text-sm sm:text-base md:text-lg leading-snug">
                              {index + 1}. {question.text}
                            </h4>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                                {isCorrect
                                  ? question.points
                                  : Math.round(
                                      partialScore * question.points
                                    )}{" "}
                                / {question.points} pts
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <div className="bg-amber-50/50 dark:bg-amber-900/20 rounded-lg p-2 sm:p-3">
                              <span className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                                Your answer:{" "}
                              </span>
                              <span
                                className={`text-xs sm:text-sm break-words ${
                                  isCorrect
                                    ? "text-green-700 dark:text-green-300"
                                    : partialScore > 0
                                    ? "text-yellow-700 dark:text-yellow-300"
                                    : "text-red-700 dark:text-red-300"
                                }`}
                              >
                                {userAnswer.length > 0
                                  ? userAnswer.join(", ")
                                  : "No answer provided"}
                              </span>
                            </div>

                            <div className="bg-green-50/50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                              <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                                Correct answer:{" "}
                              </span>
                              <span className="text-xs sm:text-sm text-green-800 dark:text-green-200 break-words">
                                {question.correct.join(", ")}
                              </span>
                            </div>

                            {question.explanation && (
                              <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3">
                                <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                                  Explanation:{" "}
                                </span>
                                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 mt-1 leading-relaxed">
                                  {question.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mt-4 sm:mt-6 md:mt-8">
            {quiz.allowRetake && (
              <button
                onClick={restartQuiz}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/50 transform hover:scale-105 text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Retake Quiz</span>
                <span className="sm:hidden">Retake</span>
              </button>
            )}

            <button
              onClick={() => window.history.back()}
              className="bg-amber-200/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to Quizzes</span>
              <span className="sm:hidden">Back</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-blue-500/20 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-500/30 dark:hover:bg-blue-900/50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Print Results</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 dark:from-orange-900/30 dark:via-orange-800/20 dark:to-yellow-900/10 border border-amber-200/20 dark:border-amber-700/20 rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg">
            <p className="text-amber-700 dark:text-amber-300 text-sm sm:text-base md:text-lg italic leading-relaxed">
              {results.passed === null
                ? "Knowledge is power. Keep learning and growing!"
                : results.passed
                ? "Excellence is not a destination, it's a continuous journey. Well done!"
                : "Every expert was once a beginner. Keep practicing and you'll get there!"}
            </p>
          </div>
        </div>
      </div>
      <div className="md:hidden h-18"></div>
    </div>
  );
}
