import { expect, it } from "vitest";
import { calculate } from "../../lib/saju/calculate";

const solar = {
  calendar: "solar" as const,
  isLeapMonth: false,
  timeKnown: true,
};

it("matches the library fixture 2005-12-23 08:37", () => {
  const chart = calculate({
    ...solar,
    year: 2005,
    month: 12,
    day: 23,
    hour: 8,
    minute: 37,
  });
  expect(chart.pillars.map((p) => p.ganzi)).toEqual(["을유", "무자", "신사", "임진"]);
  expect(chart.pillars[0]).toMatchObject({ elementGan: "목", elementZhi: "금" });
  expect(chart.pillars.map((p) => p.tenGodGan)).toEqual(["편재", "정인", "일간", "상관"]);
  expect(chart.dayMaster).toBe("신");
  expect(chart.policy).toMatchObject({
    sect: 2,
    dayBoundary: "midnight",
    timezone: "Asia/Seoul",
    trueSolarTime: false,
    hourIncluded: true,
  });
  expect(chart.uncertainties.join(" ")).toContain("대운은 계산하지 않습니다");
  expect(JSON.stringify(chart)).not.toContain("daewoon");
});

it("keeps the civil day pillar at 23:30", () => {
  const evening = calculate({ ...solar, year: 1988, month: 2, day: 15, hour: 22, minute: 30 });
  const late = calculate({ ...solar, year: 1988, month: 2, day: 15, hour: 23, minute: 30 });
  expect(evening.pillars.map((p) => p.ganzi)).toEqual(["무진", "갑인", "경자", "정해"]);
  expect(late.pillars.map((p) => p.ganzi)).toEqual(["무진", "갑인", "경자", "무자"]);
});

it("uses the solar-term year, so 1988-02-02 is still 정묘", () => {
  const chart = calculate({ ...solar, year: 1988, month: 2, day: 2, hour: 22, minute: 30 });
  expect(chart.pillars.map((p) => p.ganzi)).toEqual(["정묘", "계축", "정해", "신해"]);
});

it("omits the hour pillar when the time is unknown", () => {
  const chart = calculate({
    calendar: "solar",
    year: 2005,
    month: 12,
    day: 23,
    isLeapMonth: false,
    timeKnown: false,
  });
  expect(chart.pillars.map((p) => p.label)).toEqual(["연주", "월주", "일주"]);
  expect(chart.pillars[2].ganzi).toBe("신사");
  expect(chart.policy.hourIncluded).toBe(false);
  expect(chart.uncertainties.join(" ")).toContain("시주를 계산하지 않았습니다");
});

it("treats lunar leap month 2023-02 as a different month pillar", () => {
  const base = {
    calendar: "lunar" as const,
    year: 2023,
    month: 2,
    day: 1,
    timeKnown: true,
    hour: 12,
    minute: 0,
  };
  const normal = calculate({ ...base, isLeapMonth: false });
  const leap = calculate({ ...base, isLeapMonth: true });
  expect(normal.pillars[1].ganzi).not.toBe(leap.pillars[1].ganzi);
});
