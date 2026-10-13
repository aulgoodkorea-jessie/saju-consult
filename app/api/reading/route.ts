import { NextResponse } from "next/server";
import { z } from "zod";
import { copy, defaultQuestions } from "@/lib/copy";
import { getParser, interpret } from "@/lib/ai/interpret";
import { calculate } from "@/lib/saju/calculate";
import { validateBirth } from "@/lib/saju/validate";

const envelope = z.object({
  topic: z.enum(["love", "career", "general"]),
  counselor: z.enum(["clear", "empathetic"]),
  question: z.string().max(500).optional(),
  birth: z.unknown(),
  priorSummary: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  const started = Date.now();
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "validation", message: "요청 형식을 읽을 수 없습니다." },
      { status: 400 },
    );
  }
  const wrapped = envelope.safeParse(json);
  if (!wrapped.success) {
    return NextResponse.json(
      { error: "validation", fields: { calendar: "상담 주제와 상담가를 다시 선택해 주세요." } },
      { status: 400 },
    );
  }
  const birth = validateBirth(wrapped.data.birth);
  if (!birth.ok) {
    return NextResponse.json({ error: "validation", fields: birth.fields }, { status: 400 });
  }
  let chart;
  try {
    chart = calculate(birth.value);
  } catch {
    console.error("chart_failed", Date.now() - started);
    return NextResponse.json({ error: "calculation", message: copy.calcError }, { status: 422 });
  }
  const question = wrapped.data.question?.trim() || defaultQuestions[wrapped.data.topic];
  try {
    const reading = await interpret({
      counselor: wrapped.data.counselor,
      topic: wrapped.data.topic,
      question,
      chart,
      priorSummary: wrapped.data.priorSummary,
      parser: getParser(),
    });
    return NextResponse.json({ chart, reading, question });
  } catch {
    console.error("ai_failed", Date.now() - started);
    return NextResponse.json({ error: "ai", message: copy.aiError }, { status: 502 });
  }
}
