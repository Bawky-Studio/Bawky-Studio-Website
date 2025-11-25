"use client";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";


type SubRole = {
    name: string;
    notionUrl: string;
};

type TeamCategory = {
    title: string;
    image: string;
    color: string;
    subRoles: SubRole[];
};

const teamCategories: TeamCategory[] = [
    {
        title: "Development",
        image: "/images/team-dev.png",
        color: "text-white", // 흰 텍스트 + 검은 외곽선
        subRoles: [
            { name: "Web Developer", notionUrl: "https://notion.so/example-web" },
            { name: "Client Developer", notionUrl: "https://notion.so/example-client" },
            { name: "Server Developer", notionUrl: "https://notion.so/example-server" },
        ],
    },
    {
        title: "Art",
        image: "/images/team-art.png",
        color: "text-white",
        subRoles: [
            { name: "Character Artist", notionUrl: "https://notion.so/example-character" },
            { name: "Background Artist", notionUrl: "https://notion.so/example-background" },
        ],
    },
    {
        title: "Design",
        image: "/images/team-design.png",
        color: "text-white",
        subRoles: [
            { name: "Story Planner", notionUrl: "https://notion.so/example-story" },
            { name: "Game System Designer", notionUrl: "https://notion.so/example-system" },
            { name: "Level Designer", notionUrl: "https://notion.so/example-level" },
        ],
    },
];

export default function Team() {
    const locale = useLocale();
    const t = useTranslations("teams");

    return (
<div className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center px-4">
            {/* 🎬 Title */}
            <motion.h1
                className="text-5xl md:text-6xl font-press text-accent drop-shadow-[0_0_10px_#FBBF24] mb-10 animate-neonPulse text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                JOIN OUR TEAM
            </motion.h1>

            <motion.p
                className="text-gray-300 font-outfit text-center max-w-2xl mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                dangerouslySetInnerHTML={{ __html: t.raw("title") }}
            />


            {/* 💼 카드 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {teamCategories.map((cat, index) => (
                    <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-2xl border border-[#5B21B6]/40 shadow-neon hover:shadow-accent/40 hover:scale-[1.04] transition-all duration-300 cursor-pointer aspect-square"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        {/* 배경 이미지 */}
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:opacity-40"
                        />

                        {/* 기본 타이틀 (최하단 중앙 + 검은 외곽선 효과) */}
                        <div className="absolute bottom-4 left-0 w-full text-center transition-all duration-500 group-hover:opacity-0">
                            <h2
                                className={`text-4xl sm:text-5xl font-press ${cat.color}`}
                                style={{
                                    textShadow: `
                                        -2px 0 0 #000,
                                         2px 0 0 #000,
                                         0 -2px 0 #000,
                                         0 2px 0 #000
                                    `,
                                }}
                            >
                                {cat.title}
                            </h2>
                        </div>

                        {/* 오버레이 콘텐츠 (호버 시 나타남) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h2
                                className={`text-3xl font-press mb-4 ${cat.color}`}
                                style={{
                                    textShadow: `
                                        -2px 0 0 #000,
                                         2px 0 0 #000,
                                         0 -2px 0 #000,
                                         0 2px 0 #000
                                    `,
                                }}
                            >
                                {cat.title}
                            </h2>
                            {cat.subRoles.map((sub, i) => (
                                <motion.a
                                    key={i}
                                    href={sub.notionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-outfit text-base sm:text-lg text-gray-300 my-1 px-5 py-2 rounded-full border border-accent/50 transition-all duration-200 hover:text-accent hover:border-accent hover:shadow-[0_0_15px_#FBBF24]"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {sub.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 뒤로가기 */}
            <Link
                href={`/${locale}/about`}
                className="mt-20 text-secondary underline underline-offset-4 hover:text-accent transition-colors text-center"
            >
                ← Back to About Us
            </Link>
        </div>
    );
}
