import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
  }
  return files;
}

it("client ui does not import the calendar library, openai, or calculate", () => {
  const files = [...walk("app"), ...walk("components")].filter(
    (file) => !file.includes(`${path.sep}api${path.sep}`),
  );
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    expect(src, file).not.toContain("lunar-javascript");
    expect(src, file).not.toContain("openai");
    expect(src, file).not.toContain("@/lib/saju/calculate");
  }
});
