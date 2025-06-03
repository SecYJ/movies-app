import { z } from "zod/v4";

const envSchema = z.object({
    DB_FILE_NAME: z.string().min(1, "DB_FILE_NAME is required"),
    SESSION_COOKIE_NAME: z.string().min(1, "SESSION_COOKIE_NAME is required"),
    SESSION_DURATION: z.string().min(1, "SESSION_DURATION is required"),
});

export const env = envSchema.parse(process.env);
