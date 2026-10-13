import type { ElementName } from "./types";

const stems: Record<string, string> = {
  甲: "갑", 乙: "을", 丙: "병", 丁: "정", 戊: "무",
  己: "기", 庚: "경", 辛: "신", 壬: "임", 癸: "계",
};

const branches: Record<string, string> = {
  子: "자", 丑: "축", 寅: "인", 卯: "묘", 辰: "진", 巳: "사",
  午: "오", 未: "미", 申: "신", 酉: "유", 戌: "술", 亥: "해",
};

const elements: Record<string, ElementName> = {
  木: "목", 火: "화", 土: "토", 金: "금", 水: "수",
};

const tenGods: Record<string, string> = {
  比肩: "비견", 劫财: "겁재", 食神: "식신", 伤官: "상관",
  偏财: "편재", 正财: "정재", 七杀: "편관", 正官: "정관",
  偏印: "편인", 正印: "정인", 日主: "일간",
};

const stemElements: Record<string, ElementName> = {
  甲: "목", 乙: "목", 丙: "화", 丁: "화", 戊: "토",
  己: "토", 庚: "금", 辛: "금", 壬: "수", 癸: "수",
};

const branchElements: Record<string, ElementName> = {
  子: "수", 亥: "수", 寅: "목", 卯: "목", 巳: "화", 午: "화",
  申: "금", 酉: "금", 辰: "토", 戌: "토", 丑: "토", 未: "토",
};

function read(table: Record<string, string>, han: string, label: string) {
  const value = table[han];
  if (!value) throw new Error(`unknown ${label} ${han}`);
  return value;
}

export function koStem(han: string) {
  return read(stems, han, "stem");
}

export function koBranch(han: string) {
  return read(branches, han, "branch");
}

export function koElement(han: string): ElementName {
  const value = elements[han];
  if (!value) throw new Error(`unknown element ${han}`);
  return value;
}

export function koTenGod(han: string) {
  return read(tenGods, han, "ten god");
}

export function elementOfStem(han: string): ElementName {
  const value = stemElements[han];
  if (!value) throw new Error(`unknown stem ${han}`);
  return value;
}

export function elementOfBranch(han: string): ElementName {
  const value = branchElements[han];
  if (!value) throw new Error(`unknown branch ${han}`);
  return value;
}
