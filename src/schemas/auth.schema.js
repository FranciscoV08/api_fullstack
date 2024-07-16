import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username es requerido",
  }),
  email: z
    .string({
      required_error: "email es requerido",
    })
    .email(),
  password: z
    .string({
      required_error: "password es requerido",
    })
    .min(6, {
      message: "password debe ser mas de 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "email es requerido" }).email({ message: "email invalido" }),
  password: z
    .string({ required_error: "password es requerido" })
    .min(6, { message: "password debe ser mas de 6 caracteres" }),
});
