// app/games/[slug]/layout.tsx
export default function GameLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="bg-black text-white overflow-hidden">
          {children}
        </body>
      </html>
    );
  }
  