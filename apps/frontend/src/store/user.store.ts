import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { TUser } from '@/data';

type UserState = {
  currentUser: TUser;
  setCurrentUser: (user: TUser) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: {
        id: 1,
        name: 'Alisha',
        profile: 'https://randomuser.me/api/portraits/women/89.jpg',
      },
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ currentUser: state.currentUser }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
