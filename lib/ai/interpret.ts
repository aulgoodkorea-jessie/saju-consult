import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { selectKnowledge } from "../knowledge/select";
import type { CounselorStyle, SajuChart, Topic } from "../saju/types";
import { findForbiddenClaim } from "./guard";
import { buildMessages } from "./prompt";
import { readingSchema, type Reading } from "./schema";

export type ChatParser = {
  parse: (args: unknown) => Promise<{ choices: { message: { parsed: Reading | null } }[] }>;
};

export function getParser(): ChatParser {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return {
    parse: (args) => client.beta.chat.completions.parse(args as never),
  };
}

export async function interpret(input: {
  counselor: CounselorStyle;
  topic: Topic;
  question: string;
  chart: SajuChart;
  priorSummary?: string;
  parser: ChatParser;
}): Promise<Reading> {
  const completion = await input.parser.parse({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: buildMessages({
      counselor: input.counselor,
      topic: input.topic,
      question: input.question,
      chart: input.chart,
      knowledge: selectKnowledge(input.topic),
      priorSummary: input.priorSummary,
    }),
    response_format: zodResponseFormat(readingSchema, "saju_reading"),
  });
  const parsed = completion.choices[0]?.message?.parsed ?? null;
  if (!parsed || findForbiddenClaim(parsed)) throw new Error("ai_refusal");
  return parsed;
}
