import { PageBackdrop } from "@/components/PageBackdrop";
import { StickyAction } from "@/components/StickyAction";
import { TopicCards } from "@/components/TopicCards";
import { copy } from "@/lib/copy";

export default function HomePage() {
  return (
    <div className="space-y-8 pt-2">
      <PageBackdrop src="/hero-background.jpg" tone="paper" />
      <h1 className="text-[2rem] font-semibold leading-tight">{copy.hero}</h1>
      <p className="text-pretty text-center">{copy.principleNotice}</p>
      <img
        src="/saju-intro.jpg"
        alt="달빛이 비친 호수와 소나무"
        className="w-full rounded-card object-cover"
      />
      <section>
        <h2 className="mb-3 text-2xl font-semibold">상담 주제</h2>
        <TopicCards />
      </section>
      <StickyAction href="/consult" label="상담 시작" />
    </div>
  );
}
