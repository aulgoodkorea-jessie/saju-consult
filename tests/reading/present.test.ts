import { expect, it } from "vitest";
import { findForbiddenClaim } from "../../lib/ai/guard";
import { presentReading } from "../../lib/reading/present";
import { calculate } from "../../lib/saju/calculate";

it("drops an hour note when the chart has no hour pillar", () => {
  const chart = calculate({
    calendar: "solar",
    year: 2005,
    month: 12,
    day: 23,
    isLeapMonth: false,
    timeKnown: false,
  });
  const view = presentReading(chart, {
    summary: "제공된 데이터에서는 이런 경향으로 해석할 수 있습니다.",
    saju_evidence: [
      { pillar: "일주", note: "일간을 중심으로 봅니다." },
      { pillar: "시주", note: "시주를 단정합니다." },
    ],
    interpretation: "가능성과 주의점을 나눕니다.",
    actions: ["이번 주에 대화를 한 번 정리해 보세요."],
    limitations: "시간 미상",
    follow_up_question: "",
  });
  expect(view.pillars.map((item) => item.pillar.label)).toEqual(["연주", "월주", "일주"]);
  expect(view.pillars[2].note).toContain("일간");
  expect(JSON.stringify(view)).not.toContain("시주를 단정");
});

it("flags a fixed-fate claim", () => {
  expect(findForbiddenClaim({
    summary: "올해 반드시 헤어집니다.",
    saju_evidence: [],
    interpretation: "",
    actions: ["확인"],
    limitations: "",
    follow_up_question: "",
  })).toBe("반드시");
});
