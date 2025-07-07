import * as trpcExpress from '@trpc/server/adapters/express';

import { chatRouter } from './chat';
import { createContext, router } from './trpc';
import { usersRouter } from './users.router';

export const appRouter = router({
  chat: chatRouter,
  user: usersRouter,
});

export type AppRouter = typeof appRouter;

export const expressMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export type Context = Awaited<ReturnType<typeof createContext>>;
