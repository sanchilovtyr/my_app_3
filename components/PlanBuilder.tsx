"use client";

import { useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { generatePlan } from "@/lib/ruleEngine";
import { Answers, GeneratedPlan, PlanEntry, Phase } from "@/lib/types";

type RawAnswers = Record<string, string>;

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
      <div className="flex items-baseline justify-between border-b border-ink-900/15 pb-2 mb-4">
        <h3 className="font-display text-lg md:text-xl text-ink-900">{meta.title}</h3>
        <span className="hidden md:block text-sm text-ink-900/50">{meta.note}</span>
      </div>
      <p className="md:hidden text-sm text-ink-900/50 mb-4">{meta.note}</p>
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <details
            key={entry.module.id}
            className="group rounded-xl border border-ink-900/15 bg-white/60 open:bg-white transition-colors"
            open={i === 0}
          >
            <summary className="flex cursor-pointer items-start gap-4 list-none p-4 md:p-5">
              <span className="waypoint-num shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-route-teal text-paper">
                {i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-display text-base md:text-lg text-ink-900">
                  {entry.module.title}
                </span>
                <span className="block text-sm text-ink-900/60 mt-1">{entry.module.timeToResult}</span>
              </span>
              <span className="mt-1 text-ink-900/40 transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="px-4 md:px-5 pb-5 pl-[3.25rem] md:pl-[3.75rem]">
              <p className="text-sm md:text-base text-ink-900/80 mb-3">{entry.reason}</p>
              <ul className="space-y-2">
                {entry.module.steps.map((step, si) => (
                  <li key={si} className="flex gap-2 text-sm md:text-base text-ink-900/90">
                    <span className="text-route-amber font-mono">→</span>
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

export default function PlanBuilder() {
  const [stepIndex, setStepIndex] = useState(0);
  const [raw, setRaw] = useState<RawAnswers>({});
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);

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
  };

  const answeredValue = raw[question?.id];

  return (
    <div id="wizard" className="scroll-mt-24">
      {!plan && (
        <div className="mx-auto max-w-xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-xs text-ink-900/50">
              {String(stepIndex + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
            </span>
            <div className="h-1 flex-1 rounded-full bg-ink-900/10">
              <div
                className="h-1 rounded-full bg-route-teal transition-all"
                style={{ width: `${Math.max(progress, 6)}%` }}
              />
            </div>
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-1">{question.title}</h2>
          {question.subtitle && (
            <p className="text-ink-900/60 mb-6">{question.subtitle}</p>
          )}
          {!question.subtitle && <div className="mb-6" />}

          <div className="grid gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectOption(opt.value)}
                className={`text-left rounded-xl border p-4 transition-colors hover:border-route-teal hover:bg-route-teal/5 ${
                  answeredValue === opt.value
                    ? "border-route-teal bg-route-teal/10"
                    : "border-ink-900/15 bg-white/50"
                }`}
              >
                <span className="block font-medium text-ink-900">{opt.label}</span>
                {opt.hint && <span className="block text-sm text-ink-900/50 mt-0.5">{opt.hint}</span>}
              </button>
            ))}
          </div>

          {stepIndex > 0 && (
            <button
              onClick={goBack}
              className="mt-6 text-sm text-ink-900/50 hover:text-ink-900 underline underline-offset-4"
            >
              ← Назад
            </button>
          )}
        </div>
      )}

      {plan && (
        <div>
          <div className="mb-8 rounded-xl border border-route-teal/30 bg-route-teal/5 p-5 md:p-6">
            <p className="font-display text-lg md:text-xl text-ink-900">{plan.summary}</p>
          </div>

          <PlanColumn phase="foundation" entries={plan.foundation} />
          <PlanColumn phase="traffic" entries={plan.traffic} />
          <PlanColumn phase="retention" entries={plan.retention} />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between rounded-xl border border-ink-900/15 bg-white/60 p-5">
            <p className="text-sm text-ink-900/70">
              Это демонстрационная версия плана. В полной подписке — экспорт в PDF, чек-листы с
              отметками о выполнении и обновления модулей.
            </p>
            <button
              onClick={restart}
              className="shrink-0 rounded-full border border-ink-900/20 px-5 py-2 text-sm font-medium text-ink-900 hover:bg-ink-900 hover:text-paper transition-colors"
            >
              Пройти заново
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
