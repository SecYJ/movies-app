import { createFileRoute } from "@tanstack/react-router";

import Logo from "@/assets/logo.svg?react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="grid min-h-screen items-center">
            <div>
                <Logo />
                <div className="mx-auto w-full max-w-80 space-y-10 bg-blue-900 px-6 py-7">
                    <h1 className="text-3xl">Sign Up</h1>

                    <form className="space-y-6">
                        <Input
                            type="email"
                            placeholder="Email address"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                        />
                        <Input
                            type="password"
                            placeholder="Repeat Password"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                        />
                    </form>

                    <Button className="bg-red-500">Create an account</Button>
                </div>
            </div>
        </div>
    );
}
