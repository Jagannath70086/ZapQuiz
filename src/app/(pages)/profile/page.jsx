import {
  ChangePasswordButton,
  DeleteAccountButton,
  EditProfileButton,
  LogoutButton,
  NotificationSettingsButton,
  ResetPasswordButton,
} from "./profile";
import {
  UserName,
  UserEmail,
  UserPhone,
  UserBio,
  UserQuizzesCount,
  UserAttemptStats,
  UserBadge,
} from "@/components/user/userDetails";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Lock,
  LogOut,
  Trash2,
  Camera,
  Bell,
  Key,
  Brain,
  Trophy,
} from "lucide-react";

export default async function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/8 to-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-orange-400/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center border border-orange-400/40 shadow-lg">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    Profile Settings
                  </h1>
                  <p className="text-orange-200 text-sm sm:text-base lg:text-lg mt-1">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-500/15 to-orange-500/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-amber-400/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-2xl ring-4 ring-orange-400/30">
                    <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110 border border-amber-400/50">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>

                <div className="mt-4 px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-300">
                    <UserBadge />
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <UserName />
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-orange-200">
                    <Mail className="h-4 w-4 text-orange-400" />
                    <span className="text-sm sm:text-base">
                      <UserEmail />
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-orange-200">
                    <Phone className="h-4 w-4 text-orange-400" />
                    <span className="text-sm sm:text-base">
                      <UserPhone />
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-black/20 rounded-xl border border-orange-400/20">
                  <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
                    <UserBio />
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl p-3 text-center border border-orange-400/20">
                    <div className="text-xl font-bold text-white">
                      <UserQuizzesCount />
                    </div>
                    <div className="text-xs text-orange-300">Quizzes</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl p-3 text-center border border-amber-400/20">
                    <div className="text-xl font-bold text-white">
                      <UserAttemptStats />
                    </div>
                    <div className="text-xs text-amber-300">Accuracy</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-3 text-center border border-yellow-400/20">
                    <div className="text-xl font-bold text-white">
                      <UserQuizzesCount />
                    </div>
                    <div className="text-xs text-yellow-300">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-orange-500/15 to-amber-500/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-orange-400/30 hover:bg-gradient-to-br hover:from-orange-500/25 hover:to-amber-500/25 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Edit3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Edit Profile
                  </h3>
                  <p className="text-xs text-orange-300">Update your details</p>
                </div>
              </div>
              <EditProfileButton />
            </div>

            <div className="bg-gradient-to-br from-amber-500/15 to-yellow-500/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-amber-400/30 hover:bg-gradient-to-br hover:from-amber-500/25 hover:to-yellow-500/25 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Password</h3>
                  <p className="text-xs text-amber-300">Update your password</p>
                </div>
              </div>
              <ChangePasswordButton />
            </div>

            <div className="bg-gradient-to-br from-yellow-500/15 to-orange-500/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-yellow-400/30 hover:bg-gradient-to-br hover:from-yellow-500/25 hover:to-orange-500/25 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                  <p className="text-xs text-yellow-300">Manage preferences</p>
                </div>
              </div>
              <NotificationSettingsButton />
            </div>

            <div className="bg-gradient-to-br from-orange-500/15 to-red-500/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-orange-400/30 hover:bg-gradient-to-br hover:from-orange-500/25 hover:to-red-500/25 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Reset Password
                  </h3>
                  <p className="text-xs text-orange-300">Email reset link</p>
                </div>
              </div>
              <ResetPasswordButton />
            </div>

            <div className="bg-gradient-to-br from-gray-600/15 to-gray-700/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-gray-500/30 hover:bg-gradient-to-br hover:from-gray-600/25 hover:to-gray-700/25 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LogOut className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Logout</h3>
                  <p className="text-xs text-gray-300">Sign out of account</p>
                </div>
              </div>
              <LogoutButton />
            </div>

            <div className="bg-gradient-to-br from-red-500/15 to-red-600/15 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-red-400/40 hover:bg-gradient-to-br hover:from-red-500/25 hover:to-red-600/25 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trash2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Delete Account
                  </h3>
                  <p className="text-xs text-red-300">Permanently remove</p>
                </div>
              </div>
              <DeleteAccountButton />
            </div>
            <div className="md:hidden h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
