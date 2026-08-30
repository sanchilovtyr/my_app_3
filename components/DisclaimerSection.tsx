import { DISCLAIMER_PARAGRAPHS } from "@/lib/disclaimer";

export default function DisclaimerSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-5 font-display text-xl text-ink-900 md:text-2xl">
        Ограничение ответственности
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted">
        {DISCLAIMER_PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
