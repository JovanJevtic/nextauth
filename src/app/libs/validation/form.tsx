import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(3)
})