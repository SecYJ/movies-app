import { eq } from "drizzle-orm";

import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

import { usersTable } from "./schema";

import { db } from ".";

import { createSession, setSessionCookie } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import { signupSchema, loginSchema } from "@/routes/_auth/-form/auth-schema";

export const createUser = createServerFn({ method: "POST" })
    .validator(signupSchema)
    .handler(async ({ data }) => {
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, data.email));

        if (existingUser.length > 0) {
            setResponseStatus(400);

            return {
                error: "User already exists",
            };
        }

        const hashedPassword = await hashPassword(data.password);

        const [newUser] = await db
            .insert(usersTable)
            .values({
                username: data.username,
                email: data.email,
                password: hashedPassword,
            })
            .returning({
                id: usersTable.id,
                username: usersTable.username,
                email: usersTable.email,
            });

        const sessionToken = await createSession(newUser.id);
        setSessionCookie(sessionToken);

        return {
            user: newUser,
        };
    });

export const getUser = createServerFn().handler(async () => {
    const user = await db
        .select({
            id: usersTable.id,
            username: usersTable.username,
            email: usersTable.email,
        })
        .from(usersTable)
        .limit(1);

    return user;
});

export const loginUser = createServerFn({ method: "POST" })
    .validator(loginSchema)
    .handler(async ({ data }) => {
        // Step 1: Find user by email
        const existingUser = await db
            .select({
                id: usersTable.id,
                username: usersTable.username,
                email: usersTable.email,
                password: usersTable.password,
            })
            .from(usersTable)
            .where(eq(usersTable.email, data.email))
            .limit(1);

        // Step 2: Check if user exists
        if (existingUser.length === 0) {
            setResponseStatus(400);

            return {
                error: "Invalid email or password",
            };
        }

        const user = existingUser[0];

        // Step 3: Verify password
        const isPasswordValid = await verifyPassword(
            data.password,
            user.password,
        );

        if (!isPasswordValid) {
            setResponseStatus(400);

            return {
                error: "Invalid email or password",
            };
        }

        // Step 4: Create session and set cookie
        const sessionToken = await createSession(user.id);
        setSessionCookie(sessionToken);

        // Step 5: Return user data (without password)
        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        };
    });
