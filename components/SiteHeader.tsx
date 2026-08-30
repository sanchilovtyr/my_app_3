import Link from "next/link";

export default function SiteHeader({ ctaHref = "/#wizard" }: { ctaHref?: string }) {
  return (
    <header className="border-b border-white/10 bg-ink-900">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:gap-4 sm:px-5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-extrabold tracking-tight text-white"
        >
          <span className="relative h-[26px] w-[26px] -rotate-[20deg] rounded-[50%_50%_50%_8px] bg-brand sm:h-[30px] sm:w-[30px]">
            <span className="absolute left-[8px] top-[8px] h-1.5 w-1.5 rounded-full bg-ink-900 sm:left-[9px] sm:top-[9px] sm:h-2 sm:w-2" />
          </span>
          <span className="hidden sm:inline">Ключевое слово</span>
        </Link>
        <div className="flex items-center gap-2.5 sm:gap-5">
          <Link
            href="/account"
            aria-label="Личный кабинет"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-[11px] font-bold text-white transition-colors hover:bg-white/10 sm:hidden"
          >
            ЛК
          </Link>
          <Link
            href="/account"
            className="hidden text-sm font-medium text-white/75 hover:text-white sm:block"
          >
            Личный кабинет
          </Link>
          <a
            href={ctaHref}
            className="whitespace-nowrap rounded-[9px] bg-brand px-3.5 py-2.5 text-xs font-extrabold text-ink-900 shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-sm"
          >
            Построить план
          </a>
        </div>
      </div>
    </header>
  );
}
