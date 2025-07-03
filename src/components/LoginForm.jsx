"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaGoogle, FaApple } from "react-icons/fa";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      });
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setErrors({ general: 'Invalid credentials' });
    } else {
      toast.success("Successfully signed in!", {
        duration: 3000,
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        },
      });
      router.push("/dashboard");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLoginProviders = [
    {
      name: "Google",
      icon: <FaGoogle className="mr-2 h-4 w-4" />,
      color: "bg-white",
      hoverColor: "hover:bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-orange-200",
      action: () => signIn("google"),
    },
    {
      name: "GitHub",
      icon: <FaGithub className="mr-2 h-4 w-4" />,
      color: "bg-orange-900",
      hoverColor: "hover:bg-orange-800",
      textColor: "text-white",
      borderColor: "border-orange-700",
      action: () => signIn("github"),
    },
    {
      name: "Apple",
      icon: <FaApple className="mr-2 h-4 w-4" />,
      color: "bg-black",
      hoverColor: "hover:bg-gray-900",
      textColor: "text-white",
      borderColor: "border-orange-800",
      action: () => signIn("apple"),
    },
  ];

  return (
    

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="mb-5 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-sm backdrop-blur-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-orange-100">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.email
                      ? "border-red-400 focus:ring-red-300/30 text-red-400"
                      : "border-orange-300/30 focus:border-yellow-400"
                  } bg-white/10 backdrop-blur-sm focus:ring-4 focus:ring-yellow-400/20 outline-none transition text-white placeholder-orange-200`}
                  placeholder="youremail@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-orange-100">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-yellow-300 hover:text-yellow-200 hover:underline transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${
                      errors.password
                        ? "border-red-400 focus:ring-red-300/30 text-red-400"
                        : "border-orange-300/30 focus:border-yellow-400"
                    } bg-white/10 backdrop-blur-sm focus:ring-4 focus:ring-yellow-400/20 outline-none transition pr-10 text-white placeholder-orange-200`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-yellow-300 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 ${
                  loading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:from-yellow-400 hover:to-orange-400"
                } text-white font-medium focus:outline-none focus:ring-4 focus:ring-yellow-400/20 flex items-center justify-center shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5`}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-300/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/10 backdrop-blur-sm text-orange-200">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {socialLoginProviders.map((provider) => (
                <button
                  key={provider.name}
                  onClick={provider.action}
                  className={`w-full flex items-center justify-center py-2.5 px-4 rounded-xl ${provider.color} ${provider.hoverColor} ${provider.textColor} text-sm font-medium border ${provider.borderColor} transition-all duration-300 shadow-lg hover:scale-105 hover:-translate-y-0.5`}
                >
                  {provider.icon}
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}