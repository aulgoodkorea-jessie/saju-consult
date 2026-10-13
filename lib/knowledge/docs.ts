import type { Topic } from "../saju/types";

export type KnowledgeDoc = {
  id: string;
  topics: Array<Topic | "common">;
  source: string;
  reviewStatus: "draft";
  body: string;
};

const source = "내부 기획 초안, 2026-10";

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: "common-elements",
    topics: ["common"],
    source,
    reviewStatus: "draft",
    body: "목화토금수의 상생과 상극은 참고 관계입니다. 오행 개수의 차이로 사건을 확정하지 않습니다.",
  },
  {
    id: "common-caution",
    topics: ["common"],
    source,
    reviewStatus: "draft",
    body: "전달되지 않은 대운, 용신, 시주는 만들지 않습니다. 죽음, 질병, 투자, 법적 결과, 타인의 속마음은 판단하지 않습니다.",
  },
  {
    id: "love",
    topics: ["love"],
    source,
    reviewStatus: "draft",
    body: "관계에서 반복되는 패턴과 대화 방향은 일간과 십성을 실마리로 설명합니다. 상대의 마음을 사실처럼 단정하지 않습니다.",
  },
  {
    id: "career",
    topics: ["career"],
    source,
    reviewStatus: "draft",
    body: "일과 선택에서 참고할 성향은 일간과 십성으로 설명합니다. 퇴사나 투자를 권하지 않습니다.",
  },
];
