import { expect, it } from "vitest";
import { elementOfBranch, elementOfStem, koBranch, koElement, koStem, koTenGod } from "../../lib/saju/maps";

it("translates the published eight-char sample", () => {
  expect(koStem("乙") + koBranch("酉")).toBe("을유");
  expect(koTenGod("偏财")).toBe("편재");
  expect(koTenGod("日主")).toBe("일간");
  expect(koTenGod("七杀")).toBe("편관");
  expect(koElement("木")).toBe("목");
  expect(elementOfStem("乙")).toBe("목");
  expect(elementOfBranch("酉")).toBe("금");
});
