export const copy = {
  wordmark: "내 사주 엿보기",
  hero: "개인 사주 데이터를 바탕으로 고민을 정리하는 AI 상담",
  notice: "이 해석은 전통 명리 관점의 참고 정보입니다.",
  principleNotice:
    "사주 계산 결과를 바탕으로 AI가 전통 명리 관점의 당신의 사주를 풀이합니다. 미래 확정 예언이 아님을 주의해 주세요.",
  timeUnknown: "시간을 모르면 시주를 제외해 해석합니다.",
  timezone: "한국 표준시로 계산합니다. 이번 버전은 지역별 진태양시 보정을 하지 않습니다.",
  aiError: "해석을 만들지 못했습니다. 입력은 그대로 두었으니 다시 시도해 주세요.",
  calcError: "날짜를 사주로 계산할 수 없습니다. 양력·음력과 윤달을 확인해 주세요.",
  analyzing: "사주 정보를 확인하고 해석을 작성하고 있습니다.",
  readingStages: ["입력 확인", "사주 계산", "해석 작성", "결과 정리"],
  followUpAnalyzing: "이전 답변을 확인하고 이어서 해석을 작성하고 있습니다.",
  followUpStages: ["이전 답변 확인", "이어서 해석 작성"],
  startingAnalysis: "분석을 시작하고 있습니다",
  followUpPending: "이어서 해석하는 중",
};

export const defaultQuestions = {
  love: "관계에서 반복되는 패턴과 대화 방향을 알고 싶습니다.",
  career: "일과 선택에서 참고할 성향과 실행 방향을 알고 싶습니다.",
  general: "전반적인 성향과 지금 고민을 함께 살펴보고 싶습니다.",
} as const;
