import Link from "next/link";

export default function SiteHeader({ ctaHref = "/#wizard" }: { ctaHref?: string }) {
  return (
    <header className="border-b border-white/10 bg-ink-900">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight text-white">
          <span className="relative h-[30px] w-[30px] -rotate-[20deg] rounded-[50%_50%_50%_8px] bg-brand">
            <span className="absolute left-[9px] top-[9px] h-2 w-2 rounded-full bg-ink-900" />
          </span>
          Ключевое слово
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/account"
            className="hidden text-sm font-medium text-white/75 hover:text-white sm:block"
          >
            Личный кабинет
          </Link>
          <a
            href={ctaHref}
            className="rounded-[9px] bg-brand px-5 py-3 text-sm font-extrabold text-ink-900 shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5"
          >
            Построить план
          </a>
        </div>
      </div>
    </header>
  );
}
