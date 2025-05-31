import { z } from "zod";

const envSchema = z.object({
    DB_FILE_NAME: z.string().min(1, "DB_FILE_NAME is required"),
});

export const env = envSchema.parse(process.env);
