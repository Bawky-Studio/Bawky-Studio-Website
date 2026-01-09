import type { ReactNode } from "react";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <GameIntroSection />
      <NewsSection />
      <MediaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <Section as="header" variant="full">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <h1>Studio Name Placeholder</h1>
            <p>Short tagline placeholder describing the studio.</p>
          </div>
          <div className="space-y-3">
            <p>Primary call to action placeholder.</p>
            <p>Secondary call to action placeholder.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function GameIntroSection() {
  return (
    <Section aria-labelledby="game-intro-title">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 id="game-intro-title">Featured Game Placeholder</h2>
          <p>One sentence placeholder describing the flagship game.</p>
        </div>
        <div>
          <p>Media slot placeholder.</p>
        </div>
      </div>
    </Section>
  );
}

function NewsSection() {
  return (
    <Section aria-labelledby="news-title">
      <div className="space-y-10">
        <div className="space-y-3">
          <h2 id="news-title">News Placeholder</h2>
          <p>Short intro text placeholder for announcements.</p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          <li>
            <article className="space-y-2">
              <h3>Announcement Placeholder</h3>
              <p>Brief summary placeholder for a recent update.</p>
            </article>
          </li>
          <li>
            <article className="space-y-2">
              <h3>Update Placeholder</h3>
              <p>Brief summary placeholder for a community or event item.</p>
            </article>
          </li>
        </ul>
      </div>
    </Section>
  );
}

function MediaSection() {
  return (
    <Section aria-labelledby="media-title">
      <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div className="space-y-4">
          <h2 id="media-title">Media Placeholder</h2>
          <p>Short intro text placeholder for videos and posts.</p>
        </div>
        <div className="space-y-3">
          <p>Video embed placeholder.</p>
          <p>Blog link placeholder.</p>
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
};

function Section({ as = "section", children, variant = "contained", ...rest }: SectionProps) {
  const Component = as;
  const content = variant === "contained" ? <Container>{children}</Container> : children;
  return (
    <Component
      {...rest}
      className="w-full py-16 md:py-24 lg:py-28"
    >
      {content}
    </Component>
  );
}

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">{children}</div>;
}
