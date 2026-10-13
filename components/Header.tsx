import Link from "next/link";
import { copy } from "@/lib/copy";

export function Header() {
  return (
    <header>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
      <Link href="/" className="text-xl font-semibold">
        {copy.wordmark}
      </Link>
      <nav className="flex gap-4 text-sm">
        <Link href="/about">서비스 안내</Link>
        <Link href="/privacy">개인정보</Link>
      </nav>
      </div>
    </header>
  );
}
