import { BirthForm } from "@/components/BirthForm";
import { PageBackdrop } from "@/components/PageBackdrop";

export default function BirthPage() {
  return (
    <>
      <PageBackdrop src="/bg-birth.jpg" tone="ink" />
      <BirthForm />
    </>
  );
}
