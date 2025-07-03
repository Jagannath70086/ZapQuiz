import {
  Clock,
  BookOpen,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Target,
} from "lucide-react";

export default function Instructions({ quiz }) {
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
  console.log(quiz);
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
            {/* <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-amber-700 dark:text-yellow-400">
                {quiz.questions.length}
              </div>
              <div className="text-sm text-amber-600 dark:text-amber-300">
                Questions
              </div>
            </div> */}

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
                  <strong>Read each question carefully</strong> before selecting
                  your answer. Take your time to understand what's being asked.
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
                      complete the quiz. The timer will start when you begin and
                      cannot be paused.
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
                    Partial credit may be awarded for multiple-choice questions.
                  </div>
                </div>
              )}

              {quiz.allowRetake && (
                <div className="flex items-start gap-3 p-4 bg-green-100/30 dark:bg-green-900/20 rounded-xl">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    You can <strong>retake this quiz</strong> multiple times if
                    needed. Your highest score will be recorded.
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
