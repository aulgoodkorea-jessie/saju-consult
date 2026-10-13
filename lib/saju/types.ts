export type Topic = "love" | "career" | "general";
export type CounselorStyle = "clear" | "empathetic";

export type BirthInput = {
  calendar: "solar" | "lunar";
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  timeKnown: boolean;
  hour?: number;
  minute?: number;
};

export type PillarLabel = "연주" | "월주" | "일주" | "시주";
export type ElementName = "목" | "화" | "토" | "금" | "수";

export type Pillar = {
  label: PillarLabel;
  gan: string;
  zhi: string;
  ganzi: string;
  elementGan: ElementName;
  elementZhi: ElementName;
  tenGodGan: string;
  hideGan: string[];
};

export type ElementCounts = Record<ElementName, number>;

export type SajuChart = {
  pillars: Pillar[];
  dayMaster: string;
  elementCounts: {
    stem: ElementCounts;
    branch: ElementCounts;
  };
  policy: {
    library: "lunar-javascript";
    monthRule: "solar-term";
    dayBoundary: "midnight";
    sect: 2;
    timezone: "Asia/Seoul";
    trueSolarTime: false;
    hourIncluded: boolean;
  };
  uncertainties: string[];
};
