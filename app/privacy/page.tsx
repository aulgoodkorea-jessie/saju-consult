export default function PrivacyPage() {
  return (
    <article className="space-y-4 pt-2">
      <h1 className="text-[2rem] font-semibold">개인정보 안내</h1>
      <p>생년월일과 질문은 사주 기둥을 계산하고 그 요청을 해석하는 데 필요합니다.</p>
      <p>서버에 상담 기록을 저장하지 않습니다. 서버 로그에는 생년월일과 질문 원문을 남기지 않습니다.</p>
      <p>입력과 결과는 이 브라우저 탭의 임시 저장소에만 남습니다. 탭을 닫거나 새 상담을 누르면 지워집니다.</p>
    </article>
  );
}
