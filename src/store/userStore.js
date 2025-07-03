import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
    role: "USER",
    isActive: true,
    quizzes: [],
    attempts: [],
    favorites: [],
  },

  setUser: (userData) => set({ user: { ...userData } }),

  updateUserField: (key, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [key]: value,
      },
    })),

  clearUser: () =>
    set({
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        bio: "",
        avatar: "",
        role: "USER",
        isActive: true,
        quizzes: [],
        attempts: [],
        favorites: [],
      },
    }),
}));
