import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 dark:bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-400/15 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-400/10 dark:bg-amber-400/10 rounded-full blur-3xl" />

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Diagonal Lines for added texture */}
        <div className="absolute inset-0 opacity-5 dark:opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 50px, #f59e0b 50px, #f59e0b 52px)",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium z-10 relative transition-colors duration-200 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      {children}
    </div>
  );
}
