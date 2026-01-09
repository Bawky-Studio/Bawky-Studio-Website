import type { ReactNode } from "react";

export default function HomePage() {
  return (
    <main className="flex flex-col snap-y snap-proximity scroll-pt-24 motion-reduce:snap-none">
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
      <div className="w-full border-b border-neutral-200 bg-neutral-50">
        <Container>
          <div className="grid gap-10 py-20 md:grid-cols-[1.3fr_0.7fr] md:items-end md:py-28">
            <div className="space-y-5">
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Bawky Studio Placeholder Title
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
                A short supporting line that sets the tone for the studio’s world and
                highlights its focus on immersive game experiences.
              </p>
            </div>
            <div className="md:justify-self-end">
              <a className="inline-flex items-center text-sm font-medium text-neutral-900 underline underline-offset-4">
                Explore the latest release
              </a>
            </div>
          </div>
        </Container>
      </div>
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
      className="min-h-screen w-full snap-start scroll-mt-24 py-16 md:py-24 lg:py-28"
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
