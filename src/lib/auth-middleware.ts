import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { getCurrentSession } from "./auth";

export const requireAuth = createServerFn().handler(async () => {
    const sessionData = await getCurrentSession();

    if (!sessionData) {
        throw redirect({ to: "/sign-in" });
    }

    return sessionData;
});

// export const getOptionalAuth = createServerFn().handler(() => {
//     const sessionData = getCurrentSession();
//     return sessionData?.user || null;
// });
