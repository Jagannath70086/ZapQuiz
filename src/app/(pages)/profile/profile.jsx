"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Lock,
  Shield,
  LogOut,
  Trash2,
  Camera,
  Save,
  X,
  Eye,
  EyeOff,
  Loader2,
  Settings,
  Bell,
  Globe,
  Smartphone,
  Key,
  AlertTriangle,
  Brain,
  Trophy,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import Modal from "@/components/ui/modal";

export default function ProfilePage({ mainUser }) {
  const [user, setUser] = useState({
    name: mainUser.name ? mainUser.name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") : "John Doe",
    email: mainUser.email ? mainUser.email : "john.doe@example.com",
    bio: mainUser.bio ? mainUser.bio : "Passionate learner and quiz enthusiast.",
    avatar: mainUser.avatar ? mainUser.avatar : null,
    phone: mainUser.phone ? mainUser.phone : "+91 9876541230",
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });
  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState(user.notifications);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/8 to-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
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
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-3xl object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110 border border-amber-400/50">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
                
                <div className="mt-4 px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-300">Quiz Master</span>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {user.name}
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-orange-200">
                    <Mail className="h-4 w-4 text-orange-400" />
                    <span className="text-sm sm:text-base">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-3 text-orange-200">
                      <Phone className="h-4 w-4 text-orange-400" />
                      <span className="text-sm sm:text-base">{user.phone}</span>
                    </div>
                  )}
                </div>
                {user.bio && (
                  <div className="p-4 bg-black/20 rounded-xl border border-orange-400/20">
                    <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl p-3 text-center border border-orange-400/20">
                    <div className="text-xl font-bold text-white">127</div>
                    <div className="text-xs text-orange-300">Quizzes</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl p-3 text-center border border-amber-400/20">
                    <div className="text-xl font-bold text-white">89%</div>
                    <div className="text-xs text-amber-300">Accuracy</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-3 text-center border border-yellow-400/20">
                    <div className="text-xl font-bold text-white">15</div>
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
              <button
                onClick={() => setShowEditProfile(true)}
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm hover:scale-105"
              >
                Edit Details
              </button>
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
              <button
                onClick={() => setShowChangePassword(true)}
                className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-sm hover:scale-105"
              >
                Change Password
              </button>
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
              <button
                onClick={() => setShowNotificationSettings(true)}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-sm hover:scale-105"
              >
                Settings
              </button>
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
              <button
                onClick={() => toast.success("Coming soon!")}
                disabled={false}
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105"
              >
                {false ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Send Reset Email
              </button>
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
              <button
                onClick={() => handleLogout()}
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Sign Out
              </button>
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
              <button
                onClick={() => setShowDeleteAccount(true)}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm hover:scale-105"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEditProfile} onClose={() => setShowEditProfile(false)}>
        <div className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 backdrop-blur-xl rounded-2xl border border-orange-400/30 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-orange-400/30 bg-gradient-to-r from-orange-500/20 to-amber-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Edit Profile
              </h2>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-orange-200" />
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-orange-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-orange-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-orange-200 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-200 mb-2">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 resize-none text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  setUser({...user, ...editForm});
                  setShowEditProfile(false);
                  toast.success("Coming soon!");
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 px-4 py-2 bg-black/30 border border-orange-400/30 text-orange-200 rounded-xl font-medium hover:bg-black/40 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePassword} onClose={() => setShowChangePassword(false)}>
        <div className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 backdrop-blur-xl rounded-2xl border border-orange-400/30 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-orange-400/30 bg-gradient-to-r from-orange-500/20 to-amber-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Change Password
              </h2>
              <button 
                onClick={() => setShowChangePassword(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-orange-200" />
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-orange-200 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordFields.current ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 text-sm"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordFields({
                      ...showPasswordFields,
                      current: !showPasswordFields.current,
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswordFields.current ? (
                    <EyeOff className="h-4 w-4 text-orange-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-200 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordFields.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 text-sm"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordFields({
                      ...showPasswordFields,
                      new: !showPasswordFields.new,
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswordFields.new ? (
                    <EyeOff className="h-4 w-4 text-orange-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-200 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordFields.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 bg-black/30 border border-orange-400/30 rounded-lg text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-300 text-sm"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordFields({
                      ...showPasswordFields,
                      confirm: !showPasswordFields.confirm,
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswordFields.confirm ? (
                    <EyeOff className="h-4 w-4 text-orange-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  toast.success("Coming soon!")
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setShowChangePassword(false);
                }}
                disabled={
                  loading ||
                  !passwordForm.currentPassword ||
                  !passwordForm.newPassword ||
                  !passwordForm.confirmPassword
                }
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 px-4 py-2 bg-black/30 border border-orange-400/30 text-orange-200 rounded-xl font-medium hover:bg-black/40 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal show={showDeleteAccount} onClose={() => setShowDeleteAccount(false)}>
        <div className="bg-gradient-to-br from-orange-900/95 to-red-900/95 backdrop-blur-xl rounded-2xl border border-red-400/30 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-red-400/30 bg-gradient-to-r from-red-500/20 to-orange-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Delete Account
              </h2>
              <button 
                onClick={() => setShowDeleteAccount(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-red-200" />
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-500/20 rounded-xl border border-red-400/30">
              <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-200">
                This action cannot be undone. All your data, including quiz history and achievements, will be permanently deleted.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  toast.success("Coming soon!");
                  setShowDeleteAccount(false);
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete Account
              </button>
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="flex-1 px-4 py-2 bg-black/30 border border-orange-400/30 text-orange-200 rounded-xl font-medium hover:bg-black/40 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Notification Settings Modal */}
      <Modal show={showNotificationSettings} onClose={() => setShowNotificationSettings(false)}>
        <div className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 backdrop-blur-xl rounded-2xl border border-orange-400/30 shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-orange-400/30 bg-gradient-to-r from-orange-500/20 to-amber-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Notification Settings
              </h2>
              <button 
                onClick={() => setShowNotificationSettings(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-orange-200" />
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-orange-400/20">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-400" />
                  <div>
                    <span className="text-sm font-medium text-white">Email Notifications</span>
                    <p className="text-xs text-orange-300">Receive quiz reminders and updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        email: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-orange-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-orange-400/20">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-orange-400" />
                  <div>
                    <span className="text-sm font-medium text-white">Push Notifications</span>
                    <p className="text-xs text-orange-300">Get instant alerts on your device</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-orange-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-orange-400/20">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-orange-400" />
                  <div>
                    <span className="text-sm font-medium text-white">SMS Notifications</span>
                    <p className="text-xs text-orange-300">Receive text messages for important updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        sms: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-orange-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  setUser({...user, notifications});
                  toast.success("Coming soon!");
                  setShowNotificationSettings(false);
                }}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="flex-1 px-4 py-2 bg-black/30 border border-orange-400/30 text-orange-200 rounded-xl font-medium hover:bg-black/40 hover:text-white transition-all duration-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="h-20"></div>
    </div>
  );
}