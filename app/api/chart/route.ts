import { NextResponse } from "next/server";
import { copy } from "@/lib/copy";
import { calculate } from "@/lib/saju/calculate";
import { validateBirth } from "@/lib/saju/validate";

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
  const parsed = validateBirth(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: "validation", fields: parsed.fields }, { status: 400 });
  }
  try {
    return NextResponse.json(calculate(parsed.value));
  } catch {
    console.error("chart_failed", Date.now() - started);
    return NextResponse.json({ error: "calculation", message: copy.calcError }, { status: 422 });
  }
}
