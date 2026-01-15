"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { GameData } from "../_types/GameData";

interface GameDetailProps {
    data?: GameData;
}

export default function GameDetail({ data }: GameDetailProps) {

    if (!data) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-400">
                Game not found
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-neutral-950 text-white py-24 px-6 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-12 max-w-6xl w-full"
            >
                {/* ---------- LEFT COLUMN ---------- */}
                <div className="flex-1 flex flex-col items-center md:items-start">
                    {/* 포스터 이미지 */}
                    <Image
                        src={data.image}
                        alt={data.title}
                        width={700}
                        height={400}
                        className="rounded-2xl shadow-lg mb-8 object-cover w-full"
                    />

                    {/* 제목 + 설명 */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 text-center md:text-left">
                        {data.title}
                    </h1>
                    <p className="text-neutral-300 mb-10 text-center md:text-left leading-relaxed">
                        {data.description}
                    </p>

                    {/* 정보 섹션 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                        <div>
                            <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
                                Genre
                            </h3>
                            <p>{data.genre}</p>

                            <h3 className="text-2xl font-semibold mt-6 mb-3 text-yellow-300">
                                Platform
                            </h3>
                            <ul className="list-disc list-inside text-neutral-200">
                                {data.platform.map((p) => (
                                    <li key={p}>{p}</li>
                                ))}
                            </ul>

                            <h3 className="text-2xl font-semibold mt-6 mb-3 text-yellow-300">
                                Release Date
                            </h3>
                            <p>{data.releaseDate}</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
                                Features
                            </h3>
                            <ul className="list-disc list-inside text-neutral-200 mb-6">
                                {data.features.map((f) => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
                                Dev Members
                            </h3>
                            <p>{data.team.join(", ")}</p>
                        </div>
                    </div>
                </div>

                {/* ---------- RIGHT COLUMN ---------- */}
                <div className="flex-1 flex flex-col items-center justify-start">
                    {/* 티저 영상 */}
                    {data.trailerUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className="w-full max-w-md aspect-video mb-10 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <iframe
                                src={data.trailerUrl}
                                title={`${data.title} Trailer`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    )}

                    {/* 버튼 영역 */}
                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                        {/* Steam 버튼 */}
                        {data.steamUrl ? (
                            <a
                                href={data.steamUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 transition-all duration-200"
                            >
                                Steam Page
                            </a>
                        ) : (
                            <button
                                disabled
                                className="w-full px-6 py-3 bg-neutral-700 text-neutral-400 font-semibold rounded-md cursor-not-allowed"
                            >
                                Steam Page (Coming Soon)
                            </button>
                        )}

                        {/* 돌아가기 버튼 */}
                        <Link
                            href="/games"
                            className="w-full text-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition-all duration-200"
                        >
                            Back To Projects
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
