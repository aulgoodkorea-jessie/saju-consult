import Link from "next/link";

const buttonClass =
  "flex min-h-12 w-full items-center justify-center rounded-card bg-pine px-4 text-base font-semibold text-paper disabled:cursor-not-allowed disabled:bg-line disabled:text-ink";

export function StickyAction({
  href,
  label,
  disabled,
  onClick,
  type = "button",
}: {
  href?: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 px-4 py-3">
      <div className="mx-auto max-w-3xl">
        {href && !disabled ? (
          <Link className={buttonClass} href={href}>
            {label}
          </Link>
        ) : (
          <button className={buttonClass} disabled={disabled} onClick={onClick} type={type}>
            {label}
          </button>
        )}
      </div>
    </div>
  );
}
