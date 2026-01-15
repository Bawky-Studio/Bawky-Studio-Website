"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AvgNumberEventPage() {
    const [number, setNumber] = useState("");
    const [youtubeId, setYoutubeId] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const [progress, setProgress] = useState(100);
    const [isEventEnded, setIsEventEnded] = useState(false);
    const t = useTranslations("events.avg-number");

    /** ✅ 이벤트 기간 설정 */
    const eventStart = new Date("2025-10-27T18:00:00+09:00");
    const eventEnd = new Date("2025-11-02T18:00:00+09:00");
    const videoUrl = "https://www.youtube.com/embed/YANyxTLoMeo";

    // ⏰ 남은 시간 & 진행률 갱신
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = eventEnd.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft(t("timer.ended"));
                setProgress(0);
                setIsEventEnded(true);
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeLeft(`${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s left.`);

            const total = eventEnd.getTime() - eventStart.getTime();
            setProgress(Math.max(0, Math.min(100, (diff / total) * 100)));
        }, 1000);

        return () => clearInterval(timer);
    }, [t]);

    // 🎯 제출 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!youtubeId.trim()) {
            setMessage(t("errors.missingYoutube"));
            setStatus("error");
            return;
        }
        if (!/^@[\p{L}\p{N}._-]{3,}$/u.test(youtubeId.trim())) {
            setMessage(t("errors.invalidYoutube"));
            setStatus("error");
            return;
        }
        if (!number.trim()) {
            setMessage(t("errors.missingNumber"));
            setStatus("error");
            return;
        }

        const num = Number(number);
        if (isNaN(num)) {
            setMessage(t("errors.notNumber"));
            setStatus("error");
            return;
        }
        if (num < 1 || num > 100000) {
            setMessage(t("errors.outOfRange"));
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/events/avg-number/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: num, youtubeId }),
            });

            const data = await res.json();
            if (!data.success) {
                setMessage(data.message || t("errors.serverError"));
                setStatus("error");
            } else {
                setMessage("");
		setMessage(data.message || t("success.message"));
                setStatus("done");
            }
        } catch {
            setMessage(t("errors.serverError"));
            setStatus("error");
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center px-6 py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* 🏁 타이틀 */}
            <motion.h1
                className="text-5xl md:text-6xl font-press text-accent drop-shadow-[0_0_15px_#FBBF24] mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {t("title")}
            </motion.h1>

            {/* ⏱ 남은시간 & 진행바 */}
            <div className="w-full max-w-sm mb-8">
                <p className="text-sm text-gray-400 mb-2">{timeLeft}</p>
                <div className="w-full h-2 bg-[#1A2335] rounded-full overflow-hidden border border-[#00FFFF]/30">
                    <div
                        className="h-full bg-gradient-to-r from-[#FBBF24] to-[#00FFFF] transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {isEventEnded ? (
                /* 이벤트 종료 메시지 + 결과 영역 */
                <>
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <p className="text-3xl md:text-4xl font-press text-accent drop-shadow-[0_0_15px_#FBBF24]">
                            {t("eventEnded.title")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="w-full max-w-md aspect-video mb-10 rounded-xl overflow-hidden shadow-2xl"
                    >
                        <iframe
                            src={videoUrl}
                            title="Event Result"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </motion.div>

                    {/* 전체 평균 한 줄 */}
                    <div className="w-full max-w-3xl mb-6">
                        <div className="flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-[#0F172A]/70 px-5 py-4 shadow-[0_0_10px_rgba(0,255,255,0.12)]">
                            <span className="text-sm md:text-base text-gray-300">
                                {t("results.overallAverage.label")}
                            </span>
                            <span className="text-xl md:text-2xl font-press text-yellow-300 drop-shadow-[0_0_10px_#FBBF24]">
                                {t("results.overallAverage.value")}
                            </span>
                        </div>
                    </div>

                    {/* 결과 카드 2개 */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        {/* 평균에 가장 가까운 참가자 */}
                        <div className="rounded-2xl border border-accent/30 bg-[#0F172A]/70 p-6 shadow-[0_0_12px_rgba(0,255,255,0.15)]">
                            <h3 className="font-press text-xl md:text-2xl text-yellow-300 drop-shadow-[0_0_10px_#FBBF24] mb-4">
                                {t("results.avgClosest.title")}
                            </h3>
                            <div className="space-y-3 text-left">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-gray-400">{t("results.labels.participantId")}</span>
                                    <span className="text-base md:text-lg font-semibold text-white break-all">
                                        {/* 값 주입 예정 */}
                                        {t("results.avgClosest.username")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-gray-400">{t("results.labels.submittedNumber")}</span>
                                    <span className="text-base md:text-lg font-semibold text-white">
                                        {/* 값 주입 예정 */}
                                        {t("results.avgClosest.number")}
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <span className="text-sm text-gray-400">{t("results.labels.note")}</span>
                                    <span className="text-sm md:text-base text-gray-300 text-right">
                                        {/* 값 주입 예정 */}
                                        {t("results.avgClosest.description")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 가장 작은 유일값 참가자 */}
                        <div className="rounded-2xl border border-accent/30 bg-[#0F172A]/70 p-6 shadow-[0_0_12px_rgba(0,255,255,0.15)]">
                            <h3 className="font-press text-xl md:text-2xl text-yellow-300 drop-shadow-[0_0_10px_#FBBF24] mb-4">
                                {t("results.lowestUnique.title")}
                            </h3>
                            <div className="space-y-3 text-left">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-gray-400">{t("results.labels.participantId")}</span>
                                    <span className="text-base md:text-lg font-semibold text-white break-all">
                                        {/* 값 주입 예정 */}
                                        {t("results.lowestUnique.username")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-gray-400">{t("results.labels.submittedNumber")}</span>
                                    <span className="text-base md:text-lg font-semibold text-white">
                                        {/* 값 주입 예정 */}
                                        {t("results.lowestUnique.number")}
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <span className="text-sm text-gray-400">{t("results.labels.note")}</span>
                                    <span className="text-sm md:text-base text-gray-300 text-right">
                                        {/* 값 주입 예정 */}
                                        {t("results.lowestUnique.description")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </>
            ) : (
                <>
                    {/* 설명 */}
                    <motion.p
                        className="text-gray-300 font-outfit max-w-lg mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        dangerouslySetInnerHTML={{ __html: t.raw("description") }}
                    />

                    {/* 안내 */}
                    <motion.div
                        className="text-gray-400 text-sm bg-[#0F172A]/70 border border-[#00FFFF]/20 rounded-xl p-6 mb-8 text-left max-w-sm w-full shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="mb-1">{t("guidelines.title")}</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {t.raw("guidelines.rules").map((rule: string, i: number) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: rule }} />
                            ))}
                        </ul>
                    </motion.div>

                    {/* 입력 폼 */}
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="bg-[#0F172A]/70 border border-accent/30 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                    >
                        <input
                            type="text"
                            value={youtubeId}
                            onChange={(e) => setYoutubeId(e.target.value)}
                            placeholder={t("form.youtubePlaceholder")}
                            className="w-full px-4 py-3 rounded-lg text-white text-lg bg-[#1A2335]/80 border border-[#00FFFF]/30 shadow-[0_0_10px_rgba(0,255,255,0.2)] outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] placeholder:text-gray-400 transition-all duration-200"
                        />

                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder={t("form.numberPlaceholder")}
                            className="w-full px-4 py-3 rounded-lg text-white text-lg bg-[#1A2335]/80 border border-[#00FFFF]/30 shadow-[0_0_10px_rgba(0,255,255,0.2)] outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] placeholder:text-gray-400 transition-all duration-200"
                            min="0"
                            max="100000"
                        />

                        <button
                            type="submit"
                            disabled={status === "loading" || isEventEnded}
                            className="w-full py-3 bg-gradient-to-b from-[#FFD84C] to-[#FBBF24] text-black font-semibold rounded-lg hover:scale-105 hover:shadow-[0_0_15px_#FBBF24] transition-all duration-150 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                            {status === "loading" ? t("form.submitting") : t("form.submit")}
                        </button>
                    </form>
                </>
            )}

            {/* 메시지 */}
            {message && (
            <motion.p
                key={message} // 메시지 바뀔 때마다 트리거
                className={`mt-8 text-sm font-semibold ${
                status === "error" ? "text-red-400" : "text-gray-300"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                opacity: 1,
                scale: status === "error" ? [1, 1.2, 1] : 1,
                color: status === "error" ? "#f87171" : "#00ff37ff"
                }}
                transition={{
                duration: status === "error" ? 0.6 : 0.3,
                ease: "easeOut",
                }}
            >
                {message}
            </motion.p>
            )}

            {/* 뒤로가기 버튼 */}
            <Link
                href="/events"
                className="mt-16 inline-block px-6 py-3 rounded-lg border border-accent/40 text-accent font-press hover:text-yellow-300 hover:border-yellow-300 transition-all duration-200"
            >
                {t("form.back")}
            </Link>
        </motion.div>
    );
}