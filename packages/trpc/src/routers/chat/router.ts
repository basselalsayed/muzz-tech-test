import z from 'zod';
import { nanoid } from 'nanoid';

import { publicProcedure, router } from '../trpc';
import { seedChat } from './seed';
import { eventService, EventTypes } from './event-service';
import { Message } from './schema';
import { TRPCError } from '@trpc/server';

const db = new Map<string, Message[]>();

seedChat(db);

async function fakeDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 700);
  });
}

export const chatRouter = router({
  postMessage: publicProcedure
    .input(
      z.object({
        content: z.string(),
        chatId: z.string(),
        senderId: z.number(),
        recipientId: z.number(),
      })
    )
    .mutation(({ input }) => {
      const messages = db.get(input.chatId) || [];
      const newMessage: Message = {
        content: input.content,
        id: nanoid(),
        recipientId: input.recipientId,
        senderId: input.senderId,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);

      eventService.emit(input.chatId, EventTypes.NEW_MESSAGE, newMessage);

      return newMessage;
    }),
  getMessages: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(({ input }) => {
      return db.get(input.chatId) || [];
      // return fakeDelay(db.get(input.chatId) || []);
    }),
  onMessage: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .subscription(async function* ({ input, signal }) {
      for await (const [data] of eventService.subscribe(
        input.chatId,
        EventTypes.NEW_MESSAGE,
        {
          signal,
        }
      )) {
        yield data as Message;
      }
    }),
  startTyping: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        userId: z.number(),
      })
    )
    .mutation(({ input }) => {
      eventService.emit(
        input.chatId,
        EventTypes.TYPING_STARTED,
        input.userId,
        input.chatId
      );
      return { success: true };
    }),
  stopTyping: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        userId: z.number(),
      })
    )
    .mutation(({ input }) => {
      eventService.emit(
        input.chatId,
        EventTypes.TYPING_STOPPED,
        input.userId,
        input.chatId
      );
      return { success: true };
    }),
  onTypingStarted: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .subscription(async function* ({ input, signal }) {
      for await (const [userId, roomId] of eventService.subscribe(
        input.chatId,
        EventTypes.TYPING_STARTED,
        {
          signal,
        }
      )) {
        yield { userId, roomId };
      }
    }),
  onTypingStopped: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .subscription(async function* ({ input, signal }) {
      for await (const [userId, roomId] of eventService.subscribe(
        input.chatId,
        EventTypes.TYPING_STOPPED,
        {
          signal,
        }
      )) {
        yield { userId, roomId };
      }
    }),
});
