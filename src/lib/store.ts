import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "learner" | "admin" | null;

interface AppState {
  userRole: Role;
  completedModules: string[];
  login: (role: Role) => void;
  logout: () => void;
  markModuleComplete: (moduleId: string) => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userRole: null,
      completedModules: [],
      login: (role) => set({ userRole: role }),
      logout: () => set({ userRole: null, completedModules: [] }),
      markModuleComplete: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),
      resetProgress: () => set({ completedModules: [] }),
    }),
    {
      name: "ai-literacy-storage",
    }
  )
);
