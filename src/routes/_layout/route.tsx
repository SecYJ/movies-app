import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import IconNavBookmark from "@/assets/icon-nav-bookmark.svg?react";
import IconNavHome from "@/assets/icon-nav-home.svg?react";
import IconNavMovies from "@/assets/icon-nav-movies.svg?react";
import IconNavTvSeries from "@/assets/icon-nav-tv-series.svg?react";
import IconSearch from "@/assets/icon-search.svg?react";
import Avatar from "@/assets/image-avatar.png";
import Logo from "@/assets/logo.svg?react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
});

function RouteComponent() {
    const form = useForm({
        defaultValues: {
            search: "",
        },
        onSubmit: async ({ value }) => {
            console.log("Search submitted:", value.search);
        },
    });

    return (
        <div className="md:py-6">
            <header className="flex items-center justify-between bg-blue-900 p-4 md:mx-6">
                <Logo />
                <nav className="flex items-center gap-6 md:gap-8">
                    <Link to="/">
                        <IconNavHome className="h-5 w-5" />
                    </Link>
                    <Link to=".">
                        <IconNavMovies className="h-5 w-5" />
                    </Link>
                    <Link to=".">
                        <IconNavTvSeries className="h-5 w-5" />
                    </Link>
                    <Link to=".">
                        <IconNavBookmark className="h-5 w-5" />
                    </Link>
                </nav>
                <img
                    src={Avatar}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                />
            </header>
            <div className="container mx-auto px-4 py-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <div className="group flex gap-4">
                        <IconSearch className="text-white" />
                        <form.Field name="search">
                            {(field) => (
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    placeholder="Search  for movies or TV series"
                                    className="caret w-full rounded-none border-0 border-b border-transparent bg-transparent px-2 pb-2.5 text-lg text-white caret-red-500 group-hover:border-b group-hover:border-b-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            )}
                        </form.Field>
                    </div>
                </form>
            </div>
            <Outlet />
        </div>
    );
}
