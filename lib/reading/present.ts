import type { Reading } from "../ai/schema";
import type { SajuChart } from "../saju/types";

export type PresentedReading = {
  pillars: { pillar: SajuChart["pillars"][number]; note: string | null }[];
  summary: string;
  interpretation: string;
  actions: string[];
  limitations: string;
  followUp: string;
};

export function presentReading(chart: SajuChart, reading: Reading): PresentedReading {
  const notes = new Map(reading.saju_evidence.map((item) => [item.pillar, item.note]));
  return {
    pillars: chart.pillars.map((pillar) => ({
      pillar,
      note: notes.get(pillar.label) ?? null,
    })),
    summary: reading.summary,
    interpretation: reading.interpretation,
    actions: reading.actions,
    limitations: reading.limitations,
    followUp: reading.follow_up_question,
  };
}
