import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/movies")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_layout/movies"!</div>;
}
