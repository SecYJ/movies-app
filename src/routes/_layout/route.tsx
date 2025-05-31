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
        <div className="xl:flex xl:items-start xl:justify-center xl:gap-4">
            {/* Sidebar for xl breakpoint */}
            <div className="hidden xl:sticky xl:top-8 xl:z-10 xl:flex xl:h-[calc(100vh-4rem)] xl:w-20 xl:flex-shrink-0 xl:flex-col xl:justify-between xl:rounded-2xl xl:bg-blue-900 xl:p-4 xl:shadow-lg">
                <div className="xl:flex xl:flex-col xl:items-center xl:gap-6">
                    <div className="xl:mb-4">
                        <Logo className="xl:h-8 xl:w-8" />
                    </div>
                    <nav className="hidden xl:flex xl:flex-col xl:items-center xl:gap-4">
                        <Link
                            to="/"
                            className="xl:hover:bg-blue-800 xl:rounded-lg xl:p-2 xl:transition-colors"
                        >
                            <IconNavHome className="h-5 w-5" />
                        </Link>
                        <Link
                            to="."
                            className="xl:hover:bg-blue-800 xl:rounded-lg xl:p-2 xl:transition-colors"
                        >
                            <IconNavMovies className="h-5 w-5" />
                        </Link>
                        <Link
                            to="."
                            className="xl:hover:bg-blue-800 xl:rounded-lg xl:p-2 xl:transition-colors"
                        >
                            <IconNavTvSeries className="h-5 w-5" />
                        </Link>
                        <Link
                            to="."
                            className="xl:hover:bg-blue-800 xl:rounded-lg xl:p-2 xl:transition-colors"
                        >
                            <IconNavBookmark className="h-5 w-5" />
                        </Link>
                    </nav>
                </div>
                <div className="xl:flex xl:justify-center">
                    <img
                        src={Avatar}
                        alt="avatar"
                        className="hidden xl:block xl:h-8 xl:w-8 xl:rounded-full xl:border-2 xl:border-white"
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="">
                <div className="container mx-auto px-4 xl:px-0">
                    <div className="md:py-6 xl:py-0">
                        {/* Mobile/Tablet Navigation Bar */}
                        <div className="-mx-4 flex items-center justify-between rounded-lg bg-blue-900 p-4 md:mx-0 xl:hidden">
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
                        </div>
                        <div className="xl:py-8">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    form.handleSubmit();
                                }}
                                className="my-6 md:my-8 xl:mt-0"
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
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Search  for movies or TV series"
                                                className="caret w-full rounded-none border-0 border-b border-transparent bg-transparent px-2 pb-2.5 text-lg text-white caret-red-500 group-hover:border-b group-hover:border-b-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        )}
                                    </form.Field>
                                </div>
                            </form>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
