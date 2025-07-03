import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile: z.string(),
});

export type TUser = z.infer<typeof UserSchema>;
