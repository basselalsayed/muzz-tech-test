import { createContext, router } from './trpc';
import { usersRouter } from './users.router';
import * as trpcExpress from '@trpc/server/adapters/express';

export const appRouter = router({
  user: usersRouter,
});

export type AppRouter = typeof appRouter;

export const expressMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export type Context = Awaited<ReturnType<typeof createContext>>;
