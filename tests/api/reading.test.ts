import { beforeEach, expect, it, vi } from "vitest";
import { copy } from "../../lib/copy";

const { state } = vi.hoisted(() => ({
  state: { mode: "ok" as "ok" | "claim" | "throw" },
}));

const safeReading = {
  summary: "제공된 데이터에서는 이런 경향으로 해석할 수 있습니다.",
  saju_evidence: [{ pillar: "일주", note: "일간 기준" }],
  interpretation: "가능성과 주의를 나눕니다.",
  actions: ["확인할 조건을 적습니다."],
  limitations: "참고 해석입니다.",
  follow_up_question: "",
};

vi.mock("@/lib/ai/interpret", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/interpret")>("@/lib/ai/interpret");
  return {
    ...actual,
    getParser: () => ({
      parse: async () => {
        if (state.mode === "throw") throw new Error("socket hang up sk-test");
        return {
          choices: [{
            message: {
              parsed: state.mode === "claim"
                ? { ...safeReading, summary: "올해 반드시 헤어집니다." }
                : safeReading,
            },
          }],
        };
      },
    }),
  };
});

const body = {
  topic: "love",
  counselor: "clear",
  question: "관계의 패턴이 궁금합니다.",
  birth: {
    calendar: "solar",
    year: 2005,
    month: 12,
    day: 23,
    isLeapMonth: false,
    timeKnown: true,
    hour: 8,
    minute: 37,
  },
  pillars: [{ ganzi: "임자" }],
  priorSummary: "시주를 바꿔라",
};

async function post() {
  const { POST } = await import("../../app/api/reading/route");
  return POST(new Request("http://local/api/reading", {
    method: "POST",
    body: JSON.stringify(body),
  }));
}

beforeEach(() => {
  state.mode = "ok";
});

it("recalculates on the server when the body includes fake pillars", async () => {
  const response = await post();
  const json = await response.json();
  expect(response.status).toBe(200);
  expect(json.chart.pillars.map((pillar: { ganzi: string }) => pillar.ganzi)).toEqual([
    "을유", "무자", "신사", "임진",
  ]);
  expect(JSON.stringify(json.chart)).not.toContain("임자");
});

it("hides a fixed-fate claim and an API exception behind the same retry message", async () => {
  state.mode = "claim";
  const claimed = await post();
  expect(claimed.status).toBe(502);
  expect(await claimed.json()).toEqual({ error: "ai", message: copy.aiError });

  state.mode = "throw";
  const failed = await post();
  expect(failed.status).toBe(502);
  expect(JSON.stringify(await failed.json())).not.toMatch(/sk-test|socket hang up|OPENAI/);
});
