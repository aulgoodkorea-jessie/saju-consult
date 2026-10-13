import type { BirthInput } from "./types";

export type FieldErrors = Partial<Record<"calendar" | "year" | "month" | "day" | "leap" | "time" | "hour", string>>;
export type ShapeResult = { ok: true; value: BirthInput } | { ok: false; fields: FieldErrors };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function validateShape(input: unknown): ShapeResult {
  if (!isRecord(input)) return { ok: false, fields: { calendar: "출생 정보를 입력해 주세요." } };
  const fields: FieldErrors = {};
  const calendar = input.calendar;
  if (calendar !== "solar" && calendar !== "lunar") fields.calendar = "양력 또는 음력을 선택해 주세요.";

  const year = input.year;
  const month = input.month;
  const day = input.day;
  if (typeof year !== "number" || !Number.isInteger(year) || year < 1900 || year > 2099) {
    fields.year = "생년은 1900년부터 2099년 사이여야 합니다.";
  }
  if (typeof month !== "number" || !Number.isInteger(month) || month < 1 || month > 12) {
    fields.month = "월은 1부터 12 사이여야 합니다.";
  }
  if (typeof day !== "number" || !Number.isInteger(day) || day < 1 || day > 31) {
    fields.day = "일은 1부터 31 사이여야 합니다.";
  }
  if (
    calendar === "solar" &&
    typeof year === "number" &&
    typeof month === "number" &&
    typeof day === "number" &&
    month >= 1 &&
    month <= 12
  ) {
    const last = new Date(year, month, 0).getDate();
    if (day > last) fields.day = `${month}월 ${day}일은 없는 날짜입니다. 일을 바꿔 주세요.`;
  }
  if (input.isLeapMonth === true && calendar === "solar") fields.leap = "양력에는 윤달이 없습니다.";

  if (typeof input.timeKnown !== "boolean") {
    fields.time = "출생 시각을 모르면 모름을 선택해 주세요.";
  } else if (input.timeKnown) {
    const hour = input.hour;
    const minute = input.minute;
    const hourOk = typeof hour === "number" && Number.isInteger(hour) && hour >= 0 && hour <= 23;
    const minuteOk = typeof minute === "number" && Number.isInteger(minute) && minute >= 0 && minute <= 59;
    if (!hourOk || !minuteOk) fields.time = "출생 시각을 모르면 모름을 선택해 주세요.";
  }

  if (Object.keys(fields).length > 0) return { ok: false, fields };
  return {
    ok: true,
    value: {
      calendar: calendar as BirthInput["calendar"],
      year: year as number,
      month: month as number,
      day: day as number,
      isLeapMonth: input.isLeapMonth === true,
      timeKnown: input.timeKnown as boolean,
      ...(input.timeKnown === true ? { hour: input.hour as number, minute: input.minute as number } : {}),
    },
  };
}
