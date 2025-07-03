"use client";

import React, { ChangeEvent, use, useEffect, useRef } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaGoogle, FaApple } from "react-icons/fa";

import { registerUser, socialLogin } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialFormState = {
  errors: {},
  success: false,
  message: "",
};

const passwordRequirements = [
  {
    id: "length",
    label: "8+ characters",
    test: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "1 uppercase",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "number",
    label: "1 number",
    test: (password) => /\d/.test(password),
  },
  {
    id: "special",
    label: "1 special char",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const socialLoginProvidersList = [
  {
    name: "Google",
    icon: <FaGoogle className="mr-2 h-4 w-4" />,
    color: "bg-white",
    hoverColor: "hover:bg-gray-50",
    textColor: "text-gray-800",
    borderColor: "border-orange-200",
    action: async () => {
      await socialLogin("google");
    },
  },
  {
    name: "GitHub",
    icon: <FaGithub className="mr-2 h-4 w-4" />,
    color: "bg-gray-800",
    hoverColor: "hover:bg-gray-900",
    textColor: "text-white",
    borderColor: "border-gray-700",
    action: async () => {
      await socialLogin("github");
    },
  },
  {
    name: "Apple",
    icon: <FaApple className="mr-2 h-4 w-4" />,
    color: "bg-black",
    hoverColor: "hover:bg-gray-900",
    textColor: "text-white",
    borderColor: "border-black",
    action: async () => {
      await socialLogin("apple");
    },
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 ${
        pending ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:from-yellow-400 hover:to-orange-400"
      } text-white font-semibold focus:outline-none focus:ring-4 focus:ring-orange-300/50 flex items-center justify-center shadow-xl shadow-orange-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:-translate-y-0.5`}
    >
      {pending ? (
        <>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
          Creating Account...
        </>
      ) : (
        <>
          Create Account
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </>
      )}
    </button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useFormState(registerUser, initialFormState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  const errors = state?.errors || {};

  const isFirstRender = useRef(true);

  const validatePasswordRequirement = (requirement) => {
    return requirement.test(password);
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        duration: 5000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 500);
    }
  }, [state.success, state.message]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (state) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [state]);

  return (
      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-6 md:p-8 border border-white/20">
          

          <form action={formAction} className="">
            {state?.message && !state.success && (
              <div className="mb-5 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-200 text-sm">
                {state.message}
              </div>
            )}
            {state?.success && state.message && (
              <div className="mb-5 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl text-green-200 text-sm">
                {state.message}
              </div>
            )}
            {errors.general && !state.message && (
              <div className="mb-5 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-200 text-sm">
                {errors.general}
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-orange-100"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-orange-300">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      errors.name
                        ? "border-red-400 focus:ring-red-300/50 text-red-200 bg-red-500/10"
                        : "border-orange-300/30 focus:border-yellow-400/50 bg-white/10"
                    } backdrop-blur-sm focus:ring-4 focus:ring-orange-300/20 outline-none transition text-white placeholder-orange-300/70`}
                    placeholder="John Doe"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                </div>
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-orange-100"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-orange-300">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      errors.email
                        ? "border-red-400 focus:ring-red-300/50 text-red-200 bg-red-500/10"
                        : "border-orange-300/30 focus:border-yellow-400/50 bg-white/10"
                    } backdrop-blur-sm focus:ring-4 focus:ring-orange-300/20 outline-none transition text-white placeholder-orange-300/70`}
                    placeholder="youremail@example.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2 text-orange-100"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-orange-300">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                      errors.password
                        ? "border-red-400 focus:ring-red-300/50 text-red-200 bg-red-500/10"
                        : "border-orange-300/30 focus:border-yellow-400/50 bg-white/10"
                    } backdrop-blur-sm focus:ring-4 focus:ring-orange-300/20 outline-none transition text-white placeholder-orange-300/70`}
                    placeholder="••••••••"
                    aria-describedby={
                      errors.password
                        ? "password-error"
                        : "password-requirements-info"
                    }
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-yellow-300 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.password[0]}
                  </p>
                )}
                <div
                  id="password-requirements-info"
                  className="mt-3 grid grid-cols-2 gap-2"
                >
                  {passwordRequirements.map((req) => {
                    const isValid = validatePasswordRequirement(req);
                    return (
                      <div key={req.id} className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 transition-colors duration-200 ${
                            isValid
                              ? "bg-green-500/30 border border-green-400/50"
                              : "bg-orange-500/20 border border-orange-400/30"
                          }`}
                        >
                          <CheckIcon
                            className={`h-3 w-3 transition-colors duration-200 ${
                              isValid
                                ? "text-green-300"
                                : "text-orange-400"
                            }`}
                          />
                        </div>
                        <span
                          className={`transition-colors duration-200 ${
                            isValid
                              ? "text-green-300"
                              : "text-orange-300"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2 text-orange-100"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-orange-300">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                      errors.confirmPassword ||
                      (confirmPassword && password && !passwordsMatch)
                        ? "border-red-400 focus:ring-red-300/50 bg-red-500/10"
                        : passwordsMatch && confirmPassword
                        ? "border-green-400/50 focus:ring-green-300/20 bg-green-500/10"
                        : "border-orange-300/30 focus:border-yellow-400/50 bg-white/10"
                    } backdrop-blur-sm focus:ring-4 ${
                      passwordsMatch && confirmPassword
                        ? "focus:ring-green-300/20"
                        : "focus:ring-orange-300/20"
                    } outline-none transition text-white placeholder-orange-300/70`}
                    placeholder="••••••••"
                    aria-describedby={
                      errors.confirmPassword ? "confirmPassword-error" : undefined
                    }
                    aria-invalid={
                      !!errors.confirmPassword ||
                      (confirmPassword && password && !passwordsMatch)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-yellow-300 transition-colors"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.confirmPassword[0]}
                  </p>
                )}
                {confirmPassword && password && (
                  <div className="mt-2">
                    {passwordsMatch ? (
                      <p className="text-sm text-green-300 flex items-center">
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Passwords match
                      </p>
                    ) : (
                      <p className="text-sm text-red-300">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 border-orange-300/50 bg-white/10 rounded focus:ring-orange-400/50 focus:ring-2"
                    aria-describedby={errors.terms ? "terms-error" : undefined}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="text-orange-200"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-yellow-300 hover:text-yellow-200 hover:underline font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-yellow-300 hover:text-yellow-200 hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              {errors.terms && (
                <p
                  id="terms-error"
                  className="mt-1 text-sm text-red-300"
                >
                  {errors.terms[0]}
                </p>
              )}

              <SubmitButton />
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
              {socialLoginProvidersList.map((provider) => (
                <form
                  action={provider.action}
                  key={provider.name}
                  className="w-full"
                >
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-xl ${provider.color} ${provider.hoverColor} ${provider.textColor} text-sm font-medium border ${provider.borderColor} transition-all duration-300 shadow-lg hover:scale-105`}
                  >
                    {provider.icon}
                    {provider.name}
                  </button>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}