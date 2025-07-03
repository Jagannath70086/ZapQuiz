"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { db } from "./db";

export async function getFullUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
}
