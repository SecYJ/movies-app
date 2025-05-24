import useEmblaCarousel from "embla-carousel-react";

import { createFileRoute } from "@tanstack/react-router";

import BookmarkIcon from "@/assets/icon-bookmark-empty.svg?react";
import CategoryIcon from "@/assets/icon-category-movie.svg?react";

export const Route = createFileRoute("/_layout/")({
    component: Home,
});

function Home() {
    const [emblaRef] = useEmblaCarousel();
    const trendingData = [
        {
            title: "Beyond Earth",
            year: "2019",
            category: "Movie",
            rating: "PG",
            smallImage: "/thumbnails/beyond-earth/trending/small.jpg",
            largeImage: "/thumbnails/beyond-earth/trending/large.jpg",
        },
        {
            title: "Bottom Gear",
            year: "2021",
            category: "Movie",
            rating: "PG",
            smallImage: "/thumbnails/bottom-gear/trending/small.jpg",
            largeImage: "/thumbnails/bottom-gear/trending/large.jpg",
        },
        {
            title: "Undiscovered Cities",
            year: "2019",
            category: "TV Series",
            rating: "E",
            smallImage: "/thumbnails/undiscovered-cities/trending/small.jpg",
            largeImage: "/thumbnails/undiscovered-cities/trending/large.jpg",
        },
    ];

    return (
        <div>
            <div className="mb-6">
                <h2 className="mb-4 text-xl">Trending</h2>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4">
                        {trendingData.map((item, index) => (
                            <div
                                key={index}
                                className="relative min-w-0 flex-[0_0_240px] md:flex-[0_0_470px]"
                            >
                                <img
                                    src={item.smallImage}
                                    alt={item.title}
                                    className="aspect-video w-full rounded-lg object-cover md:hidden"
                                />
                                <img
                                    src={item.largeImage}
                                    alt={item.title}
                                    className="hidden aspect-video w-full rounded-lg object-cover md:block"
                                />
                                <div className="absolute bottom-4 left-4 space-y-1">
                                    <div className="flex items-center gap-2 [&_p]:text-xs [&_p]:opacity-75">
                                        <p>{item.year}</p>
                                        <div className="size-0.5 rounded-full bg-white/50" />
                                        <CategoryIcon />
                                        <p>{item.category}</p>
                                        <div className="size-0.5 rounded-full bg-white/50" />
                                        <p>{item.rating}</p>
                                    </div>
                                    <p className="text-sm font-medium md:text-2xl">
                                        {item.title}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-blue-950/50"
                                >
                                    <BookmarkIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <h2 className="text-xl">Recommended for you</h2>
                {(() => {
                    const recommendedData = [
                        {
                            image: "/thumbnails/asia-in-24-days/regular/small.jpg",
                            alt: "Asia in 24 Days",
                            year: "2019",
                            category: "Movie",
                            rating: "PG",
                            title: "The Great Lands",
                        },
                        {
                            image: "/thumbnails/the-heiress/regular/small.jpg",
                            alt: "The Heiress",
                            year: "2021",
                            category: "Movie",
                            rating: "PG",
                            title: "The Heiress",
                        },
                        {
                            image: "/thumbnails/off-the-track/regular/small.jpg",
                            alt: "Off the Track",
                            year: "2017",
                            category: "Movie",
                            rating: "18+",
                            title: "Off the Track",
                        },
                        {
                            image: "/thumbnails/whispering-hill/regular/small.jpg",
                            alt: "Whispering Hill",
                            year: "2017",
                            category: "Movie",
                            rating: "E",
                            title: "Whispering Hill",
                        },
                        {
                            image: "/thumbnails/112/regular/small.jpg",
                            alt: "112",
                            year: "2013",
                            category: "TV Series",
                            rating: "PG",
                            title: "112",
                        },
                        {
                            image: "/thumbnails/lone-heart/regular/small.jpg",
                            alt: "Lone Heart",
                            year: "2017",
                            category: "Movie",
                            rating: "E",
                            title: "Lone Heart",
                        },
                    ];

                    return (
                        <ul className="grid grid-cols-2 gap-4">
                            {recommendedData.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative space-y-4 rounded-lg"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.alt}
                                        className="aspect-video w-full rounded-lg object-cover"
                                    />
                                    <div className="flex items-center gap-2 [&_p]:text-xs [&_p]:opacity-75">
                                        <p>{item.year}</p>
                                        <div className="size-0.5 rounded-full bg-white/50" />
                                        <CategoryIcon />
                                        <p>{item.category}</p>
                                        <div className="size-0.5 rounded-full bg-white/50" />
                                        <p>{item.rating}</p>
                                    </div>
                                    <p className="text-sm">{item.title}</p>
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-blue-950/50"
                                    >
                                        <BookmarkIcon />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    );
                })()}
            </div>
        </div>
    );
}
