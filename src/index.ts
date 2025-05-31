import { eq } from "drizzle-orm";

import { db } from "./db";
import { usersTable } from "./db/schema";

async function main() {
    const user: typeof usersTable.$inferInsert = {
        email: "john@example.com",
        password: "123456",
        username: "john",
    };

    await db.insert(usersTable).values(user);
    console.log("New user created!");

    const users = await db.select().from(usersTable);
    console.log("Getting all users from the database: ", users);

    await db
        .update(usersTable)
        .set({
            password: "12345678",
        })
        .where(eq(usersTable.email, user.email));
    console.log("User info updated!");
}

main();
