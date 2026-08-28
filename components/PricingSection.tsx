"use client";

import { useState } from "react";

const PLANS = [
  {
    id: "start",
    name: "Старт",
    price: "990 ₽",
    period: "/мес",
    description: "Для одного бизнеса, чтобы получить первый чёткий план",
    features: [
      "Персональный план продвижения",
      "Обновление плана раз в месяц",
      "Доступ ко всем модулям-инструкциям",
    ],
    highlighted: false,
  },
  {
    id: "business",
    name: "Бизнес",
    price: "2 490 ₽",
    period: "/мес",
    description: "Для владельца, который ведёт продвижение сам и хочет контроль",
    features: [
      "Всё из тарифа «Старт»",
      "Чек-листы с отметками о выполнении",
      "Экспорт плана в PDF",
      "Обновление плана каждую неделю",
      "Приоритетная поддержка в Telegram",
    ],
    highlighted: true,
  },
  {
    id: "agency",
    name: "Команда",
    price: "6 990 ₽",
    period: "/мес",
    description: "Для нескольких точек/филиалов или агентства на аутсорсе",
    features: [
      "Всё из тарифа «Бизнес»",
      "До 10 профилей бизнеса в одном аккаунте",
      "Общий доступ для сотрудников",
      "Выгрузка планов для клиентов (white-label)",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl border p-6 md:p-7 ${
              plan.highlighted
                ? "border-brand bg-ink-900 text-white shadow-lg md:-translate-y-2"
                : "border-line bg-white text-ink-900"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-3 inline-block w-fit rounded-full bg-brand px-3 py-1 text-xs font-mono text-ink-900">
                Популярный выбор
              </span>
            )}
            <h3 className="font-display text-xl mb-1">{plan.name}</h3>
            <p className={`text-sm mb-4 ${plan.highlighted ? "text-white/70" : "text-muted"}`}>
              {plan.description}
            </p>
            <div className="mb-6">
              <span className="font-display text-3xl">{plan.price}</span>
              <span className={plan.highlighted ? "text-white/60" : "text-muted"}>
                {plan.period}
              </span>
            </div>
            <ul className="mb-6 flex-1 space-y-2.5">
              {plan.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className={plan.highlighted ? "text-brand" : "text-violet"}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setClicked(plan.id)}
              className={`w-full rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-brand text-ink-900 hover:bg-brand/90"
                  : "bg-ink-900 text-white hover:bg-ink-800"
              }`}
            >
              Оформить подписку
            </button>
            {clicked === plan.id && (
              <p className="mt-3 text-xs font-mono text-violet">
                Приём оплаты подключается на следующем шаге разработки — см. README проекта.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
