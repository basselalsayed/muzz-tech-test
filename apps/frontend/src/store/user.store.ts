import { create } from 'zustand';

import type { TUser } from '@/data';

type UserState = {
  currentUser: TUser;
  setCurrentUser: (user: TUser) => void;
};

export const useUserStore = create<UserState>()((set) => ({
  currentRecipient: undefined,
  currentUser: {
    id: 1,
    name: 'Alisha',
    profile: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  setCurrentUser: (user) => set({ currentUser: user }),
}));
