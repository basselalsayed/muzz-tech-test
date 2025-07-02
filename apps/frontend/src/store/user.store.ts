import { create } from 'zustand';

export type User = {
  id: number;
  name: string;
  profile: string;
};

type UserState = {
  currentRecipient?: User;
  currentUser: User;
  setCurrentRecipient: (user?: User) => void;
  setCurrentUser: (user: User) => void;
};

const useUserStore = create<UserState>()((set) => ({
  currentRecipient: undefined,
  currentUser: {
    id: 1,
    name: 'Alisha',
    profile: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  setCurrentRecipient: (user) => set({ currentRecipient: user }),
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useUserStore;
