"use client";

import { useEffect, useState } from "react";

const STEP_MS = 800;

export function ProgressSteps({
  stages,
  description,
  titleAs = "p",
}: {
  stages: readonly string[];
  description: string;
  titleAs?: "h1" | "p";
}) {
  const [index, setIndex] = useState(0);
  const last = Math.max(stages.length - 1, 0);
  const current = Math.min(index, last);
  const stage = stages[current] ?? "";
  const Title = titleAs;

  useEffect(() => {
    if (current >= last) return;
    const id = window.setTimeout(() => {
      setIndex((value) => Math.min(value + 1, last));
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [current, last]);

  return (
    <section className="rounded-card border border-line bg-paper p-4">
      <div role="status" aria-live="polite">
        <Title
          className={
            titleAs === "h1"
              ? "text-[1.75rem] font-semibold leading-tight sm:text-[2rem]"
              : "text-xl font-semibold leading-snug"
          }
        >
          <span className="block">지금 {stage}</span>
          <span className="block">단계입니다.</span>
        </Title>
      </div>
      <p className="mt-3">{description}</p>
      <ol className="mt-4 space-y-1">
        {stages.map((item, itemIndex) => {
          const state = itemIndex < current ? "지나감" : itemIndex === current ? "진행 중" : "대기";
          const active = itemIndex === current;
          return (
            <li
              key={item}
              aria-current={active ? "step" : undefined}
              className={`flex min-h-12 items-center justify-between gap-3 border-l-4 py-2 pl-3 ${
                active ? "border-pine font-semibold text-pine" : "border-transparent"
              }`}
            >
              <span>{item}</span>
              <span className="w-20 shrink-0 text-right">{state}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
