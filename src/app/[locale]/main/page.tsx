"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <GameSection />
      <NoticeSection />
      <MediaSection />
    </main>
  );
}

function HeroSection() {
  const games = [
    {
      id: "game-01",
      title: "Betdown : FatalDraw",
      videoSrc: "/videos/hero-placeholder-01.mp4",
      poster: "/images/hero-placeholder-01.jpg",
    },
    {
      id: "game-02",
      title: "Betdown : Dual & Bet",
      videoSrc: "/videos/hero-placeholder-02.mp4",
      poster: "/images/hero-placeholder-02.jpg",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const activeGame = useMemo(() => games[activeIndex], [games, activeIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % games.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [games.length, isPaused, reduceMotion]);

  return (
    <Section
      as="header"
      variant="full"
      className="relative overflow-hidden bg-neutral-950 text-white"
      fullHeight
    >
      <div className="absolute inset-0">
        <video
          key={activeGame.videoSrc}
          className="h-full w-full object-cover"
          src={activeGame.videoSrc}
          poster={activeGame.poster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container>
        <div className="relative z-10 flex min-h-[60vh] items-end py-20 md:py-28">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {activeGame.title}
          </h1>
        </div>

        <div
          className="relative z-10 pb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="flex gap-3 overflow-x-auto pb-2">
            {games.map((game, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`min-w-[180px] rounded-md border px-4 py-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive
                      ? "border-white/60 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:text-white"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="font-semibold">{game.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function GameSection() {
  const games = [
    {
      id: "featured-01",
      title: "Betdown : FatalDraw",
      description: "A moody sci-fi journey built around survival and discovery.",
      images: ["Visual Placeholder A", "Visual Placeholder B"],
      href: "/games/fataldraw",
    },
    {
      id: "featured-02",
      title: "Betdown : Dual & Bet",
      description: "A tactical dark fantasy with weighty choices and outcomes.",
      images: ["Visual Placeholder A", "Visual Placeholder B"],
      href: "/games/duel",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = games[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % games.length);
  };

  return (
    <Section aria-labelledby="game-intro-title" className="bg-neutral-200 text-black" fullHeight>
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 id="game-intro-title" className="text-4xl font-semibold md:text-5xl">
              {activeGame.title}
            </h2>
            <p className="text-base text-black/70 md:text-lg">{activeGame.description}</p>
          </div>
          <a
            href={activeGame.href}
            className="inline-flex items-center text-base font-medium text-black underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            View game details
          </a>
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/30 text-black/80 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Previous game"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/30 text-black/80 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Next game"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative min-h-[360px] md:min-h-[420px]">
          <div className="absolute inset-0 rounded-lg border border-black/10 bg-black/5" />
          <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-black/50">
            {activeGame.images[0]}
          </div>
          <div className="absolute -bottom-6 right-6 h-36 w-48 rounded-md border border-black/20 bg-black/10 md:-bottom-8 md:h-44 md:w-60">
            <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-black/60">
              {activeGame.images[1]}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function NoticeSection() {
  const notices = [
    {
      id: "notice-01",
      title: "Launch window announcement",
      date: "2025-03-18",
      href: "/events/notice-01",
    },
    {
      id: "notice-02",
      title: "Studio update: new team members",
      date: "2025-02-02",
      href: "/events/notice-02",
    },
    {
      id: "notice-03",
      title: "Closed playtest sign-ups",
      date: "2025-01-20",
      href: "/events/notice-03",
    },
    {
      id: "notice-04",
      title: "Developer diary #12",
      date: "2024-12-08",
      href: "/events/notice-04",
    },
    {
      id: "notice-05",
      title: "Community Q&A recap",
      date: "2024-11-11",
      href: "/events/notice-05",
    },
  ];

  return (
    <Section
      aria-labelledby="news-title"
      className="bg-stone-50 text-black"
      containerClassName="max-w-[1200px]"
    >
      <div className="space-y-12">
        <div className="space-y-3 text-center">
          <h2 id="news-title" className="text-2xl font-semibold md:text-4xl">
            Notices
          </h2>
        </div>
        <ul className="divide-y divide-black/10">
          {notices.map((notice) => (
            <li key={notice.id}>
              <a
                href={notice.href}
                className="flex flex-col gap-3 py-6 transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:flex-row md:items-center md:justify-between"
              >
                <span className="text-xl font-semibold md:text-2xl">{notice.title}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-black/50">
                  {notice.date}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function MediaSection() {
  return (
    <Section
      aria-labelledby="media-title"
      className="relative overflow-hidden bg-stone-50 text-black"
      containerClassName="max-w-[1200px]"
    >
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-neutral-200" />
        <div
          className="absolute inset-0 bg-black/5"
          style={{
            clipPath: "polygon(0 0, 62% 0, 48% 100%, 0 100%)",
          }}
        />
      </div>
      <div className="relative flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-16 md:items-start">
        <div className="space-y-6 md:pr-6 md:self-start">
          <div className="space-y-2">
            <h2 id="media-title" className="text-2xl font-semibold md:text-4xl">
              YouTube
            </h2>
          </div>
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/10">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/SCPgPNry_9M?si=yYaTKD6Y6VCqJvH2"
                title="YouTube video placeholder 1"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/10">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/UxE7nesuvUM?si=NyYZdBp70_e-pb51"
                title="YouTube video placeholder 2"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 md:mt-16 md:pl-6 md:self-end text-right">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold md:text-4xl">Devlog</h2>
          </div>
          <div className="space-y-4">
            <article className="space-y-2">
              <h3 className="text-lg font-semibold">Lighting pass: week 06</h3>
              <p className="text-sm text-black/70">
                A quick look at how mood shifts with new volumetric lighting.
              </p>
              <a
                href="/events"
                className="inline-flex items-center text-sm font-medium text-black/80 underline underline-offset-4 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Read the post
              </a>
            </article>
            <article className="space-y-2">
              <h3 className="text-lg font-semibold">Combat tuning notes</h3>
              <p className="text-sm text-black/70">
                Balancing the rhythm of encounters without losing weight.
              </p>
              <a
                href="/events"
                className="inline-flex items-center text-sm font-medium text-black/80 underline underline-offset-4 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Read the post
              </a>
            </article>
          </div>
        </div>
      </div>
    </Section>
  );
}

type SectionProps = {
  as?: "section" | "header";
  children: ReactNode;
  variant?: "full" | "contained";
  "aria-labelledby"?: string;
  className?: string;
  fullHeight?: boolean;
  containerClassName?: string;
};

function Section({
  as = "section",
  children,
  variant = "contained",
  className,
  fullHeight = false,
  containerClassName,
  ...rest
}: SectionProps) {
  const Component = as;
  const content =
    variant === "contained" ? <Container className={containerClassName}>{children}</Container> : children;
  return (
    <Component
      {...rest}
      className={[
        "w-full py-16 md:py-24 lg:py-28",
        fullHeight ? "min-h-[100svh]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {content}
    </Component>
  );
}

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
