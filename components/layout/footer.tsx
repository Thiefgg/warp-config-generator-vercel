export function Footer() {
  return (
    <footer className="mt-auto pt-5 pb-2 text-center text-[11px] text-[var(--text-dim)] font-light">
      <div>
        © {new Date().getFullYear()} · MIT License ·{' '}
        <a
          href="https://github.com/Thiefgg/warp-config-generator-vercel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-muted)] transition-colors"
        >
          GitHub
        </a>
      </div>

      <div className="mt-1">
        WARP Generator · modded by{' '}
        <a
          href="https://github.com/Thiefgg"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-muted)] transition-colors"
        >
          Sakeenkok
        </a>
        {' · '}original project by{' '}
        <a
          href="https://github.com/nellimonix"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-muted)] transition-colors"
        >
          llimonix
        </a>
      </div>
    </footer>
  );
}