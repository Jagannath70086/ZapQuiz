"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export function AppInit({ user }) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  return null;
}
