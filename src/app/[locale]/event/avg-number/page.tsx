"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, ButtonLink } from "../../../../../components/ui/Button";

export default function AvgNumberEventPage() {
    const [number, setNumber] = useState("");
    const [youtubeId, setYoutubeId] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const [progress, setProgress] = useState(100);
    const [isEventEnded, setIsEventEnded] = useState(false);
    const t = useTranslations("event.avg-number");

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
        <div className="min-h-screen bg-neutral-50 text-neutral-900" data-nav-theme="light">
            <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-20">
                <header className="text-center">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
                        {t("title")}
                    </h1>
                    <p
                        className="mt-6 text-base md:text-lg text-neutral-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t.raw("description") }}
                    />
                    <div className="mt-8 flex flex-col items-center gap-3">
                        <p className="text-sm text-neutral-500">{timeLeft}</p>
                        <div className="w-full max-w-sm">
                            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-neutral-900 transition-all duration-700 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {isEventEnded ? (
                    <section className="mt-16 flex flex-col gap-10">
                        <h2 className="text-2xl md:text-3xl font-semibold text-center">
                            {t("eventEnded.title")}
                        </h2>

                        <div className="w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                            <iframe
                                src={videoUrl}
                                title="Event Result"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="w-full max-w-3xl mx-auto">
                            <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-5">
                                <span className="text-sm text-neutral-500">
                                    {t("results.overallAverage.label")}
                                </span>
                                <span className="text-xl md:text-2xl font-semibold text-neutral-900">
                                    {t("results.overallAverage.value")}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">
                                    {t("results.avgClosest.title")}
                                </h3>
                                <div className="space-y-3 text-left">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">{t("results.labels.participantId")}</span>
                                        <span className="text-base md:text-lg font-semibold text-neutral-900 break-all">
                                            {t("results.avgClosest.username")}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">{t("results.labels.submittedNumber")}</span>
                                        <span className="text-base md:text-lg font-semibold text-neutral-900">
                                            {t("results.avgClosest.number")}
                                        </span>
                                    </div>
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-neutral-500">{t("results.labels.note")}</span>
                                        <span className="text-sm md:text-base text-neutral-600 text-right">
                                            {t("results.avgClosest.description")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">
                                    {t("results.lowestUnique.title")}
                                </h3>
                                <div className="space-y-3 text-left">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">{t("results.labels.participantId")}</span>
                                        <span className="text-base md:text-lg font-semibold text-neutral-900 break-all">
                                            {t("results.lowestUnique.username")}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-neutral-500">{t("results.labels.submittedNumber")}</span>
                                        <span className="text-base md:text-lg font-semibold text-neutral-900">
                                            {t("results.lowestUnique.number")}
                                        </span>
                                    </div>
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-neutral-500">{t("results.labels.note")}</span>
                                        <span className="text-sm md:text-base text-neutral-600 text-right">
                                            {t("results.lowestUnique.description")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
                        <div className="flex flex-col gap-6">
                            <div className="text-sm text-neutral-600 border border-neutral-200 rounded-2xl p-6 bg-white">
                                <p className="mb-2 font-semibold text-neutral-900">{t("guidelines.title")}</p>
                                <ul className="list-disc list-inside space-y-1">
                                    {t.raw("guidelines.rules").map((rule: string, i: number) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: rule }} />
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="border border-neutral-200 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6 bg-white"
                        >
                            <input
                                type="text"
                                value={youtubeId}
                                onChange={(e) => setYoutubeId(e.target.value)}
                                placeholder={t("form.youtubePlaceholder")}
                                className="w-full px-4 py-3 rounded-lg text-neutral-900 text-base bg-white border border-neutral-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 placeholder:text-neutral-400"
                            />

                            <input
                                type="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder={t("form.numberPlaceholder")}
                                className="w-full px-4 py-3 rounded-lg text-neutral-900 text-base bg-white border border-neutral-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 placeholder:text-neutral-400"
                                min="0"
                                max="100000"
                            />

                            <Button
                                type="submit"
                                disabled={status === "loading" || isEventEnded}
                                className="w-full border-neutral-300 text-neutral-900 hover:border-orange-300"
                            >
                                {status === "loading" ? t("form.submitting") : t("form.submit")}
                            </Button>
                        </form>
                    </section>
                )}

                {message && (
                    <p
                        className={`mt-8 text-sm font-semibold ${
                            status === "error" ? "text-red-500" : "text-neutral-700"
                        }`}
                    >
                        {message}
                    </p>
                )}

                <div className="mt-16 flex justify-center">
                    <ButtonLink
                        href="/event"
                        size="sm"
                        className="border-neutral-300 text-neutral-900 hover:border-orange-300"
                    >
                        {t("form.back")}
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
}
