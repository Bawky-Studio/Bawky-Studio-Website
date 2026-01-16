"use client";

import GameDetail from "../_components/GameDetail";
import { getGameDataByLocale } from "../_data/gameData";

interface GamePageProps {
    params: {
        slug: string;
        locale: string;
    };
}

export default function GamePage({ params }: GamePageProps) {
    const { slug, locale } = params;

    const gameData = getGameDataByLocale(locale);
    const data = gameData[slug];

    if (!data) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-stone-50 text-neutral-500">
                Game not found
            </section>
        );
    }

    return <GameDetail data={data} />;
}
