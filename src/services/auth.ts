import { createServerFn } from "@tanstack/react-start";

import { getCurrentSession } from "@/lib/auth";

export const checkAuth = createServerFn().handler(async () => {
    const sessionData = await getCurrentSession();

    if (!sessionData) {
        return null;
    }

    return sessionData;
});
