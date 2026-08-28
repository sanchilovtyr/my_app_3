const CASES = [
  {
    type: "Наш кейс",
    city: "Казань",
    title: "Студия маникюра",
    problem: "Нужно было заполнить расписание мастеров без скидок «для всех».",
    metrics: [
      { v: "+38%", l: "записей за месяц" },
      { v: "17", l: "дней до результата" },
    ],
    channel: "Яндекс Карты + поиск",
  },
  {
    type: "Наш кейс",
    city: "Екатеринбург",
    title: "Мебель на заказ",
    problem: "Нужны были целевые заявки на кухни, а не просмотры каталога.",
    metrics: [
      { v: "×2,1", l: "больше заявок" },
      { v: "−29%", l: "стоимость заявки" },
    ],
    channel: "Директ + ретаргетинг",
  },
  {
    type: "Наш кейс",
    city: "Санкт-Петербург",
    title: "Онлайн-школа",
    problem: "Нужно было проверить спрос на новый курс до большого запуска.",
    metrics: [
      { v: "146", l: "заявок за тест" },
      { v: "312 ₽", l: "стоимость заявки" },
    ],
    channel: "VK Реклама + Telegram",
  },
];

export default function CasesSection() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {CASES.map((c) => (
          <article
            key={c.title}
            className="flex min-h-[300px] flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wide text-brand">
                {c.type}
              </span>
              <span className="text-xs text-white/50">{c.city}</span>
            </div>
            <h3 className="mb-1.5 mt-4 text-xl font-extrabold tracking-tight">{c.title}</h3>
            <p className="mb-5 text-[13px] text-white/60">{c.problem}</p>
            <div className="mt-auto grid grid-cols-2 gap-2">
              {c.metrics.map((m) => (
                <div key={m.l} className="rounded-lg bg-white/10 p-2.5">
                  <b className="block text-xl tracking-tight text-brand">{m.v}</b>
                  <span className="text-[11px] text-white/60">{m.l}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/60">
              <b className="text-white">Сработало:</b> {c.channel}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
