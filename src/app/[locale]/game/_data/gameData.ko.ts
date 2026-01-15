import { GameData } from "../_types/GameData";

export const gameDataKo: Record<string, GameData> = {
    duel: {
        title: "BETDOWN: DUEL & BET",
        image: "/images/betdown_duel.png",
        description: "실시간 심리전 기반의 결투 & 베팅 멀티플레이 게임",
        genre: "심리전 / 멀티플레이 / PvP",
        platform: ["Steam (예정)", "Windows"],
        releaseDate: "TBA",
        team: ["BawkZilla", "LilHyuki", "Chicken_Triceps", "Ika"],
        features: [
            "실시간 1vs1 결투 시스템",
            "베팅 기반 관전자 경제 시스템",
            "랜덤 룰 전투 모드",
        ],
        trailerUrl: "https://www.youtube.com/embed/your_video_id", 
        steamUrl: "",
    },
    fataldraw: {
        title: "BETDOWN: FATALDRAW",
        image: "/images/betdown_quickdraw.png",
        description:
            "서부 도박 세계에서 리스크를 쏘고, 운명을 정산하라",
        genre: "3D 로그라이크 / 슈터 / 도박",
        platform: ["Steam (예정)", "Windows"],
        releaseDate: "2026년 2월 예정",
        team: ["BawkZilla", "LilHyuki"],
        features: [
            "독창적 전투 시스템",
            "독특한 성장·보상 구조",
            "Juno & Rosalyn : 두 캐릭터의 리스크 스타일",
            "2인 Co-op",
            "서부풍 3D 쿼터뷰 아레나와 긴장감 있는 전투 연출",
        ],
        trailerUrl: "https://www.youtube.com/embed/your_video_id",
        steamUrl: "",
    },
};
