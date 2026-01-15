import { gameDataKo } from "./gameData.ko";
import { gameDataEn } from "./gameData.en";
import { GameData } from "../_types/GameData";

export const getGameDataByLocale = (locale: string): Record<string, GameData> => {
    switch (locale) {
        case "en":
            return gameDataEn;
        case "ko":
        default:
            return gameDataKo;
    }
};
