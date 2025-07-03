import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ProfilePage from "./profile";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    <ProfilePage mainUser={session.user}/>
  );
}