"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageBackdrop } from "@/components/PageBackdrop";
import { ReadingView } from "@/components/ReadingView";
import { copy } from "@/lib/copy";
import {
  clearConsult,
  loadDraft,
  loadReading,
  saveDraft,
  saveReading,
  type Draft,
} from "@/lib/consult/draft";
import { presentReading } from "@/lib/reading/present";
import type { Reading } from "@/lib/ai/schema";
import type { SajuChart } from "@/lib/saju/types";

type Result = { chart: SajuChart; reading: Reading; question: string };

export default function ReadingPage() {
  const router = useRouter();
  const started = useRef(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<"calc" | "ai" | null>(null);
  const [pending, setPending] = useState(false);

  async function request(current: Draft, priorSummary?: string, question?: string) {
    if (!current.topic || !current.counselor || !current.birth) return;
    setPending(true);
    setError(null);
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: current.topic,
        counselor: current.counselor,
        question: question ?? current.question,
        birth: current.birth,
        priorSummary,
      }),
    });
    const json = await response.json().catch(() => null);
    setPending(false);
    if (response.status === 400 || response.status === 422) {
      setError("calc");
      return;
    }
    if (!response.ok || !json?.chart || !json?.reading) {
      setError("ai");
      return;
    }
    const next = {
      chart: json.chart as SajuChart,
      reading: json.reading as Reading,
      question: (json.question as string) || question || current.question,
    };
    const remembered = { ...current, question: next.question };
    saveDraft(sessionStorage, remembered);
    setDraft(remembered);
    saveReading(sessionStorage, { chart: next.chart, reading: next.reading });
    setResult(next);
  }

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const loaded = loadDraft(sessionStorage);
    if (!loaded.topic || !loaded.counselor || !loaded.birth) {
      router.replace("/");
      return;
    }
    setDraft(loaded);
    const saved = loadReading(sessionStorage);
    if (saved) {
      setResult({ ...saved, question: loaded.question });
      return;
    }
    void request(loaded);
  }, [router]);

  if (error === "calc") {
    return (
      <div className="space-y-4 pt-2">
        <PageBackdrop src="/bg-reading.jpg" tone="paper" />
        <p>{copy.calcError}</p>
        <Link href="/birth" className="underline">출생 정보 수정</Link>
      </div>
    );
  }
  if (error === "ai") {
    return (
      <div className="space-y-4 pt-2">
        <PageBackdrop src="/bg-reading.jpg" tone="paper" />
        <p>{copy.aiError}</p>
        <button
          type="button"
          className="min-h-12 rounded-card bg-pine px-4 font-semibold text-paper"
          onClick={() => {
            if (draft) void request(draft);
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }
  if (!result) {
    return (
      <>
        <PageBackdrop src="/bg-reading.jpg" tone="paper" />
        <p>{copy.analyzing}</p>
      </>
    );
  }

  return (
    <>
    <PageBackdrop src="/bg-reading.jpg" tone="paper" />
    <ReadingView
      view={presentReading(result.chart, result.reading)}
      question={result.question}
      pending={pending}
      onFollowUp={(question) => {
        if (!draft) return;
        void request(draft, result.reading.summary, question);
      }}
      onRestart={() => {
        clearConsult(sessionStorage);
        router.push("/");
      }}
    />
    </>
  );
}
