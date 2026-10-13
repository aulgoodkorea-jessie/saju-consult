import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { validateBirth } from "../../lib/saju/validate";

it("rejects a leap month that year does not have", () => {
  const result = validateBirth({
    calendar: "lunar",
    year: 2023,
    month: 5,
    day: 1,
    isLeapMonth: true,
    timeKnown: true,
    hour: 9,
    minute: 0,
  });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.fields.leap).toContain("윤5월이 없습니다");
});

it("rejects leap month on the solar calendar", () => {
  const result = validateBirth({
    calendar: "solar",
    year: 2023,
    month: 2,
    day: 1,
    isLeapMonth: true,
    timeKnown: false,
  });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.fields.leap).toContain("양력에는 윤달이 없습니다");
});

it("requires an explicit unknown time instead of a blank hour", () => {
  const result = validateBirth({
    calendar: "solar",
    year: 2005,
    month: 12,
    day: 23,
    isLeapMonth: false,
    timeKnown: true,
  });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.fields.time).toContain("모름");
});

it("keeps the shape helper free of the calendar library", () => {
  const src = readFileSync("lib/saju/shape.ts", "utf8");
  expect(src.includes("lunar-javascript")).toBe(false);
});
