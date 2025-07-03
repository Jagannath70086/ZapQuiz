import Link from "next/link";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900 px-4">
        <div className="w-full max-w-md bg-white/90 dark:bg-orange-900/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-orange-500/20 p-8 text-center border border-orange-100 dark:border-orange-700">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Check your inbox
          </h2>
          <p className="text-orange-700 dark:text-orange-200 mb-6">
            We've sent a password reset link to{" "}
            <span className="font-medium">{"email"}</span>. Please check your
            email and follow the instructions to reset your password.
          </p>
          <p className="text-orange-600 dark:text-orange-300 text-sm mb-6">
            If you don't see the email in your inbox, please check your spam
            folder.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-orange-300/30 dark:focus:ring-orange-500/40 text-center shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              Return to Login
            </Link>
            <button className="block w-full py-3 px-4 rounded-xl bg-white/80 dark:bg-orange-800/50 text-orange-700 dark:text-orange-200 font-semibold border border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-800/70 focus:outline-none focus:ring-4 focus:ring-orange-300/30 dark:focus:ring-orange-500/40 text-center transition-all duration-300 hover:scale-105">
              Resend email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 mb-4 shadow-lg shadow-orange-500/30">
            <span className="text-white text-xl font-bold">Q</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Forgot Password
          </h1>
          <p className="text-orange-700 dark:text-orange-200 mt-2 text-lg">
            Enter your email and we'll send you a reset link
          </p>
          <div className="mt-6 text-orange-800 dark:text-orange-200 bg-orange-100/80 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-600 rounded-xl px-4 py-4 flex items-center justify-center text-sm backdrop-blur-sm">
            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 text-orange-600 dark:text-orange-400" />
            <span className="font-medium">
              Password reset via email is not supported yet. Please create a new
              account.
            </span>
          </div>
        </div>

        {/* <form className="bg-white/90 dark:bg-orange-900/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-orange-500/20 p-6 md:p-8 border border-orange-100 dark:border-orange-700">
          {false && (
            <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-600 dark:text-red-400 text-sm">
                {"error"}
              </p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-800 dark:text-orange-200"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-orange-400 dark:text-orange-300">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-200 dark:border-orange-600 focus:border-orange-400 dark:focus:border-orange-400 bg-white/80 dark:bg-orange-800/50 focus:ring-4 focus:ring-orange-300/30 dark:focus:ring-orange-500/30 outline-none transition-all duration-300 text-gray-800 dark:text-white placeholder-orange-400 dark:placeholder-orange-300"
                  placeholder="youremail@example.com"
                  required
                />
              </div>
            </div>

            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-orange-300/30 dark:focus:ring-orange-500/40 flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105">
              Send Reset Link
            </button>
          </div>
        </form> */}

        <div className="text-center mt-8">
          <p className="text-orange-700 dark:text-orange-200 text-lg">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-orange-600 dark:text-yellow-400 font-semibold hover:text-orange-700 dark:hover:text-yellow-300 transition-colors duration-200 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
