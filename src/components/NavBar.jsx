"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, Home, Zap, History, LogOut, Trophy } from "lucide-react";
import Modal from "./ui/modal";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function NavBar({ user }) {
  const pathname = usePathname();
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "quizs",
      label: "Quizs",
      icon: Zap,
      href: "/quizs",
    },
    { id: "history", label: "History", icon: History, href: "/history" },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      href: "/leaderboard",
    },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-orange-900/90 via-amber-900/90 to-yellow-900/90 border-b border-gradient-to-r from-orange-500/30 via-yellow-500/30 to-amber-500/30 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-12">
              <div className="flex items-center">
                <Link href="/dashboard">
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 group-hover:from-orange-300 group-hover:via-amber-300 group-hover:to-yellow-300 transition-all duration-300">
                      ZapQuiz
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="flex space-x-3">
                {navItems.map((item) => {
                  if (item.id === "profile") return null;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm group relative overflow-hidden ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-orange-500/40 via-amber-500/40 to-yellow-500/40 text-white border-2 border-orange-400/50 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40"
                          : "text-orange-200 hover:bg-gradient-to-r hover:from-orange-600/20 hover:via-amber-600/20 hover:to-yellow-600/20 hover:text-white hover:border-2 hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/20"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 mr-3 transition-all duration-300 ${
                          isActive(item.href)
                            ? "text-yellow-300"
                            : "text-orange-300 group-hover:text-white"
                        }`}
                      />
                      {item.label}
                      {isActive(item.href) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 animate-pulse rounded-2xl"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20 hover:border-2 hover:border-orange-400/30 transition-all duration-300 backdrop-blur-sm group hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105">
                <Bell className="h-6 w-6 text-orange-300 group-hover:text-yellow-300 transition-colors duration-300" />
              </button>
              <Link
                className="flex items-center space-x-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-700/60 via-amber-700/60 to-yellow-700/60 backdrop-blur-sm border-2 border-orange-500/40 hover:from-orange-600/70 hover:via-amber-600/70 hover:to-yellow-600/70 hover:border-orange-400/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:scale-105"
                href="/profile"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-white font-semibold">
                  {user.name || "User"}
                </span>
              </Link>
              <button
                onClick={() => setLogoutConfirmation(true)}
                className="p-3 rounded-2xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-rose-500/20 hover:border-2 hover:border-red-400/30 transition-all duration-300 backdrop-blur-sm text-red-400 hover:text-red-300 group hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
              >
                <LogOut className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden relative sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-orange-900/95 via-amber-900/95 to-yellow-900/95 border-b border-gradient-to-r from-orange-500/30 via-yellow-500/30 to-amber-500/30 shadow-2xl">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 group-hover:from-orange-300 group-hover:via-amber-300 group-hover:to-yellow-300 transition-all duration-300">
                ZapQuiz
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20 hover:border hover:border-orange-400/30 transition-all duration-300 group">
              <Bell className="h-5 w-5 text-orange-300 group-hover:text-yellow-300 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Navigation */}
      <div className="md:hidden fixed bottom-5 left-4 right-4 z-50">
        <div className="flex items-center justify-between mx-1">
          <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-orange-400/20 rounded-full shadow-xl px-3 py-2 w-[68vw]">
            {navItems.map((item) => {
              if (item.id == "quizs") return null;
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 group relative ${
                    isActive(item.href)
                      ? "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white shadow-xl scale-105"
                      : "text-orange-200 hover:text-white active:bg-orange-600/30"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-white"
                        : "text-orange-300 group-hover:text-yellow-200"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            key={"quizs"}
            href="/quizs"
            className={`flex flex-col items-center justify-center p-2.5 rounded-full backdrop-blur-xl border border-orange-400/30 shadow-xl transition-all duration-300 group ${
              isActive("/quizs")
                ? "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 scale-105 shadow-xl text-white"
                : "bg-slate-900/80 text-orange-300 hover:text-white"
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            {isActive("/quizs") && (
              <span className="absolute -inset-1 rounded-full border-2 border-yellow-400 animate-ping opacity-50" />
            )}
          </Link>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        show={logoutConfirmation}
        onClose={() => setLogoutConfirmation(false)}
      >
        <div className="backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-orange-400/10 shadow-2xl max-w-sm w-full">
          <div className="relative p-6 border-b border-orange-400/10 bg-gradient-to-r from-orange-600/10 via-amber-500/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Logout</h2>
              </div>
              <button
                onClick={() => setLogoutConfirmation(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Are you sure you want to{" "}
                <span className="text-white font-semibold bg-orange-500/10 px-2 py-1 rounded-lg">
                  Logout
                </span>
                ?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  await signOut();
                  toast.success("Logged out successfully!", {
                    duration: 3000,
                    style: {
                      background: "rgba(0, 0, 0, 0.8)",
                      color: "#fff",
                    },
                  });
                  setLogoutConfirmation(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
                Logout
              </button>
              <button
                onClick={() => {
                  setLogoutConfirmation(false);
                }}
                className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Stay
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
