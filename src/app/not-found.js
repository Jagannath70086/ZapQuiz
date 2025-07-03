"use client";

import Link from "next/link";
import { Home, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

function Error({ statusCode }) {
  const getErrorMessage = () => {
    if (statusCode === 404) {
      return {
        title: "Page Not Found",
        description: "The page you're looking for doesn't exist or has been moved.",
        code: "404",
      };
    } else if (statusCode === 500) {
      return {
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later.",
        code: "500",
      };
    } else if (statusCode === 403) {
      return {
        title: "Access Forbidden",
        description: "You don't have permission to access this resource.",
        code: "403",
      };
    } else {
      return {
        title: "Something Went Wrong",
        description: "An unexpected error occurred. Please try again.",
        code: statusCode || "Error",
      };
    }
  };

  const errorInfo = getErrorMessage();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-amber-100 dark:from-yellow-950 dark:via-orange-900 dark:to-amber-900 flex items-center justify-center relative overflow-hidden">
      {/* Bubbles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-orange-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl" />
      <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon Bubble */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-800 dark:to-yellow-800 flex items-center justify-center mb-6 mx-auto border border-orange-200 dark:border-orange-600">
                <AlertCircle className="h-16 w-16 text-orange-600 dark:text-yellow-300" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-yellow-950 rounded-full px-4 py-2 shadow-lg border border-yellow-300 dark:border-yellow-800">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-300 dark:to-yellow-300">
                  {errorInfo.code}
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 dark:from-orange-300 dark:to-yellow-300">
                {errorInfo.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-orange-900 dark:text-yellow-200 leading-relaxed max-w-lg mx-auto">
              {errorInfo.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:brightness-110 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all duration-300 min-w-[140px]"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <button
              onClick={handleRefresh}
              className="px-6 py-3 rounded-lg border cursor-pointer border-orange-300 dark:border-orange-600 bg-white/90 dark:bg-yellow-950 backdrop-blur-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-800/50 transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-lg border cursor-pointer border-orange-300 dark:border-orange-600 bg-white/90 dark:bg-yellow-950 backdrop-blur-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-800/50 transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>

          {/* Help Box */}
          <div className="bg-white/90 dark:bg-yellow-950 backdrop-blur-sm rounded-xl border border-orange-200 dark:border-amber-800 p-6 max-w-md mx-auto">
            <h3 className="font-semibold mb-2 text-orange-800 dark:text-yellow-300">Need Help?</h3>
            <p className="text-sm text-orange-900 dark:text-yellow-200 mb-4">
              If you continue to experience issues, please contact our support team.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link
                href="/support"
                className="text-orange-600 dark:text-yellow-400 hover:underline"
              >
                Contact Support
              </Link>
              <span className="w-1 h-1 rounded-full bg-orange-400 dark:bg-yellow-400"></span>
              <Link
                href="/help"
                className="text-orange-600 dark:text-yellow-400 hover:underline"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
