"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { StickyAction } from "@/components/StickyAction";
import { copy } from "@/lib/copy";
import { emptyDraft, loadDraft, saveDraft, type Draft } from "@/lib/consult/draft";
import { validateShape, type FieldErrors } from "@/lib/saju/shape";
import type { BirthInput } from "@/lib/saju/types";

const blank: BirthInput = {
  calendar: "solar",
  year: 1994,
  month: 1,
  day: 1,
  isLeapMonth: false,
  timeKnown: false,
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="mt-1 text-sm">{message}</p>;
}

export function BirthForm() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [birth, setBirth] = useState<BirthInput>(blank);
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadDraft(sessionStorage);
    if (!loaded.topic || !loaded.counselor) {
      router.replace("/consult");
      return;
    }
    setDraft(loaded);
    if (loaded.birth) setBirth(loaded.birth);
    setReady(true);
  }, [router]);

  function patch(next: Partial<BirthInput>) {
    setBirth((current) => ({ ...current, ...next }));
  }

  function dateErrors(value: BirthInput) {
    const result = validateShape({ ...value, timeKnown: false });
    if (result.ok) return {};
    const rest = { ...result.fields };
    delete rest.time;
    return rest;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = validateShape(birth);
    if (!result.ok) {
      setErrors(result.fields);
      if (result.fields.leap || result.fields.year || result.fields.month || result.fields.day) setStep(1);
      return;
    }
    setErrors({});
    setFormError("");
    const response = await fetch("/api/chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.value),
    });
    const json = await response.json().catch(() => null);
    if (response.status === 400) {
      const fields = (json?.fields ?? {}) as FieldErrors;
      setErrors(fields);
      if (fields.leap) setStep(1);
      return;
    }
    if (!response.ok) {
      setFormError(copy.calcError);
      return;
    }
    saveDraft(sessionStorage, { ...draft, birth: result.value });
    router.push("/confirm");
  }

  if (!ready) return <p>출생 정보를 불러오는 중입니다.</p>;

  return (
    <form className="space-y-6 pt-2" onSubmit={submit}>
      <h1 className="text-[2rem] font-semibold">출생 정보</h1>
      <p>생년월일은 사주 기둥을 계산하는 데 필요합니다.</p>
      {step === 1 ? (
        <fieldset className="space-y-4">
          <legend className="text-2xl font-semibold">기본 정보</legend>
          <div className="flex gap-4">
            {(["solar", "lunar"] as const).map((calendar) => (
              <label key={calendar} className="flex min-h-12 items-center gap-2">
                <input
                  type="radio"
                  name="calendar"
                  checked={birth.calendar === calendar}
                  onChange={() => patch({ calendar, isLeapMonth: calendar === "solar" ? false : birth.isLeapMonth })}
                />
                {calendar === "solar" ? "양력" : "음력"}
              </label>
            ))}
          </div>
          <label className="block">
            연도
            <input
              className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3"
              inputMode="numeric"
              aria-describedby="year-error"
              value={birth.year}
              onChange={(event) => patch({ year: Number(event.target.value) })}
            />
            <span className="mt-1 block text-sm">예시: 1994</span>
            <FieldError id="year-error" message={errors.year} />
          </label>
          <label className="block">
            월
            <input
              className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3"
              inputMode="numeric"
              aria-describedby="month-error"
              value={birth.month}
              onChange={(event) => patch({ month: Number(event.target.value) })}
            />
            <FieldError id="month-error" message={errors.month} />
          </label>
          <label className="block">
            일
            <input
              className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3"
              inputMode="numeric"
              aria-describedby="day-error"
              value={birth.day}
              onChange={(event) => patch({ day: Number(event.target.value) })}
            />
            <FieldError id="day-error" message={errors.day} />
          </label>
          {birth.calendar === "lunar" ? (
            <label className="flex min-h-12 items-center gap-2">
              <input
                type="checkbox"
                checked={birth.isLeapMonth}
                onChange={(event) => patch({ isLeapMonth: event.target.checked })}
              />
              윤달
            </label>
          ) : null}
          <FieldError id="leap-error" message={errors.leap} />
        </fieldset>
      ) : (
        <fieldset className="space-y-4">
          <legend className="text-2xl font-semibold">시간 정보</legend>
          <p>{copy.timeUnknown}</p>
          <p>{copy.timezone}</p>
          <label className="flex min-h-12 items-center gap-2">
            <input
              type="radio"
              name="timeKnown"
              checked={!birth.timeKnown}
              onChange={() => patch({ timeKnown: false, hour: undefined, minute: undefined })}
            />
            모름
          </label>
          <label className="flex min-h-12 items-center gap-2">
            <input
              type="radio"
              name="timeKnown"
              checked={birth.timeKnown}
              onChange={() => patch({ timeKnown: true, hour: birth.hour ?? 12, minute: birth.minute ?? 0 })}
            />
            시각을 입력
          </label>
          <label className="block">
            시 (0–23)
            <input
              className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3 disabled:bg-line"
              inputMode="numeric"
              disabled={!birth.timeKnown}
              placeholder="14"
              value={birth.hour ?? ""}
              onChange={(event) => patch({ hour: Number(event.target.value) })}
            />
          </label>
          <label className="block">
            분 (0–59)
            <input
              className="mt-1 w-full rounded-card border border-line bg-paper px-3 py-3 disabled:bg-line"
              inputMode="numeric"
              disabled={!birth.timeKnown}
              placeholder="30"
              value={birth.minute ?? ""}
              onChange={(event) => patch({ minute: Number(event.target.value) })}
            />
          </label>
          <FieldError id="time-error" message={errors.time} />
        </fieldset>
      )}
      {formError ? <p>{formError}</p> : null}
      {step === 2 ? (
        <button type="button" className="underline" onClick={() => setStep(1)}>
          이전 단계
        </button>
      ) : null}
      {step === 1 ? (
        <StickyAction
          label="시간 정보로"
          onClick={() => {
            const nextErrors = dateErrors(birth);
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length === 0) setStep(2);
          }}
        />
      ) : (
        <StickyAction label="정보 확인" type="submit" />
      )}
    </form>
  );
}
