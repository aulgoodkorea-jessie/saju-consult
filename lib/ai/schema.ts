import { z } from "zod";

export const readingSchema = z.object({
  summary: z.string(),
  saju_evidence: z.array(z.object({
    pillar: z.enum(["연주", "월주", "일주", "시주"]),
    note: z.string(),
  })),
  interpretation: z.string(),
  actions: z.array(z.string().min(1)).min(1).max(3),
  limitations: z.string(),
  follow_up_question: z.string(),
});

export type Reading = z.infer<typeof readingSchema>;
