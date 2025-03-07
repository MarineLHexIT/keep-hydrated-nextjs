import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().min(1, {
    message: 'Email is required',
  }).email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().trim().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  name: z.string().trim().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
});

export const loginSchema = z.object({
  email: z.string().trim().min(1, {
    message: 'Email is required',
  }).email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().trim().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

// Types derived from schemas
export type RegisterFormValues = z.infer<typeof registerSchema>
export type LoginFormValues = z.infer<typeof loginSchema> 