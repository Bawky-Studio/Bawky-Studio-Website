"use client";

import dynamic from "next/dynamic";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

const GameLoader = dynamic<{ slug: string }>(
  () => import("./gameLoader"),
  { ssr: false }
);

export default function GamePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const router = useRouter();

  if (slug !== "quickdraw") return notFound();

  // ✅ ESC 키 이벤트 등록
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const confirmExit = window.confirm("게임을 종료하고 메인으로 돌아가시겠습니까?");
        if (confirmExit) router.push("/games");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        BETDOWN: QUICKDRAW
      </h1>
      <GameLoader slug={slug} />
      <p className="text-neutral-500 text-sm mt-6">
        [ESC] 키를 눌러 게임을 종료할 수 있습니다.
      </p>
    </main>
  );
}
