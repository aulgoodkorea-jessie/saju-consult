import type { Reading } from "../ai/schema";
import type { BirthInput, CounselorStyle, SajuChart, Topic } from "../saju/types";

export type Draft = {
  topic: Topic | null;
  counselor: CounselorStyle | null;
  question: string;
  birth: BirthInput | null;
};

export const emptyDraft: Draft = {
  topic: null,
  counselor: null,
  question: "",
  birth: null,
};

const draftKey = "saju.draft.v1";
const readingKey = "saju.reading.v1";

export function saveDraft(storage: Storage, draft: Draft) {
  storage.setItem(draftKey, JSON.stringify(draft));
}

export function loadDraft(storage: Storage): Draft {
  const raw = storage.getItem(draftKey);
  if (!raw) return emptyDraft;
  try {
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return {
      topic: parsed.topic ?? null,
      counselor: parsed.counselor ?? null,
      question: typeof parsed.question === "string" ? parsed.question : "",
      birth: parsed.birth ?? null,
    };
  } catch {
    return emptyDraft;
  }
}

export function saveReading(storage: Storage, value: { chart: SajuChart; reading: Reading }) {
  storage.setItem(readingKey, JSON.stringify(value));
}

export function loadReading(storage: Storage): { chart: SajuChart; reading: Reading } | null {
  const raw = storage.getItem(readingKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { chart: SajuChart; reading: Reading };
  } catch {
    return null;
  }
}

export function clearReading(storage: Storage) {
  storage.removeItem(readingKey);
}

export function clearConsult(storage: Storage) {
  storage.removeItem(draftKey);
  storage.removeItem(readingKey);
}
