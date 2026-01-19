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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const containerHeight = container.clientHeight;
    if (containerHeight === 0) {
      return;
    }
    const currentIndex = Math.round(container.scrollTop / containerHeight);
    setActiveIndex(currentIndex);
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

  const handleDotClick = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>("[data-game-snap='true']")
      );
      const target = sections[index];
      if (!target) {
        return;
      }
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  return (
    <main className="relative flex h-[100svh] flex-col overflow-hidden">
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onScroll={handleScroll}
        className="hide-scrollbar h-full w-full snap-y snap-mandatory overflow-y-auto scroll-smooth motion-reduce:scroll-auto"
      >
        {games.map((game) => (
          <section
            key={game.id}
            data-game-snap="true"
            data-nav-theme="light"
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
                <ButtonLink href={game.href} variant="black" size="md">
                  View details
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div
        className="fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3"
        aria-label="Game pagination"
      >
        {games.map((game, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={`${game.id}-dot`}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Go to ${game.title}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-3 w-3 rounded-full border transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandy-brown-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isActive
                  ? "border-sandy-brown-500 bg-sandy-brown-500"
                  : "border-parchment-50/60 bg-parchment-50 opacity-70 hover:opacity-100"
              }`}
            />
          );
        })}
      </div>
    </main>
  );
}
