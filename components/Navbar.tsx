"use client";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  {
    href: "/game",
    label: "Game",
    children: [
      { href: "/game", label: "Betdown: Fataldraw" },
      { href: "/game", label: "Betdown: Duel & Bet" },
    ],
  },
  {
    href: "/software",
    label: "Software",
    children: [
      { href: "/software", label: "Kalivra" },
    ],
  },
  {
    href: "/event",
    label: "Event",
    children: [
      { href: "/event", label: "Guess the Average" },
    ],
  },
  {
    href: "/studio",
    label: "Studio",
    children: [
      { href: "/studio/notice", label: "Notice" },
      { href: "/studio/devlog", label: "DevLog" },
    ],
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const switchLocale = locale === "en" ? "ko" : "en";
  const currentPath = pathname || "/";
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const lastFocusedRef = useRef<HTMLAnchorElement | null>(null);
  const topLevelRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const openMenu = (label: string) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveItem(label);
    setIsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const closeMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveItem(null);
    }
  }, [isOpen]);

  // --- 스타일 로직 분리 ---
  // isOpen 상태에 따라 테마 색상 결정
  const themeClass = isOpen
    ? "bg-white text-neutral-900 border-black/10" // 열렸을 때: 흰 배경, 검은 글씨, 연한 검은 테두리
    : "bg-transparent text-white border-white/15"; // 닫혔을 때: 투명 배경, 흰 글씨, 연한 흰 테두리

  return (
    <nav
      // 1. themeClass 적용 및 transition-colors 추가로 부드러운 색상 전환
      className={`fixed top-0 left-0 z-50 hidden w-full border-b transition-colors duration-300 md:block ${themeClass}`}
      onMouseEnter={() => {
        if (closeTimeoutRef.current) {
          window.clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }}
      onMouseLeave={scheduleClose}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeMenu();
        }
      }}
      onKeyDownCapture={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeMenu();
          lastFocusedRef.current?.focus();
        }
      }}
    >
      <div className="mx-0 flex w-full items-center px-6 py-5">
        <div className="flex-1">
          <Link
            href="/"
            locale={locale}
            // text-white 강제 지정 제거 -> 부모 색상 상속(currentColor)
            className="text-base font-bold uppercase tracking-[0.2em]"
          >
            Bawky Studio
          </Link>
        </div>

        <ul className="flex flex-1 items-center justify-center gap-16 text-base font-bold">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            
            // 2. 링크 색상 로직 수정 (배경색에 따라 Opacity 조절 방식 사용)
            // isOpen이 true면(흰 배경) 기본 텍스트가 검정, false면(투명) 기본이 흰색
            // 따라서 text-opacity 등을 활용하거나 currentColor를 활용
            const activeColorClass = isActive 
                ? "opacity-100" 
                : "opacity-60 hover:opacity-100";

            return (
              <li key={item.href} className="group relative min-w-[120px] text-center">
                <div
                  onMouseEnter={() => openMenu(item.label)}
                  onFocusCapture={(event) => {
                    const target = event.target;
                    if (target instanceof HTMLAnchorElement) {
                      lastFocusedRef.current = target;
                    }
                    openMenu(item.label);
                  }}
                >
                  <Link
                    href={item.href}
                    locale={locale}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpen && activeItem === item.label}
                    aria-controls="nav-children-panel"
                    ref={(node) => {
                      topLevelRefs.current[item.label] = node;
                    }}
                    className={`border-b-2 border-transparent pb-1 transition-opacity hover:border-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${activeColorClass}`}
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-1 justify-end">
          <Link
            href={currentPath}
            locale={switchLocale}
            // 색상 하드코딩 제거 -> opacity로 제어
            className="text-sm font-bold uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe2" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
              </svg>
              {switchLocale === "en" ? "EN" : "KR"}
            </span>
          </Link>
        </div>
      </div>

      <div
        id="nav-children-panel"
        role="region"
        aria-label="Secondary navigation"
        // 3. isOpen일 때 흰색 배경, border-t도 색상 조정
        className={`w-full overflow-hidden border-t border-gray-300/80 transition-[max-height,padding,background-color,border-color] duration-200 motion-reduce:transition-none ${
          isOpen 
            ? "max-h-64 py-6 bg-white" // 확장 시: 흰색 배경
            : "max-h-0 py-0 bg-neutral-950/95" // 닫혔을 때 (기존 유지)
        }`}
        onMouseEnter={() => {
          if (closeTimeoutRef.current) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
          }
        }}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-0 flex w-full items-start px-6">
          <div className="flex-1" />

          <div className="flex flex-1 justify-center gap-16">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <div 
                    key={item.label} 
                    className={`min-w-[120px] text-center transition-opacity duration-200`}
                >
                  <ul className="flex flex-col items-center gap-2 text-sm">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          locale={locale}
                          // 4. whitespace-nowrap 추가: 줄바꿈 방지
                          // 5. 텍스트 색상: 패널이 흰색이 되므로 검은색 계열(neutral-500 -> 900)로 변경
                          className="block whitespace-nowrap rounded-md px-3 py-2 text-center text-neutral-500 hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          onMouseEnter={() => openMenu(item.label)}
                          onFocus={() => openMenu(item.label)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </nav>
  );
};
