import z from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(5),
  email: z.email(),
  password_token: z.string(),
});

export type createUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(5),
  email: z.email(),
  password_token: z.string(),
});

export type updateUserDto = z.infer<typeof updateUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password_token: z.string(),
});

export type loginUserDto = z.infer<typeof loginUserSchema>;

export const refreshUserSchema = z.object({
  email: z.email(),
  password_token: z.string(),
});

export type refreshUserDto = z.infer<typeof refreshUserSchema>;
