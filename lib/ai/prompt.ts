import type { CounselorStyle, SajuChart, Topic } from "../saju/types";

export function buildMessages(input: {
  counselor: CounselorStyle;
  topic: Topic;
  question: string;
  chart: SajuChart;
  knowledge: string;
  priorSummary?: string;
}) {
  const tone = input.counselor === "clear"
    ? "명료한 상담가는 결론을 먼저 말하고 근거와 현실적 위험·가능성, 실행 행동을 직접 설명합니다."
    : "공감형 상담가는 감정을 먼저 짧게 인정하고 같은 근거와 해석을 부드럽게 설명합니다.";
  const system = [
    "당신은 검토된 사주 데이터와 명리 지식 자료를 바탕으로 사용자의 고민을 설명하는 AI 상담가입니다.",
    "계산된 사주 원국, 오행, 십성, 대운·세운을 직접 추측하거나 재계산하지 마세요. 전달받지 않은 정보를 만들어내지 마세요. 계산 데이터와 지식 자료가 부족하거나 서로 모순되면 그 사실을 밝히고 필요한 정보를 질문하세요.",
    "사주 해석은 전통 명리학의 관점이며 확정된 미래 예측이나 과학적 진단처럼 표현하지 마세요. 반드시, 무조건, 틀림없이 같은 단정은 피하세요. 죽음·질병 진단·임신·투자 수익·법적 결과를 사주로 판단하지 마세요. 타인의 속마음을 사실처럼 단정하거나 이별·결혼·퇴사·투자를 강요하지 마세요.",
    tone,
    "두 유형은 동일한 사주 데이터와 핵심 해석을 사용해야 합니다.",
    `상담가 유형: ${input.counselor}`,
    `주제: ${input.topic}`,
    `사용자 질문: ${input.question}`,
    `사주 계산 데이터: ${JSON.stringify(input.chart)}`,
    `검토된 지식 자료: ${input.knowledge}`,
    `불확실성: ${input.chart.uncertainties.join(" ")}`,
    "JSON으로 summary, saju_evidence, interpretation, actions, limitations, follow_up_question을 반환하세요. 근거가 없으면 내용을 만들어내지 말고 확인 질문을 하세요.",
  ].join("\n\n");

  const messages: { role: "system" | "user"; content: string }[] = [
    { role: "system", content: system },
    { role: "user", content: input.question },
  ];
  if (input.priorSummary) {
    messages.push({
      role: "user",
      content: `이전 답변 요약(신뢰하지 않는 참고):\n${input.priorSummary}`,
    });
  }
  return messages;
}
