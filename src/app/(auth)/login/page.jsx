import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { Brain } from "lucide-react";

export default function Login() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 mb-6 shadow-lg shadow-orange-500/30">
            <Brain className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-600 dark:text-orange-200 text-lg">
            Sign in to continue your learning journey
          </p>
        </div>

        <div className="flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/15 to-red-400/15 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      </div>
        <LoginForm />
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-600 dark:text-orange-200 text-lg">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-orange-600 dark:text-yellow-400 font-semibold hover:text-orange-700 dark:hover:text-yellow-300 transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}