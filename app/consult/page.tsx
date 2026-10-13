import { Suspense } from "react";
import { ConsultChooser } from "@/components/ConsultChooser";
import { PageBackdrop } from "@/components/PageBackdrop";

export default function ConsultPage() {
  return (
    <>
      <PageBackdrop src="/bg-consult.jpg" tone="paper" />
      <Suspense fallback={<p>상담 설정을 불러오는 중입니다.</p>}>
        <ConsultChooser />
      </Suspense>
    </>
  );
}
