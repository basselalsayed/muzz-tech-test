import { createBrowserRouter } from 'react-router';

import Chat from '@/pages/chat/Chat';
import Home from '@/pages/home/Home';

import { ROUTE_PATTERNS } from './routes';

export const router = createBrowserRouter([
  {
    element: <Home />,
    path: ROUTE_PATTERNS.home,
  },
  {
    element: <Chat />,
    path: ROUTE_PATTERNS.chat,
  },
]);
