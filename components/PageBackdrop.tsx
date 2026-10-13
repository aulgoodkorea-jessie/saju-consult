"use client";

import { useEffect } from "react";

export function PageBackdrop({ src, tone }: { src: string; tone: "ink" | "paper" }) {
  useEffect(() => {
    document.documentElement.dataset.photo = tone;
    return () => {
      delete document.documentElement.dataset.photo;
    };
  }, [tone]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
