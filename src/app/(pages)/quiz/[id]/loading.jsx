export default function QuizLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-orange-950 dark:to-yellow-900 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-orange-400/20 rounded-full blur-3xl top-1/4 left-1/3 animate-pulse" />

      <div className="relative z-10 max-w-3xl w-full mx-auto p-6 rounded-2xl shadow-lg backdrop-blur-md bg-white/20 dark:bg-orange-900/30 border border-amber-200 dark:border-amber-700">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 bg-amber-300/50 rounded-md" />

          <div className="h-4 w-full bg-amber-200/50 rounded-md" />
          <div className="h-4 w-5/6 bg-amber-200/40 rounded-md" />

          <div className="border-b border-amber-300 my-4" />

          <div className="space-y-3">
            {[1, 2].map((q) => (
              <div key={q} className="space-y-2">
                <div className="h-4 w-3/4 bg-amber-100/60 rounded-md" />
                <div className="flex gap-2">
                  <div className="h-4 w-1/4 bg-amber-100/40 rounded-md" />
                  <div className="h-4 w-1/4 bg-amber-100/40 rounded-md" />
                  <div className="h-4 w-1/4 bg-amber-100/40 rounded-md" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-10 w-32 bg-amber-400/50 rounded-lg mt-6" />
        </div>
      </div>
    </div>
  );
}
