"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageBackdrop } from "@/components/PageBackdrop";
import { StickyAction } from "@/components/StickyAction";
import { copy } from "@/lib/copy";
import { clearReading, emptyDraft, loadDraft, saveDraft, type Draft } from "@/lib/consult/draft";

const topicLabel = { love: "연애", career: "성공·진로", general: "종합" };
const counselorLabel = { clear: "명료한 상담가", empathetic: "공감형 상담가" };

export default function ConfirmPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [starting, setStarting] = useState(false);
  const startingRef = useRef(false);

  useEffect(() => {
    const loaded = loadDraft(sessionStorage);
    if (!loaded.topic || !loaded.counselor || !loaded.birth) {
      router.replace("/");
      return;
    }
    setDraft(loaded);
    setReady(true);
  }, [router]);

  if (!ready || !draft.topic || !draft.counselor || !draft.birth) {
    return (
      <>
        <PageBackdrop src="/bg-confirm.jpg" tone="paper" />
        <p>입력 내용을 확인하고 있습니다.</p>
      </>
    );
  }
  const birth = draft.birth;

  return (
    <div className="space-y-6 pt-2">
      <PageBackdrop src="/bg-confirm.jpg" tone="paper" />
      <h1 className="text-[2rem] font-semibold">입력 확인</h1>
      <ul className="space-y-2 rounded-card border border-line bg-paper p-4">
        <li>주제: {topicLabel[draft.topic]}</li>
        <li>상담가: {counselorLabel[draft.counselor]}</li>
        <li>달력: {birth.calendar === "solar" ? "양력" : "음력"}</li>
        <li>날짜: {birth.year}년 {birth.month}월 {birth.day}일</li>
        <li>윤달: {birth.isLeapMonth ? "윤달" : "평달"}</li>
        <li>시각: {birth.timeKnown ? `${birth.hour}시 ${birth.minute}분` : "모름"}</li>
        <li>시간대: 한국 표준시</li>
      </ul>
      <label className="block">
        지금 궁금한 점
        <textarea
          className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3"
          rows={4}
          maxLength={500}
          value={draft.question}
          onChange={(event) => {
            const next = { ...draft, question: event.target.value };
            setDraft(next);
            saveDraft(sessionStorage, next);
          }}
        />
        <span className="mt-1 block text-sm">비워 두면 선택한 주제에 맞는 질문으로 해석합니다.</span>
      </label>
      <p className="rounded-card bg-mist px-4 py-3">
        {copy.notice} 입력은 서버에 저장되지 않습니다. <Link href="/privacy" className="underline">개인정보 안내</Link>
      </p>
      <p className="flex gap-4">
        <Link href="/birth" className="underline">출생 정보 수정</Link>
        <Link href="/consult" className="underline">상담 설정 수정</Link>
      </p>
      <StickyAction
        label={starting ? copy.startingAnalysis : "분석 시작"}
        disabled={starting}
        onClick={() => {
          if (startingRef.current) return;
          startingRef.current = true;
          setStarting(true);
          clearReading(sessionStorage);
          router.push("/reading");
        }}
      />
    </div>
  );
}
