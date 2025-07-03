export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-orange-950 dark:to-yellow-900 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-amber-400/20 rounded-full blur-3xl top-1/4 left-1/3 animate-pulse" />

      <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />

        <p className="text-xl text-amber-700 dark:text-yellow-300 font-semibold animate-pulse">
          Loading quizzes...
        </p>
      </div>
    </div>
  );
}
