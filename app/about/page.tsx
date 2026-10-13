import { copy } from "@/lib/copy";

export default function AboutPage() {
  return (
    <article className="space-y-4 pt-2">
      <h1 className="text-[2rem] font-semibold">서비스 안내</h1>
      <p>만세력 계산과 AI 해석을 나눕니다. 사주 기둥은 계산 모듈이 정하고, AI는 그 결과와 검토된 자료만 설명합니다.</p>
      <p>로그인 없이 이용합니다. 결과는 미래 확정 예언이 아닙니다.</p>
      <p className="rounded-card bg-mist px-4 py-3">{copy.notice}</p>
    </article>
  );
}
