"use client";

import React from "react";
import { useTranslations } from "next-intl";
import GameDetail from "../_components/GameDetail";
import { getGameDataByLocale } from "../_data/gameData";

interface GamePageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export default function GamePage({ params }: GamePageProps) {
    const t = useTranslations("gameDetail");
    const { slug, locale } = React.use(params);

    const gameData = getGameDataByLocale(locale);
    const data = gameData[slug];

    if (!data) {
        return (
            <section
                className="min-h-screen flex items-center justify-center bg-stone-50 text-neutral-500"
                data-nav-theme="light"
            >
                {t("notFound")}
            </section>
        );
    }

    return <GameDetail data={data} />;
}
