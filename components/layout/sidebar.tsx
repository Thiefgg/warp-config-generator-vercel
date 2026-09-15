'use client';

import { useState, useEffect } from 'react';
import { ENDPOINTS } from '@/config/endpoints';
import { FlagIcon } from '@/components/icons/flag-icon';
import { FaGithub } from 'react-icons/fa';

const ORIGINAL_REPO = 'nellimonix/warp-config-generator-vercel';
const ORIGINAL_URL = `https://github.com/${ORIGINAL_REPO}`;
const MY_REPO = 'Thiefgg/warp-config-generator-vercel';
const MY_URL = `https://github.com/${MY_REPO}`;

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] text-[var(--text-dim)] tracking-wider uppercase mt-4 mb-1.5 px-1 first:mt-0">
      {children}
    </p>
  );
}

function GitHubLink({ href, repo, author }: { href: string; repo: string; author: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCount(d.stargazers_count))
      .catch(() => {});
  }, [repo]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-full min-w-0 flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text)] transition-all">
      <div className="w-8 h-8 rounded-lg bg-[var(--surface-3)] flex items-center justify-center shrink-0 text-[var(--text-muted)]">
        <FaGithub />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[13px]">GitHub</div>
        <div className="text-[11px] text-[var(--text-dim)] truncate">{author}</div>
      </div>

      <span className="shrink-0 text-[11px] text-[var(--amber-300)] bg-[var(--amber-900)] rounded px-1.5 py-0.5 font-medium">
        ★ {count !== null ? count : '...'}
      </span>

      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--text-dim)]">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </a>
  );
}

export function Sidebar() {
  const servers = ENDPOINTS.filter((e) => e.flag);

  return (
    <aside className="w-full min-w-0 flex flex-col gap-1.5 lg:bg-[var(--surface)] lg:rounded-[var(--radius-lg)] lg:p-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
      <SectionLabel>Проект</SectionLabel>

      <GitHubLink href={ORIGINAL_URL} repo={ORIGINAL_REPO} author="llimonix" />
      <GitHubLink href={MY_URL} repo={MY_REPO} author="Sakeenkok" />

      {servers.length > 0 && (
        <>
          <SectionLabel>Серверы</SectionLabel>

          {servers.map((s) => (
            <a key={s.id} href={s.externalUrl} target="_blank" rel="noopener noreferrer" className="w-full min-w-0 flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text)] transition-all">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-3)] flex items-center justify-center shrink-0">
                <FlagIcon code={s.flag!} />
              </div>

              <span className="flex-1 min-w-0 truncate text-[13px]">{s.label}</span>

              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--text-dim)]">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
          ))}
        </>
      )}

      <div className="flex-1 min-h-[16px]" />
    </aside>
  );
}