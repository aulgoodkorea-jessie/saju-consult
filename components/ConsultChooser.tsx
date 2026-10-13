"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChoiceCard } from "@/components/ChoiceCard";
import { StickyAction } from "@/components/StickyAction";
import { emptyDraft, loadDraft, saveDraft, type Draft } from "@/lib/consult/draft";
import type { CounselorStyle, Topic } from "@/lib/saju/types";
import { topicChoices } from "@/lib/topics";

const counselors: {
  id: CounselorStyle;
  title: string;
  body: string;
  accent: "pine" | "lilac";
  image: string;
}[] = [
  {
    id: "clear",
    title: "명료한 상담가",
    body: "핵심과 근거, 실행할 일을 직접적으로 설명합니다.",
    accent: "pine",
    image: "/counselor-clear.jpg",
  },
  {
    id: "empathetic",
    title: "공감형 상담가",
    body: "감정을 먼저 살피고 부드럽게 같은 근거를 설명합니다.",
    accent: "lilac",
    image: "/counselor-empathetic.jpg",
  },
];

function isTopic(value: string | null): value is Topic {
  return value === "love" || value === "career" || value === "general";
}

export function ConsultChooser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadDraft(sessionStorage);
    const topic = searchParams.get("topic");
    if (isTopic(topic)) loaded.topic = topic;
    saveDraft(sessionStorage, loaded);
    setDraft(loaded);
    setReady(true);
  }, [searchParams]);

  function choose(next: Draft) {
    setDraft(next);
    saveDraft(sessionStorage, next);
  }

  const complete = draft.topic !== null && draft.counselor !== null;

  return (
    <div className="space-y-8 pt-2">
      <h1 className="text-[2rem] font-semibold">상담 설정</h1>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">주제</h2>
        {topicChoices.map((topic) => (
          <ChoiceCard
            key={topic.id}
            title={`${topic.emoji} ${topic.title}`}
            body={topic.body}
            selected={draft.topic === topic.id}
            onSelect={() => choose({ ...draft, topic: topic.id })}
          />
        ))}
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">상담가</h2>
        {counselors.map((counselor) => (
          <ChoiceCard
            key={counselor.id}
            title={counselor.title}
            body={counselor.body}
            accent={counselor.accent}
            image={{ src: counselor.image, alt: counselor.title }}
            selected={draft.counselor === counselor.id}
            onSelect={() => choose({ ...draft, counselor: counselor.id })}
          />
        ))}
      </section>
      {ready && !complete ? <p>주제와 상담가를 선택해 주세요.</p> : null}
      <StickyAction
        label="계속"
        disabled={!complete}
        onClick={() => {
          if (complete) router.push("/birth");
        }}
      />
    </div>
  );
}
