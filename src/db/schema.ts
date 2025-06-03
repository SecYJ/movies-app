import { format } from "date-fns";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Enums
export const categoryEnum = ["movie", "tv-series"] as const;

// Reusable timestamp fields
const createTimestampFields = () => ({
    createdAt: text()
        .notNull()
        .default(format(new Date(), "yyyy-MM-dd HH:mm:ss")),
    updatedAt: text()
        .notNull()
        .default(format(new Date(), "yyyy-MM-dd HH:mm:ss")),
});

export const sessionsTable = sqliteTable("sessions_table", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    sessionToken: text().notNull(),
    userId: text()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    expiresAt: text().notNull(),
});

export const usersTable = sqliteTable("users_table", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    username: text().notNull().unique(),
    email: text().notNull().unique(),
    password: text().notNull(),
    ...createTimestampFields(),
});

export const moviesTable = sqliteTable("movies_table", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text().notNull(),
    year: integer().notNull(),
    category: text({ enum: categoryEnum }).notNull(),
    rating: text().notNull(), // "E", "PG", "18+"
    isTrending: integer({ mode: "boolean" }).notNull().default(false),
    ...createTimestampFields(),
});

export const thumbnailsTable = sqliteTable("thumbnails_table", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    movieId: text()
        .notNull()
        .references(() => moviesTable.id, { onDelete: "cascade" }),
    type: text().notNull(), // "regular" | "trending"
    size: text().notNull(), // "small" | "medium" | "large"
    url: text().notNull(), // CDN URL for serving content
    storageKey: text().notNull(), // Cloud storage key for operations
    uploadedAt: text(),
    fileSize: integer(), // File size in bytes
    isOptimized: integer({ mode: "boolean" }).default(false),
    storageProvider: text().default("cloudflare-r2"), // Track which provider
    ...createTimestampFields(),
});

export const userMovieTable = sqliteTable("user_movie_table", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    movieId: text()
        .notNull()
        .references(() => moviesTable.id, { onDelete: "cascade" }),
    isBookmarked: integer({ mode: "boolean" }).notNull().default(false),
    isWatched: integer({ mode: "boolean" }).notNull().default(false),
    userRating: integer(), // 1-5 stars
    bookmarkedAt: text(),
    watchedAt: text(),
    ...createTimestampFields(),
});

// Derive Zod schemas from Drizzle schema using drizzle-zod
export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable);
export const selectMovieSchema = createSelectSchema(moviesTable);
export const insertMovieSchema = createInsertSchema(moviesTable);
export const selectThumbnailSchema = createSelectSchema(thumbnailsTable);
export const insertThumbnailSchema = createInsertSchema(thumbnailsTable);
export const selectUserMovieSchema = createSelectSchema(userMovieTable);
export const insertUserMovieSchema = createInsertSchema(userMovieTable);
