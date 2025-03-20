import { create } from "zustand";
import { getInfo } from "@/services/login";
import { getToken } from "@/utils/user-token";

type UserInfoStore = {
  userInfo: any | null;
  setUserInfo: (userInfo: any | null) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  initialize: () => Promise<void>;
};

export const useUserInfo = create<UserInfoStore>((set) => ({
  userInfo: null,
  initialized: false,
  setUserInfo: (userInfo: any | null) => set({ userInfo }),
  setInitialized: (initialized: boolean) => set({ initialized }),
  initialize: async () => {
    const token = getToken();
    if (!token) {
      set({ initialized: true });
      return;
    }

    try {
      const res = (await getInfo()) as any;
      const { code, user } = res;
      if (code === 200) {
        set({ userInfo: user, initialized: true });
      } else {
        set({ userInfo: null, initialized: true });
      }
    } catch (error) {
      set({ userInfo: null, initialized: true });
    }
  },
}));
