import type { Topic } from "./saju/types";

export const topicChoices: { id: Topic; emoji: string; title: string; body: string }[] = [
  {
    id: "love",
    emoji: "💌",
    title: "연애",
    body: "관계에서 반복되는 패턴과 대화 방향을 살펴봅니다.",
  },
  {
    id: "career",
    emoji: "🧭",
    title: "성공·진로",
    body: "일과 선택에서 참고할 성향과 실행 방향을 살펴봅니다.",
  },
  {
    id: "general",
    emoji: "📖",
    title: "종합",
    body: "전반적인 성향과 현재 고민을 함께 살펴봅니다.",
  },
];
