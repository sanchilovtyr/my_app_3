import RouteHero from "@/components/RouteHero";
import PlanBuilder from "@/components/PlanBuilder";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-6xl px-5 md:px-8 pt-8 pb-12 md:pt-12 md:pb-16">
          <nav className="flex items-center justify-between mb-10 md:mb-14">
            <span className="font-display text-lg text-paper">Маршрут</span>
            <a
              href="#wizard"
              className="rounded-full border border-paper/25 px-4 py-2 text-sm text-paper hover:bg-paper hover:text-ink-900 transition-colors"
            >
              Построить план
            </a>
          </nav>

          <div className="max-w-2xl mb-10 md:mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-route-amber">
              Для владельцев малого и среднего бизнеса
            </span>
            <h1 className="font-display text-3xl md:text-5xl leading-tight text-paper mt-3 mb-5">
              Понятный маршрут к клиентам из интернета — без хаоса из тридцати вкладок
            </h1>
            <p className="text-paper/70 text-base md:text-lg">
              Отвечаете на 7 вопросов о своём бизнесе — получаете пошаговый план: что делать
              сначала, что потом, и почему именно так. Без общих советов «продвигайтесь в
              соцсетях».
            </p>
          </div>

          <RouteHero />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Отвечаете на вопросы",
              text: "О сфере бизнеса, бюджете, целях и текущих каналах — 2 минуты.",
            },
            {
              n: "02",
              title: "Получаете маршрут",
              text: "План разбит на этапы: фундамент, привлечение трафика, удержание клиентов.",
            },
            {
              n: "03",
              title: "Идёте по шагам",
              text: "Каждый пункт — конкретное действие, а не абстрактная рекомендация.",
            },
          ].map((s) => (
            <div key={s.n}>
              <span className="font-mono text-sm text-route-teal">{s.n}</span>
              <h3 className="font-display text-xl text-ink-900 mt-2 mb-2">{s.title}</h3>
              <p className="text-ink-900/60">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WIZARD */}
      <section className="bg-white/40 border-y border-ink-900/10">
        <div className="mx-auto max-w-4xl px-5 md:px-8 py-14 md:py-20">
          <PlanBuilder />
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-3">Тарифы</h2>
          <p className="text-ink-900/60">
            Бесплатно можно построить и посмотреть план один раз. Подписка открывает
            чек-листы, обновления и экспорт.
          </p>
        </div>
        <PricingSection />
      </section>

      <footer className="border-t border-ink-900/10">
        <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-ink-900/50">
          <span>© {new Date().getFullYear()} Маршрут</span>
          <span>Прототип — платёжная интеграция и личный кабинет в разработке</span>
        </div>
      </footer>
    </main>
  );
}
