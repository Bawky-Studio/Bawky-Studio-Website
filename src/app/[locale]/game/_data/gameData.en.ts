// app/games/_data/gameData.en.ts
import { GameData } from "../_types/GameData";

export const gameDataEn: Record<string, GameData> = {
    duel: {
        title: "BETDOWN: DUEL & BET",
        image: "/images/betdown_duel.png",
        description: "A real-time psychological duel and betting multiplayer game",
        genre: "Mind Game / Multiplayer / PvP",
        platform: ["Steam (Planned)", "Windows"],
        releaseDate: "TBA",
        team: ["BawkZilla", "LilHyuki", "Chicken_Triceps", "Ika"],
        features: [
            "1v1 real-time duel system",
            "Bet-based spectator economy",
            "Random rule battle mode",
        ],
        trailerUrl: "https://www.youtube.com/embed/your_video_id",
        steamUrl: "",
    },
    fataldraw: {
        title: "BETDOWN: FATALDRAW",
        image: "/images/betdown_quickdraw.png",
        description:
            "Shoot your risk and settle your fate in the Western world of bets",
        genre: "3D Roguelike / Deck-Building / Gambling",
        platform: ["Steam (Planned)", "Windows"],
        releaseDate: "Planned for February 2026",
        team: ["BawkZilla", "LilHyuki"],
        features: [
            "Unique risk-based combat system",
            "Distinct growth and reward structure",
            "Two play styles : Juno & Rosalyn",
            "2-player Co-op",
            "Stylized 3D Western arenas with intense atmosphere",
        ],
        trailerUrl: "https://www.youtube.com/embed/your_video_id",
        steamUrl: "",
    },
};
