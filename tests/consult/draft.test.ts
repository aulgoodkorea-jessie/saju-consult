import { expect, it } from "vitest";
import { clearConsult, emptyDraft, loadDraft, saveDraft, saveReading } from "../../lib/consult/draft";

function memory(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key) => map.get(key) ?? null,
    key: (index) => [...map.keys()][index] ?? null,
    removeItem: (key) => {
      map.delete(key);
    },
    setItem: (key, value) => {
      map.set(key, value);
    },
  };
}

it("clears the draft and the reading together", () => {
  const storage = memory();
  saveDraft(storage, { ...emptyDraft, question: "관계" });
  saveReading(storage, {
    chart: {} as never,
    reading: {
      summary: "참고",
      saju_evidence: [],
      interpretation: "해석",
      actions: ["적기"],
      limitations: "한계",
      follow_up_question: "",
    },
  });
  clearConsult(storage);
  expect(loadDraft(storage)).toEqual(emptyDraft);
  expect(storage.getItem("saju.reading.v1")).toBeNull();
});

it("returns an empty draft when the stored json is broken", () => {
  const storage = memory();
  storage.setItem("saju.draft.v1", "{");
  expect(loadDraft(storage)).toEqual(emptyDraft);
});
