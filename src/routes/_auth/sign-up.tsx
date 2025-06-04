import { createFileRoute } from "@tanstack/react-router";

import AuthForm from "./-form/auth-form";

import { getUserQueryOptions } from "@/services/user";

export const Route = createFileRoute("/_auth/sign-up")({
    loader: ({ context: { queryClient } }) => {
        queryClient.ensureQueryData(getUserQueryOptions());
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <AuthForm mode="signup" />;
}
