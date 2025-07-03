"use client";

import React, { useState } from "react";
import {
  Mail,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Loader2,
  Bell,
  Smartphone,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import Modal from "@/components/ui/modal";
import { useUserStore } from "@/store/userStore";

export function EditProfileButton() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  });

  return (
    <>
      <button
        onClick={() => setShowEditProfile(true)}
        className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm hover:scale-105"
      >
        Edit Details
      </button>

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
                  setUser({ ...user, ...editForm });
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
    </>
  );
}

export function ChangePasswordButton() {
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <>
      <button
        onClick={() => setShowChangePassword(true)}
        className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-sm hover:scale-105"
      >
        Change Password
      </button>

      <Modal
        show={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      >
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
                  toast.success("Coming soon!");
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
    </>
  );
}

export function NotificationSettingsButton() {
  const [user, setUser] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
  });
  const [loading, setLoading] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);

  const [notifications, setNotifications] = useState(user.notifications);
  return (
    <>
      <button
        onClick={() => setShowNotificationSettings(true)}
        className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-sm hover:scale-105"
      >
        Settings
      </button>
      <Modal
        show={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      >
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
                    <span className="text-sm font-medium text-white">
                      Email Notifications
                    </span>
                    <p className="text-xs text-orange-300">
                      Receive quiz reminders and updates
                    </p>
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
                    <span className="text-sm font-medium text-white">
                      Push Notifications
                    </span>
                    <p className="text-xs text-orange-300">
                      Get instant alerts on your device
                    </p>
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
                    <span className="text-sm font-medium text-white">
                      SMS Notifications
                    </span>
                    <p className="text-xs text-orange-300">
                      Receive text messages for important updates
                    </p>
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
                  setUser({ ...user, notifications });
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
    </>
  );
}

export function ResetPasswordButton() {
  return (
    <button
      onClick={() => toast.success("Coming soon!")}
      disabled={false}
      className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105"
    >
      {false ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Send Reset Email
    </button>
  );
}

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

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
    <button
      onClick={() => handleLogout()}
      disabled={loading}
      className="w-full px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Sign Out
    </button>
  );
}

export function DeleteAccountButton() {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowDeleteAccount(true)}
        className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm hover:scale-105"
      >
        Delete Account
      </button>

      <Modal
        show={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
      >
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
                This action cannot be undone. All your data, including quiz
                history and achievements, will be permanently deleted.
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
    </>
  );
}
