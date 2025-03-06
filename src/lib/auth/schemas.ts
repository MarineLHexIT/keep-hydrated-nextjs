import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});

export const RegisterSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
  name: z.string().trim(),
}); 