import { describe, expect, it } from "vitest";
import { copy } from "../lib/copy";

describe("copy", () => {
  it("keeps the reference-interpretation notice and bans fortune claims", () => {
    const blob = JSON.stringify(copy);
    expect(blob).toContain("내 사주 엿보기");
    expect(blob).toContain(
      "사주 계산 결과를 바탕으로 AI가 전통 명리 관점의 당신의 사주를 풀이합니다. 미래 확정 예언이 아님을 주의해 주세요.",
    );
    expect(blob).toContain("이 해석은 전통 명리 관점의 참고 정보입니다.");
    expect(blob).not.toMatch(/반드시|무조건|틀림없이|적중률|운명은 이미/);
  });
});
