import { LunarYear } from "lunar-javascript";
import { validateShape, type ShapeResult } from "./shape";

export function validateBirth(input: unknown): ShapeResult {
  const shaped = validateShape(input);
  if (!shaped.ok) return shaped;
  if (shaped.value.calendar === "lunar" && shaped.value.isLeapMonth) {
    const leap = LunarYear.fromYear(shaped.value.year).getLeapMonth();
    if (leap !== shaped.value.month) {
      return {
        ok: false,
        fields: {
          leap: `${shaped.value.year}년에는 윤${shaped.value.month}월이 없습니다. 윤달을 끄거나 달을 바꿔 주세요.`,
        },
      };
    }
  }
  return shaped;
}
