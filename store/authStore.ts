import create from "zustand";
import { persist } from "zustand/middleware";
import { TUser } from "../global";
import axios from "axios";


const useAuthStore = create(
  persist(
    (set: any) => ({
      userProfile: null,
      addUser: (user: any) => {
        set({ userProfile: user });
      },
      removeUser: () => {
        set({ userProfile: null });
      }
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;