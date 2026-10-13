import { knowledgeDocs } from "./docs";
import type { Topic } from "../saju/types";

export function selectKnowledge(topic: Topic): string {
  const picked = knowledgeDocs.filter((doc) => {
    if (doc.topics.includes("common") || doc.topics.includes(topic)) return true;
    return topic === "general" && (doc.topics.includes("love") || doc.topics.includes("career"));
  });
  return picked
    .map((doc) => `[${doc.id}] 출처: ${doc.source} / 검토: ${doc.reviewStatus}\n${doc.body}`)
    .join("\n\n");
}
