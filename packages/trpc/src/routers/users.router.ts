import z from 'zod';
import { publicProcedure, router } from './trpc';

const db = [
  {
    id: 1,
    name: 'Alisha',
    profile: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  {
    id: 2,
    name: 'John',
    profile: 'https://randomuser.me/api/portraits/men/38.jpg',
  },
  {
    id: 3,
    name: 'Maddie',
    profile: 'https://randomuser.me/api/portraits/women/88.jpg',
  },
];

async function fakeDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 300);
  });
}

export const usersRouter = router({
  getUsers: publicProcedure.query(() => fakeDelay(db)),
  getUser: publicProcedure.input(z.number()).query(({ input }) =>
    fakeDelay(db.find((user) => user.id === input))
  ),
});

export type UsersRouter = typeof usersRouter;
