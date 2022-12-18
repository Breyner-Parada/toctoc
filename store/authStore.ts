import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";


const useAuthStore = create(
  persist(
    (set: any) => ({
      userProfile: null,
      allUsers: [],
      addUser: (user: any) => {
        set({ userProfile: user });
      },
      removeUser: () => {
        set({ userProfile: null });
      },
      fetchAllUsers: async () => {
        const { data } = await axios.get(`${BASE_URL}/api/users`);
        set({allUsers: data});
      }
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;