import { create } from 'zustand';

export type Route = 'home' | 'chat' | 'profile';

type PageState = {
  currentPage: Route;
  setCurrentPage: (page: Route) => void;
};

export const usePageStore = create<PageState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page: Route) => set({ currentPage: page }),
}));
