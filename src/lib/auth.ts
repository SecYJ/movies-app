import { randomBytes } from "crypto";

import { addDays, format, isBefore } from "date-fns";
import { eq } from "drizzle-orm";

import { getCookie, setCookie } from "@tanstack/react-start/server";

import { env } from "./env";

import { db } from "@/db";
import { sessionsTable, usersTable } from "@/db/schema";

export const generateSessionToken = () => {
    return "sess_" + randomBytes(32).toString("hex");
};

export const getCurrentSession = async () => {
    try {
        const sessionToken = getCookie(env.SESSION_COOKIE_NAME);

        if (!sessionToken) {
            return null;
        }

        const validatedSession = await validateSession(sessionToken);

        return validatedSession;
    } catch {
        return null;
    }
};

export const setSessionCookie = (token: string) => {
    return setCookie(env.SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        // maxAge: parseInt(env.SESSION_DURATION),
    });
};

export const createSession = async (userId: string) => {
    try {
        await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId));

        const sessionToken = generateSessionToken();

        const daysToAdd = parseInt(env.SESSION_DURATION.replace("d", ""));
        const expiresAt = format(
            addDays(new Date(), daysToAdd),
            "yyyy-MM-dd HH:mm:ss",
        );

        await db.insert(sessionsTable).values({
            sessionToken,
            userId,
            expiresAt,
        });

        return sessionToken;
    } catch (error) {
        throw new Error("Failed to create session", { cause: error });
    }
};

export const validateSession = async (token: string) => {
    try {
        const result = await db
            .select({
                session: sessionsTable,
                user: {
                    id: usersTable.id,
                    username: usersTable.username,
                    email: usersTable.email,
                },
            })
            .from(sessionsTable)
            .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
            .where(eq(sessionsTable.sessionToken, token))
            .limit(1);

        if (result.length === 0) {
            return null;
        }

        const { session, user } = result[0];

        // Check if session has expired
        if (isBefore(new Date(session.expiresAt), new Date())) {
            await db
                .delete(sessionsTable)
                .where(eq(sessionsTable.sessionToken, token));
            return null;
        }

        return { session, user };
    } catch {
        return null;
    }
};

export const clearSessionCookie = () => {
    return setCookie(env.SESSION_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    });
};

export const deleteSession = async (sessionToken: string) => {
    try {
        await db
            .delete(sessionsTable)
            .where(eq(sessionsTable.sessionToken, sessionToken));
    } catch (error) {
        throw new Error("Failed to delete session", { cause: error });
    }
};
