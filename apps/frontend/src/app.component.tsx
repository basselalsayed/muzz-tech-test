import { RouterProvider } from 'react-router/dom';

import { Layout } from '@/components';

import { router } from './router';

import './App.css';

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
