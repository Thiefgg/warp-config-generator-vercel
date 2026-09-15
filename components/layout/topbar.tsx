'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Info, SlidersHorizontal, SquaresFour, X } from '@phosphor-icons/react';

const TABS = [
  { id: 'generator', label: 'Генератор', hash: '/', icon: <SlidersHorizontal size={14} weight="duotone" /> },
  { id: 'applications', label: 'Приложения', hash: '#apps', icon: <SquaresFour size={14} weight="duotone" /> },
  { id: 'about', label: 'О проекте', hash: '#about', icon: <Info size={14} weight="duotone" /> },
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
    const handleResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="relative flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[var(--surface)] rounded-[var(--radius-lg)] mb-4 gap-2.5">
      <a href="/" className="flex items-center gap-2.5 min-w-0 shrink rounded-lg focus:outline-none" aria-label="Открыть генератор">
        <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--surface-2)] flex items-center justify-center shrink-0">
          <Image src="/cloud.ico" alt="Logo" width={20} height={20} className="object-cover" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight truncate">WARP Generator</span>
      </a>

      <nav className="hidden sm:flex gap-1" aria-label="Разделы сайта">
        {TABS.map((tab) => (
          <a key={tab.id} href={tab.hash} className={`shrink-0 px-3.5 py-2 rounded-lg text-[13px] transition-all focus:outline-none inline-flex items-center gap-1.5 ${activeTab === tab.id ? 'bg-[var(--surface-3)] text-[var(--text)] font-medium' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'}`}>
            {tab.icon}
            <span>{tab.label}</span>
          </a>
        ))}
      </nav>

      <div className="relative sm:hidden shrink-0">
        <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-haspopup="menu" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} className="h-9 px-2.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] text-[12px] text-[var(--text-muted)] inline-flex items-center gap-1.5 transition-colors hover:bg-[var(--surface-3)] hover:text-[var(--text)] focus:outline-none">
          <span>Генератор</span>
          <span className="relative w-4 h-4 shrink-0">
            <span className={`absolute inset-0 flex flex-col items-center justify-center gap-[3px] transition-all duration-200 ease-out ${menuOpen ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'}`}>
              <span className="w-3.5 h-px bg-current" />
              <span className="w-3.5 h-px bg-current" />
              <span className="w-3.5 h-px bg-current" />
            </span>
            <X size={16} className={`absolute inset-0 m-auto transition-all duration-200 ease-out ${menuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'}`} />
          </span>
        </button>

        <div className={`absolute right-0 top-[calc(100%+8px)] z-50 w-[168px] p-1.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] shadow-[0_12px_30px_rgba(0,0,0,0.38)] origin-top-right transition-all duration-200 ease-out ${menuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-1 scale-[0.97] pointer-events-none'}`} role="menu">
          {TABS.map((tab) => (
            <a key={tab.id} href={tab.hash} onClick={() => setMenuOpen(false)} className={`w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-[13px] transition-colors inline-flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--surface-3)] text-[var(--text)] font-medium' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-3)]'}`} role="menuitem">
              {tab.icon}
              <span>{tab.label}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}