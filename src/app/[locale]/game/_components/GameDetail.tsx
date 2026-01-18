"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { GameData } from "../_types/GameData";
import { Button, ButtonLink } from "../../../../../components/ui/Button";

interface GameDetailProps {
    data?: GameData;
}

export default function GameDetail({ data }: GameDetailProps) {

    if (!data) {
        return (
            <section
                className="min-h-screen flex items-center justify-center bg-stone-50 text-neutral-500"
                data-nav-theme="light"
            >
                Game not found
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-stone-50 text-black" data-nav-theme="light">
            <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24 md:px-10 lg:px-12">
                <header className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Game</p>
                        <h1 className="text-4xl font-semibold md:text-6xl">{data.title}</h1>
                        <p className="max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
                            {data.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {data.steamUrl ? (
                                <ButtonLink
                                    href={data.steamUrl}
                                    size="md"
                                    className="border-black text-black hover:border-orange-300 hover:text-neutral-950"
                                >
                                    View on Steam
                                </ButtonLink>
                            ) : (
                                <Button
                                    disabled
                                    size="md"
                                    className="border-black text-black/40 hover:bg-transparent hover:text-black/40"
                                >
                                    Steam (Coming Soon)
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="relative w-full">
                        <Image
                            src={data.image}
                            alt={data.title}
                            width={900}
                            height={600}
                            className="w-full rounded-2xl object-cover"
                        />
                    </div>
                </header>

                <div className="mt-20 grid gap-16">
                    <section aria-labelledby="overview-title" className="space-y-4">
                        <h2 id="overview-title" className="text-2xl font-semibold md:text-3xl">
                            Overview
                        </h2>
                        <p className="max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
                            {data.description}
                        </p>
                    </section>

                    <section aria-labelledby="media-title" className="space-y-6">
                        <h2 id="media-title" className="text-2xl font-semibold md:text-3xl">
                            Media
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.trailerUrl && (
                                <div className="aspect-video overflow-hidden rounded-xl bg-black/5">
                                    <iframe
                                        src={data.trailerUrl}
                                        title={`${data.title} Trailer`}
                                        className="h-full w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            <div className="overflow-hidden rounded-xl bg-black/5">
                                <Image
                                    src={data.image}
                                    alt={`${data.title} screenshot`}
                                    width={900}
                                    height={600}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="features-title" className="space-y-6">
                        <h2 id="features-title" className="text-2xl font-semibold md:text-3xl">
                            Features
                        </h2>
                        <ul className="grid gap-3 md:grid-cols-2 text-black/70">
                            {data.features.map((feature) => (
                                <li key={feature} className="border-b border-black/10 pb-3">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="info-title" className="space-y-6">
                        <h2 id="info-title" className="text-2xl font-semibold md:text-3xl">
                            Info
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3 text-black/70">
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                                    Genre
                                </p>
                                <p className="text-base font-medium text-black">{data.genre}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                                    Platform
                                </p>
                                <p className="text-base font-medium text-black">
                                    {data.platform.join(", ")}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                                    Release Date
                                </p>
                                <p className="text-base font-medium text-black">{data.releaseDate}</p>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="links-title" className="space-y-4">
                        <h2 id="links-title" className="text-2xl font-semibold md:text-3xl">
                            Links
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {data.steamUrl && (
                                <ButtonLink
                                    href={data.steamUrl}
                                    size="md"
                                    className="border-black text-black hover:border-orange-300 hover:text-neutral-950"
                                >
                                    Steam Page
                                </ButtonLink>
                            )}
                            <ButtonLink
                                href="/game"
                                size="md"
                                className="border-black text-black hover:border-orange-300 hover:text-neutral-950"
                            >
                                Back to Games
                            </ButtonLink>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
