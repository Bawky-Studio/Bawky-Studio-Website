// app/games/_types/GameData.ts
export interface GameData {
    title: string;
    image: string;
    description: string;
    genre: string;
    platform: string[];
    releaseDate: string;
    team: string[];
    features: string[];
    trailerUrl?: string; // ✅ YouTube 영상 URL
    steamUrl?: string;   // ✅ Steam 스토어 페이지 URL
}
