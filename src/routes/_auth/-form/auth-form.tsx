import { Link } from "@tanstack/react-router";

import { useAuthForm } from "../-hooks/useAuthForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
    mode: "login" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const form = useAuthForm(mode);

    // Login form
    if (mode === "login") {
        return (
            <div className="mx-auto w-full max-w-80 rounded-lg bg-blue-900 px-6 py-7">
                <h1 className="text-3xl">Login</h1>

                <form
                    className="my-10 space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <form.Field
                        name="email"
                        children={(field) => (
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                            />
                        )}
                    />
                    <form.Field
                        name="password"
                        children={(field) => (
                            <Input
                                type="password"
                                placeholder="Password"
                                className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                            />
                        )}
                    />
                </form>

                <Button
                    className="h-12 w-full bg-red-500 py-3.5 disabled:bg-white"
                    onClick={() => form.handleSubmit()}
                >
                    Login
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2">
                    <span>Don't have an account?</span>
                    <Link to="/sign-up" className="text-red-500">
                        Sign Up
                    </Link>
                </div>
            </div>
        );
    }

    // Sign up form
    return (
        <div className="mx-auto w-full max-w-80 rounded-lg bg-blue-900 px-6 py-7">
            <h1 className="text-3xl">Sign Up</h1>

            <form
                className="my-10 space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="username"
                    children={(field) => (
                        <Input
                            placeholder="Username"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                    )}
                />
                <form.Field
                    name="email"
                    children={(field) => (
                        <Input
                            type="email"
                            placeholder="Email address"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                    )}
                />
                <form.Field
                    name="password"
                    children={(field) => (
                        <Input
                            type="password"
                            placeholder="Password"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                    )}
                />
                <form.Field
                    name="repeatPassword"
                    children={(field) => (
                        <Input
                            type="password"
                            placeholder="Repeat Password"
                            className="rounded-none border-0 border-b border-b-blue-500 caret-red-500 focus-visible:ring-0"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                    )}
                />
            </form>

            <Button
                className="h-12 w-full bg-red-500 py-3.5 disabled:bg-white"
                onClick={() => form.handleSubmit()}
            >
                Create an account
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2">
                <span>Already have an account?</span>
                <Link to="/sign-in" className="text-red-500">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default AuthForm;
