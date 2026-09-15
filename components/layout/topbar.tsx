'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Info,
  SlidersHorizontal,
  SquaresFour,
} from '@phosphor-icons/react';

const TABS = [
  {
    id: 'generator',
    label: 'Генератор',
    hash: '/',
    icon: SlidersHorizontal,
  },
  {
    id: 'applications',
    label: 'Приложения',
    hash: '#apps',
    icon: SquaresFour,
  },
  {
    id: 'about',
    label: 'О проекте',
    hash: '#about',
    icon: Info,
  },
];

interface TopbarProps {
  activeTab: string;
}

export function Topbar({ activeTab }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className="
        relative z-50
        flex items-center justify-between
        px-4 sm:px-5
        py-2.5
        bg-[var(--surface)]
        rounded-[var(--radius-lg)]
        mb-4
        gap-2.5
      "
    >
      <a
        href="/"
        className="
          flex items-center gap-2.5
          min-w-0
          rounded-lg
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--amber-500)]
        "
        aria-label="Открыть генератор"
      >
        <div
          className="
            w-9 h-9
            rounded-[var(--radius-md)]
            bg-[var(--surface-2)]
            flex items-center justify-center
            shrink-0
          "
        >
          <Image
            src="/cloud.ico"
            alt="Logo"
            width={20}
            height={20}
            className="object-cover"
          />
        </div>

        <span
          className="
            text-[15px]
            font-semibold
            tracking-tight
            truncate
          "
        >
          WARP Generator
        </span>
      </a>

      <nav
        className="hidden sm:flex items-center gap-1"
        aria-label="Разделы сайта"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <a
              key={tab.id}
              href={tab.hash}
              className={`
                inline-flex items-center justify-center
                gap-1.5
                px-3.5 py-2
                rounded-lg
                text-[13px]
                transition-all duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--amber-500)]
                ${
                  isActive
                    ? 'text-[var(--text)] font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }
              `}
            >
              <Icon
                size={14}
                weight="duotone"
                className="shrink-0"
              />

              <span className="truncate">
                {tab.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="relative sm:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="
            h-9
            px-3
            rounded-[var(--radius-md)]
            bg-[var(--surface-2)]
            text-[var(--text-muted)]
            hover:bg-[var(--surface-2)]
            hover:text-[var(--text)]
            active:scale-[0.97]
            transition-all duration-200
            inline-flex items-center
            gap-2
            text-[12px]
            font-medium
            whitespace-nowrap
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--amber-500)]
          "
        >
          <span>Генератор</span>

          <span
            className="
              relative
              w-4 h-4
              flex items-center justify-center
              shrink-0
            "
          >
            <span
              className={`
                absolute
                w-[14px] h-px
                bg-current
                transition-all duration-200 ease-out
                ${
                  menuOpen
                    ? 'rotate-45'
                    : '-translate-y-[3px]'
                }
              `}
            />

            <span
              className={`
                absolute
                w-[14px] h-px
                bg-current
                transition-all duration-200 ease-out
                ${
                  menuOpen
                    ? '-rotate-45'
                    : 'translate-y-[3px]'
                }
              `}
            />
          </span>
        </button>

        <div
          className={`
            absolute
            right-0
            top-[calc(100%+8px)]
            w-[164px]
            p-1.5
            rounded-[var(--radius-md)]
            bg-[var(--surface-2)]
            shadow-[0_12px_32px_rgba(0,0,0,0.35)]
            origin-top-right
            transition-all duration-200 ease-out
            ${
              menuOpen
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 -translate-y-1.5 scale-[0.97] pointer-events-none'
            }
          `}
          role="menu"
          aria-hidden={!menuOpen}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <a
                key={tab.id}
                href={tab.hash}
                role="menuitem"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="
                  group
                  flex items-center
                  gap-2.5
                  w-full
                  px-2.5 py-2.5
                  rounded-lg
                  text-[13px]
                  transition-colors duration-150
                  focus-visible:outline-none
                  focus-visible:ring-1
                  focus-visible:ring-[var(--gray-600)]
                  hover:bg-[var(--surface-3)]
                "
              >
                <Icon
                  size={14}
                  weight="duotone"
                  className={`
                    shrink-0
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'text-[var(--text-muted)]'
                        : 'text-[var(--text-dim)] group-hover:text-[var(--text-muted)]'
                    }
                  `}
                />

                <span
                  className={`
                    truncate
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'text-[var(--text)] font-medium'
                        : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'
                    }
                  `}
                >
                  {tab.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}