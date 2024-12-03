import { z } from 'zod';

export const UserDetailsSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  email: z.string().email(),
});

export type UserDetailsSchemaType = z.infer<typeof UserDetailsSchema>;
