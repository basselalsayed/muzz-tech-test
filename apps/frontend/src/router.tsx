import { createBrowserRouter } from 'react-router';

import { ROUTE_PATTERNS } from '@/lib';
import { Chat, Home } from '@/pages';
import ChatTab from '@/pages/chat/components/tabs/chat-tab.component.tsx';
import ProfileTab from '@/pages/chat/components/tabs/profile-tab.tsx';

export const router = createBrowserRouter([
  {
    element: <Home />,
    path: ROUTE_PATTERNS.home,
  },
  {
    children: [
      {
        element: <ChatTab />,
        index: true,
      },
      {
        element: <ProfileTab />,
        path: 'profile',
      },
    ],
    element: <Chat />,
    path: ROUTE_PATTERNS.chat,
  },
]);
