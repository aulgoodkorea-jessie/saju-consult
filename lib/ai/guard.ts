import type { Reading } from "./schema";

const banned = /반드시|무조건|틀림없이|운명은 이미/;

export function findForbiddenClaim(reading: Reading): string | null {
  const found = `${reading.summary}\n${reading.interpretation}`.match(banned);
  return found?.[0] ?? null;
}
