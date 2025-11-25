"use client";

import { useEffect, useState } from "react";

export default function GameLoader({ slug }: { slug: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(`Loading WebGL build for ${slug}`);
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div className="w-full flex justify-center items-center">
      {!isLoaded ? (
        <p className="text-neutral-400">Loading game...</p>
      ) : (
        <iframe
          src={`/webgl/${slug}/index.html`}
          className="w-screen h-screen border-none"
          allowFullScreen
        />
      )}
    </div>
  );
}
