import { create } from "zustand";

type UserInfoStore = {
  userInfo: any | null;
  setUserInfo: (userInfo: any | null) => void;
};

export const useUserInfo = create<UserInfoStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: any | null) => set({ userInfo }),
}));
