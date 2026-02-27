import { create } from "zustand";
import { _users, Users } from "../models/Auth";
import { POST_Auth } from "../helpers/Fetching_Auth";

type Data = {
  form_auth: Users;
  Login: (obj: Users) => void;
  Logout: () => void;
  isLogin: boolean;
  reset: () => void;
};

export const useAuth = create<Data>()((set, get) => ({
  form_auth: _users,

  // ✅ INICIALIZA DESDE localStorage
  isLogin: !!localStorage.getItem("token"),

  Login: async (obj: Users) => {
    const result = await POST_Auth(obj);

    if (result.success) {
      localStorage.setItem("token", result.data.token);

      set({ isLogin: true });
      return result.data;
    }

    localStorage.removeItem("token");
    set({ isLogin: false });
    return result.error;
  },

  Logout: () => {
    localStorage.removeItem("token");

    set({ isLogin: false });
    get().reset();
  },

  reset: () => set({ form_auth: _users }),
}));
