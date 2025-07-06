import z from 'zod';

export const MessageSchema = z.object({
  content: z.string(),
  id: z.string(),
  recipientId: z.number(),
  senderId: z.number(),
  timestamp: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
