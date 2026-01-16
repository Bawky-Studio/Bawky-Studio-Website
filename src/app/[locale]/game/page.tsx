"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "../../../../components/ui/Button";

const games = [
  {
    id: "home-game-01",
    title: "Betdown: FatalDraw",
    description: "A fast-paced duel of probability and precision.",
    backgroundImage: "/images/betdown_quickdraw.png",
    href: "/game/fataldraw",
    tone: "bg-stone-50 text-black",
  },
  {
    id: "home-game-02",
    title: "Betdown: Duel & Bet",
    description: "A strategic showdown built for high-stakes rounds.",
    backgroundImage: "/images/betdown_duel.png",
    href: "/game/duel",
    tone: "bg-neutral-100 text-black",
  },
];

export default function GamePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (reduceMotion) {
        return;
      }
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>("[data-game-snap='true']")
      );
      if (sections.length === 0) {
        return;
      }
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const currentIndex = Math.round(scrollTop / containerHeight);

      if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        event.preventDefault();
        if (lockRef.current) {
          return;
        }
        lockRef.current = true;
        sections[currentIndex + 1].scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
        });
        window.setTimeout(() => {
          lockRef.current = false;
        }, 600);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        event.preventDefault();
        if (lockRef.current) {
          return;
        }
        lockRef.current = true;
        sections[currentIndex - 1].scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
        });
        window.setTimeout(() => {
          lockRef.current = false;
        }, 600);
      }
    },
    [reduceMotion]
  );

  return (
    <main className="flex flex-col">
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="h-[100svh] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth motion-reduce:scroll-auto"
      >
        {games.map((game) => (
          <section
            key={game.id}
            data-game-snap="true"
            aria-labelledby={`${game.id}-title`}
            className={`relative min-h-[100svh] w-full snap-start overflow-hidden ${game.tone}`}
          >
            <div className="absolute inset-0 z-0">
              <img
                src={game.backgroundImage}
                alt=""
                className="h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-white/35" />
            </div>
            <div className="relative z-10 mx-auto flex h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16 text-center text-black md:gap-16 md:px-10 lg:px-12">
              <div className="space-y-5">
                <h1 id={`${game.id}-title`} className="text-4xl font-semibold md:text-5xl">
                  {game.title}
                </h1>
                <p className="max-w-xl text-base text-black/80 md:text-lg">
                  {game.description}
                </p>
                <ButtonLink href={game.href} size="md">
                  View details
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
