import { useCallback } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

import { Tabs } from '@/components';
import { ROUTES } from '@/lib';

import Header from './components/header.component.tsx';

type TabId = 'chat' | 'profile';

const tabs = [
  { id: 'chat', label: 'Chat' },
  { id: 'profile', label: 'Profile' },
] as const;

export const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  // Determine active tab based on current route
  const isProfileRoute = location.pathname.includes('/profile');
  const activeTab: TabId = isProfileRoute ? 'profile' : 'chat';

  const handleTabChange = useCallback(
    (tabId: TabId) => {
      if (!userId) return;

      if (tabId === 'profile') {
        void navigate(ROUTES.chatProfile({ userId: Number(userId) }));
      } else {
        void navigate(ROUTES.chat({ userId: Number(userId) }));
      }
    },
    [userId, navigate]
  );

  return (
    <div className='flex h-full w-full flex-col overflow-hidden'>
      <Header />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <div className='flex flex-1 flex-col'>
        <Outlet />
      </div>
    </div>
  );
};
