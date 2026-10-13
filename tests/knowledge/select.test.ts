import { expect, it } from "vitest";
import { selectKnowledge } from "../../lib/knowledge/select";

it("gives love the shared notes and the love note only", () => {
  const text = selectKnowledge("love");
  expect(text).toContain("상생");
  expect(text).toContain("관계");
  expect(text).not.toContain("일과 선택");
  expect(text).toContain("내부 기획 초안");
});
