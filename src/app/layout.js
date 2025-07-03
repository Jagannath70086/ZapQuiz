import { Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getFullUser } from "@/lib/getFullUser";
import { AppInit } from "@/components/AppInit";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZapQuiz",
  description: "A quiz application",
};

export default async function RootLayout({ children }) {
  const user = await getFullUser();
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased`}>
        <AppInit user={user} />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
