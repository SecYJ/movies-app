import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/")({
    component: Home,
});

function Home() {
    return (
        <div className="flex h-screen flex-col items-center justify-center p-2">
            <h3>Welcome Home!!!</h3>
            <Button>hello</Button>
        </div>
    );
}
