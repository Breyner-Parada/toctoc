import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";


const useAuthStore = create(
  persist(
    (set: any) => ({
      userProfile: null,
      addUser: (user: any) => {
        set({ userProfile: user });
      },
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;