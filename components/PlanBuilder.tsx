"use client";

import { useEffect, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { generatePlan } from "@/lib/ruleEngine";
import { Answers, GeneratedPlan, PlanEntry, Phase } from "@/lib/types";

type RawAnswers = Record<string, string>;

const EMAIL_STORAGE_KEY = "promoplan_email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHASE_META: Record<Phase, { title: string; note: string }> = {
  foundation: {
    title: "Этап 1. Фундамент",
    note: "Без этого платный трафик и продвижение будут работать вхолостую",
  },
  traffic: {
    title: "Этап 2. Привлечение трафика",
    note: "Каналы, подобранные под вашу нишу, бюджет и цель",
  },
  retention: {
    title: "Этап 3. Удержание и повторные продажи",
    note: "Дешевле удержать клиента, чем привлечь нового",
  },
};

function toAnswers(raw: RawAnswers): Answers {
  return {
    businessType: raw.businessType as Answers["businessType"],
    hasSite: raw.hasSite === "true",
    hasSocial: raw.hasSocial === "true",
    goal: raw.goal as Answers["goal"],
    budget: raw.budget as Answers["budget"],
    geo: raw.geo as Answers["geo"],
    experience: raw.experience as Answers["experience"],
  };
}

function PlanColumn({ phase, entries }: { phase: Phase; entries: PlanEntry[] }) {
  const meta = PHASE_META[phase];
  if (entries.length === 0) return null;
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between border-b border-line pb-2 mb-4">
        <h3 className="font-display text-lg md:text-xl text-ink-900">{meta.title}</h3>
        <span className="hidden md:block text-sm text-muted">{meta.note}</span>
      </div>
      <p className="md:hidden text-sm text-muted mb-4">{meta.note}</p>
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <details
            key={entry.module.id}
            className="group rounded-xl border border-line bg-white open:bg-white transition-colors"
            open={i === 0}
          >
            <summary className="flex cursor-pointer items-start gap-4 list-none p-4 md:p-5">
              <span className="waypoint-num shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet text-paper">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-display text-base md:text-lg text-ink-900">
                  {entry.module.title}
                </span>
                <span className="block text-sm text-muted mt-1">{entry.module.timeToResult}</span>
              </span>
              <span className="mt-1 text-ink-900/30 transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="px-4 md:px-5 pb-5 pl-[3.25rem] md:pl-[3.75rem]">
              <p className="text-sm md:text-base text-ink-900/80 mb-3">{entry.reason}</p>
              <ul className="space-y-2">
                {entry.module.steps.map((step, si) => (
                  <li key={si} className="flex gap-2 text-sm md:text-base text-ink-900/90">
                    <span className="text-brand font-mono">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function LockedPhaseCard() {
  const meta = PHASE_META.retention;
  return (
    <div className="print:hidden mb-10 rounded-xl border border-dashed border-ink-900/20 bg-soft p-6 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-brand">
        🔒
      </div>
      <h3 className="font-display text-lg text-ink-900 mb-1.5">{meta.title}</h3>
      <p className="mx-auto mb-4 max-w-md text-sm text-muted">
        На пробном тарифе этот этап скрыт. Оформите платную подписку, чтобы открыть удержание
        клиентов и повторные продажи — вместе с чек-листами и обновлениями плана.
      </p>
      <a
        href="#pricing"
        className="inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
      >
        Открыть все этапы
      </a>
    </div>
  );
}

function EmailGate({ onRegister }: { onRegister: (email: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(value.trim())) {
      setError("Введите корректный email");
      return;
    }
    setError(null);
    onRegister(value.trim());
  };

  return (
    <div className="mx-auto max-w-md">
      <span className="inline-block rounded-full bg-violet-soft px-3 py-1 text-xs font-bold text-violet">
        Шаг 0 · 30 секунд
      </span>
      <h2 className="font-display text-2xl md:text-3xl text-ink-900 mt-4 mb-1.5">
        Для начала — email
      </h2>
      <p className="text-muted mb-6">
        Понадобится, чтобы сохранить ваш план и прислать его в PDF. Пароль не нужен.
      </p>
      <form onSubmit={submit} className="grid gap-3">
        <input
          type="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@company.ru"
          className="w-full rounded-xl border border-line bg-white p-4 text-ink-900 outline-none transition-colors focus:border-violet"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="rounded-xl bg-ink-900 px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-ink-800"
        >
          Зарегистрироваться и продолжить
        </button>
        <p className="text-xs text-muted">
          Отправляя email, вы соглашаетесь с обработкой персональных данных.
        </p>
      </form>
    </div>
  );
}

export default function PlanBuilder() {
  const [email, setEmail] = useState<string | null>(null);
  const [emailLoaded, setEmailLoaded] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [raw, setRaw] = useState<RawAnswers>({});
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(EMAIL_STORAGE_KEY);
      if (stored) setEmail(stored);
    } catch {
      // localStorage недоступен (например, приватный режим) — просто покажем форму регистрации
    } finally {
      setEmailLoaded(true);
    }
  }, []);

  const registerEmail = (value: string) => {
    setEmail(value);
    try {
      window.localStorage.setItem(EMAIL_STORAGE_KEY, value);
    } catch {
      // не критично для прототипа, если сохранить не получилось
    }
  };

  const changeEmail = () => {
    setEmail(null);
    try {
      window.localStorage.removeItem(EMAIL_STORAGE_KEY);
    } catch {
      // не критично
    }
  };

  const question = QUESTIONS[stepIndex];
  const isLast = stepIndex === QUESTIONS.length - 1;
  const progress = Math.round(((stepIndex + (plan ? 1 : 0)) / QUESTIONS.length) * 100);

  const selectOption = (value: string) => {
    const next = { ...raw, [question.id]: value };
    setRaw(next);
    if (isLast) {
      setPlan(generatePlan(toAnswers(next)));
    } else {
      setStepIndex((s) => s + 1);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((s) => s - 1);
  };

  const restart = () => {
    setRaw({});
    setStepIndex(0);
    setPlan(null);
    setPdfNotice(null);
  };

  const downloadPdf = () => {
    setPdfNotice(null);
    window.print();
  };

  const emailPdf = () => {
    downloadPdf();
    setPdfNotice(
      `В боевой версии PDF автоматически придёт на ${email}. Пока сохраните файл из диалога печати — отправка на почту требует бэкенда (см. README).`
    );
  };

  const answeredValue = raw[question?.id];

  if (!emailLoaded) {
    return <div id="wizard" className="scroll-mt-24" />;
  }

  return (
    <div id="wizard" className="scroll-mt-24">
      {!email && <EmailGate onRegister={registerEmail} />}

      {email && !plan && (
        <div className="mx-auto max-w-xl">
          <div className="mb-4 flex items-center justify-between text-xs text-muted">
            <span>
              Вы вошли как <b className="text-ink-900">{email}</b>
            </span>
            <button onClick={changeEmail} className="underline underline-offset-4 hover:text-ink-900">
              Изменить email
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-xs text-muted">
              {String(stepIndex + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
            </span>
            <div className="h-1 flex-1 rounded-full bg-line">
              <div
                className="h-1 rounded-full bg-violet transition-all"
                style={{ width: `${Math.max(progress, 6)}%` }}
              />
            </div>
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-1">{question.title}</h2>
          {question.subtitle && <p className="text-muted mb-6">{question.subtitle}</p>}
          {!question.subtitle && <div className="mb-6" />}

          <div className="grid gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectOption(opt.value)}
                className={`text-left rounded-xl border p-4 transition-colors hover:border-violet hover:bg-violet/5 ${
                  answeredValue === opt.value
                    ? "border-violet bg-violet/10"
                    : "border-line bg-white/50"
                }`}
              >
                <span className="block font-medium text-ink-900">{opt.label}</span>
                {opt.hint && <span className="block text-sm text-muted mt-0.5">{opt.hint}</span>}
              </button>
            ))}
          </div>

          {stepIndex > 0 && (
            <button
              onClick={goBack}
              className="mt-6 text-sm text-muted hover:text-ink-900 underline underline-offset-4"
            >
              ← Назад
            </button>
          )}
        </div>
      )}

      {email && plan && (
        <div>
          <div id="print-plan">
            <div className="mb-8 rounded-xl border border-violet/30 bg-violet/5 p-5 md:p-6">
              <p className="font-display text-lg md:text-xl text-ink-900">{plan.summary}</p>
            </div>

            <PlanColumn phase="foundation" entries={plan.foundation} />
            <PlanColumn phase="traffic" entries={plan.traffic} />
          </div>

          <LockedPhaseCard />

          <div className="print:hidden flex flex-col gap-3 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Пробный план показывает первые 2 этапа из 3. Полная подписка открывает все этапы,
              чек-листы и еженедельные обновления.
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                onClick={downloadPdf}
                className="rounded-full border border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
              >
                Скачать PDF
              </button>
              <button
                onClick={emailPdf}
                className="rounded-full border border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
              >
                Получить PDF на почту
              </button>
              <button
                onClick={restart}
                className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-800"
              >
                Пройти заново
              </button>
            </div>
          </div>
          {pdfNotice && (
            <p className="print:hidden mt-3 text-xs font-mono text-violet">{pdfNotice}</p>
          )}
        </div>
      )}
    </div>
  );
}
