import SiteHeader from "@/components/SiteHeader";
import HeroPreviewCard from "@/components/HeroPreviewCard";
import JourneySection from "@/components/JourneySection";
import CasesSection from "@/components/CasesSection";
import PlanBuilder from "@/components/PlanBuilder";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      {/* HERO */}
      <section className="bg-ink-900 bg-[radial-gradient(circle_at_77%_24%,rgba(118,88,246,0.25),transparent_35%),radial-gradient(circle_at_18%_110%,rgba(203,255,67,0.13),transparent_40%)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.04fr_0.96fr] md:items-center md:px-8 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white/85 before:h-[7px] before:w-[7px] before:rounded-full before:bg-brand">
              Навигатор для владельцев малого и среднего бизнеса
            </span>
            <h1 className="my-5 max-w-[650px] font-display text-4xl leading-[1.12] tracking-tight text-white md:text-5xl">
              Из хаоса в маркетинге — в понятный маршрут к клиентам
            </h1>
            <p className="mb-7 max-w-[570px] text-lg text-white/65">
              Отвечаете на 7 вопросов о своём бизнесе — получаете пошаговый план привлечения
              клиентов: что делать сначала, что потом и почему именно так. Без общих советов
              «продвигайтесь в соцсетях».
            </p>
            <a
              href="#wizard"
              className="inline-block rounded-[9px] bg-brand px-6 py-3.5 text-sm font-extrabold text-ink-900 shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5"
            >
              Попробовать бесплатно
            </a>
            <div className="mt-6 flex flex-wrap gap-5 text-[13px] text-white/70">
              <span className="before:mr-1.5 before:text-brand before:content-['✦']">
                Первый план бесплатно
              </span>
              <span className="before:mr-1.5 before:text-brand before:content-['✦']">
                Без привязки карты
              </span>
            </div>
          </div>
          <HeroPreviewCard />
        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-gradient-to-b from-white to-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="mb-3 font-display text-3xl tracking-tight text-ink-900 md:text-4xl">
              Превратите хаос в понятную схему — за 5 минут
            </h2>
            <p className="text-muted">
              Не тратьте время на разрозненные советы: наш сервис соберёт их в один понятный
              маршрут привлечения клиентов.
            </p>
          </div>
          <JourneySection />
        </div>
      </section>

      {/* WIZARD */}
      <section className="border-y border-line bg-white" id="wizard-section">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <PlanBuilder />
        </div>
      </section>

      {/* CASES */}
      <section className="bg-ink-900 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="mb-3 font-display text-3xl tracking-tight text-white md:text-4xl">
              План превращается в измеримый результат
            </h2>
            <p className="text-white/60">
              Когда каналы и первые шаги не приходится собирать из разрозненных советов.
            </p>
          </div>
          <CasesSection />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-gradient-to-b from-white to-[#FBFBFD] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="mb-3 font-display text-3xl tracking-tight text-ink-900 md:text-4xl">
              Подписка, которая окупается первым тестом
            </h2>
            <p className="text-muted">
              Бесплатно можно построить и посмотреть план один раз. Подписка открывает
              чек-листы, обновления и экспорт.
            </p>
          </div>
          <PricingSection />
          <p className="mt-6 text-center text-xs text-muted">
            Оплата российской картой или через СБП · отмена подписки в любой момент
          </p>
        </div>
      </section>

      <footer className="bg-ink-900 py-7 text-xs text-white/55">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 md:px-8">
          <span>© {new Date().getFullYear()} Ключевое слово</span>
          <span>Прототип — реальная оплата и подтверждение почты ещё не подключены</span>
        </div>
      </footer>
    </main>
  );
}
