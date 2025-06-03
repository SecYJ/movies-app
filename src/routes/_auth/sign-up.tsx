import { useSuspenseQuery } from "@tanstack/react-query";
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
    const user = useSuspenseQuery(getUserQueryOptions());

    console.log(user.data);

    return <AuthForm mode="signup" />;
}
