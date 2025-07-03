"use client";

import { useUserStore } from "@/store/userStore";

export function UserName() {
  const name = useUserStore((s) => s.user?.name);
  return (
    <span>
      {name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "John Doe"}
    </span>
  );
}

export function UserEmail() {
  const email = useUserStore((s) => s.user?.email);
  return <span>{email || "john.doe@example.com"}</span>;
}

export function UserBio() {
  const bio = useUserStore((s) => s.user?.bio);
  return bio ?? "Passionate learner and quiz enthusiast.";
}

export function UserPhone() {
  const phone = useUserStore((s) => s.user?.phone);
  return <span>{phone || "+91 9876541230"}</span>;
}

export function UserQuizzesCount() {
  const quizzes = useUserStore((s) => s.user?.quizzes);
  return <span>{quizzes?.length ?? 0}</span>;
}

export function UserAttemptStats() {
  const attempts = useUserStore((s) => s.user?.attempts);
  const total = attempts?.length ?? 0;

  const avgPercent =
    total > 0
      ? Math.round(
          attempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0) /
            total
        )
      : 0;

  return <span>{avgPercent}%</span>;
}

export function UserBadge() {
  const quizzes = useUserStore((s) => s.user?.quizzes);
  const count = quizzes?.length ?? 0;
  const badge = count > 25 ? "Master" : count < 10 ? "Beginner" : "Pro";
  return `Quiz ${badge}`;
}
