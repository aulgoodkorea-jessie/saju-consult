"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";
import type { PresentedReading } from "@/lib/reading/present";

export function ReadingView({
  view,
  question,
  pending,
  onFollowUp,
  onRestart,
}: {
  view: PresentedReading;
  question: string;
  pending: boolean;
  onFollowUp: (question: string) => void;
  onRestart: () => void;
}) {
  const [followUp, setFollowUp] = useState("");
  const [followError, setFollowError] = useState("");

  return (
    <div className="space-y-8 pt-2">
      <section>
        <h1 className="text-[2rem] font-semibold">상담 요약</h1>
        <p className="mt-3">{question}</p>
        <p className="mt-3">{view.summary}</p>
      </section>
      <div className="space-y-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
        <section>
          <h2 className="text-2xl font-semibold">사주상 근거</h2>
          <ul className="mt-3 space-y-3">
            {view.pillars.map((item) => (
              <li key={item.pillar.label} className="rounded-card border border-line bg-paper p-4">
                <p className="font-semibold">{item.pillar.label} {item.pillar.ganzi}</p>
                <p>천간 {item.pillar.elementGan} · 지지 {item.pillar.elementZhi} · {item.pillar.tenGodGan}</p>
                {item.note ? <p className="mt-2">{item.note}</p> : null}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">현실적 해석</h2>
          <p className="mt-3">{view.interpretation}</p>
        </section>
      </div>
      <section>
        <h2 className="text-2xl font-semibold">실행 제안</h2>
        <ul className="mt-3 space-y-3">
          {view.actions.map((action) => (
            <li key={action}>
              <label className="flex min-h-12 items-start gap-3 rounded-card border border-line bg-paper p-4">
                <input type="checkbox" className="mt-1" />
                <span>{action}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-card bg-mist px-4 py-3">
        <h2 className="text-2xl font-semibold">해석의 한계</h2>
        <p className="mt-2">{copy.notice}</p>
        <p className="mt-2">{view.limitations}</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">후속 질문</h2>
        {view.followUp ? <p>{view.followUp}</p> : null}
        <label className="block">
          이어서 물을 내용
          <textarea
            className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3"
            rows={3}
            maxLength={500}
            value={followUp}
            onChange={(event) => setFollowUp(event.target.value)}
          />
        </label>
        {followError ? <p>{followError}</p> : null}
        <button
          type="button"
          className="min-h-12 rounded-card bg-pine px-4 font-semibold text-paper"
          disabled={pending}
          onClick={() => {
            if (!followUp.trim()) {
              setFollowError("질문을 입력해 주세요.");
              return;
            }
            setFollowError("");
            onFollowUp(followUp.trim());
          }}
        >
          이어서 묻기
        </button>
        <button type="button" className="block underline" onClick={onRestart}>
          새 상담
        </button>
      </section>
    </div>
  );
}
