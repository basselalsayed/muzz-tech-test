import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router/dom';

import Container from './components/container/Container.tsx';
import { router } from './router';

import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
