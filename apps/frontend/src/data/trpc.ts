import type { AppRouter } from '@muzz/trpc';
import { QueryClient } from '@tanstack/react-query';
import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === 'subscription',
      false: httpBatchLink({
        url: `http://localhost:3001/trpc`,
      }),
      true: wsLink({
        client: createWSClient({
          url: 'ws://localhost:3001',
        }),
      }),
    }),
  ],
});

export const queryClient = new QueryClient();

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
