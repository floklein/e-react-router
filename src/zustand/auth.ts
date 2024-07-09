import { create } from "zustand";
import { Login } from "../zod";

export interface Auth {
  user: Login | null;
  isAuthenticated: boolean;
  login: (user: Login) => void;
  logout: () => void;
}

export const useAuth = create<Auth>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: Login) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
