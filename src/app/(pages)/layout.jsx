import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import NavBar from "@/components/NavBar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-orange-950 dark:to-yellow-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <NavBar user={session.user} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
