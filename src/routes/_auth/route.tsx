import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Logo from "@/assets/logo.svg?react";
import { checkAuth } from "@/services/auth";

export const Route = createFileRoute("/_auth")({
    beforeLoad: async () => {
        const sessionData = await checkAuth();

        if (sessionData?.user) {
            throw redirect({ to: "/" });
        }
    },
    component: AuthLayout,
});

function AuthLayout() {
    return (
        <div className="grid min-h-screen items-center">
            <div className="relative">
                <Logo className="absolute -top-[calc(56px+27px)] left-1/2 mx-auto -translate-x-1/2 md:-top-[calc(80px+27px)]" />
                <Outlet />
            </div>
        </div>
    );
}
