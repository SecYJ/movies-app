import { createFileRoute } from "@tanstack/react-router";

import AuthForm from "./-form/auth-form";

export const Route = createFileRoute("/_auth/sign-in")({
    component: RouteComponent,
});

function RouteComponent() {
    return <AuthForm mode="login" />;
}
