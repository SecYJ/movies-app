import { z } from "zod/v4";

export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .nonempty({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = loginSchema
    .extend({
        username: z
            .string()
            .nonempty({ message: "Username is required" })
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be less than 20 characters"),
        repeatPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ["repeatPassword"],
    });
