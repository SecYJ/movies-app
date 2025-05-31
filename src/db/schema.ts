import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = sqliteTable("users_table", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    username: text().notNull().unique(),
    email: text().notNull().unique(),
    password: text().notNull(),
});

// Derive Zod schemas from Drizzle schema using drizzle-zod
export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable);
