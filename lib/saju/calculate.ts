import { Lunar, Solar } from "lunar-javascript";
import { elementOfBranch, elementOfStem, koBranch, koStem, koTenGod } from "./maps";
import type { BirthInput, ElementCounts, ElementName, Pillar, PillarLabel, SajuChart } from "./types";

const elementNames: ElementName[] = ["목", "화", "토", "금", "수"];

function emptyCounts(): ElementCounts {
  return { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
}

function add(bag: ElementCounts, name: ElementName) {
  if (elementNames.includes(name)) bag[name] += 1;
}

function pillar(
  label: PillarLabel,
  gan: string,
  zhi: string,
  tenGod: string,
  hide: string[],
): Pillar {
  return {
    label,
    gan: koStem(gan),
    zhi: koBranch(zhi),
    ganzi: koStem(gan) + koBranch(zhi),
    elementGan: elementOfStem(gan),
    elementZhi: elementOfBranch(zhi),
    tenGodGan: koTenGod(tenGod),
    hideGan: hide.map((item) => koStem(item)),
  };
}

export function calculate(input: BirthInput): SajuChart {
  const hour = input.timeKnown ? input.hour ?? 12 : 12;
  const minute = input.timeKnown ? input.minute ?? 0 : 0;
  const lunar = input.calendar === "solar"
    ? Solar.fromYmdHms(input.year, input.month, input.day, hour, minute, 0).getLunar()
    : Lunar.fromYmdHms(
        input.year,
        input.isLeapMonth ? -input.month : input.month,
        input.day,
        hour,
        minute,
        0,
      );
  const eight = lunar.getEightChar();
  eight.setSect(2);

  const pillars = [
    pillar("연주", eight.getYearGan(), eight.getYearZhi(), eight.getYearShiShenGan(), eight.getYearHideGan()),
    pillar("월주", eight.getMonthGan(), eight.getMonthZhi(), eight.getMonthShiShenGan(), eight.getMonthHideGan()),
    pillar("일주", eight.getDayGan(), eight.getDayZhi(), eight.getDayShiShenGan(), eight.getDayHideGan()),
    pillar("시주", eight.getTimeGan(), eight.getTimeZhi(), eight.getTimeShiShenGan(), eight.getTimeHideGan()),
  ];
  const visible = input.timeKnown ? pillars : pillars.slice(0, 3);
  const stem = emptyCounts();
  const branch = emptyCounts();
  for (const item of visible) {
    add(stem, item.elementGan);
    add(branch, item.elementZhi);
  }
  const uncertainties = ["성별을 입력받지 않아 대운은 계산하지 않습니다."];
  if (!input.timeKnown) uncertainties.push("출생 시각을 몰라 시주를 계산하지 않았습니다.");

  return {
    pillars: visible,
    dayMaster: visible[2].gan,
    elementCounts: { stem, branch },
    policy: {
      library: "lunar-javascript",
      monthRule: "solar-term",
      dayBoundary: "midnight",
      sect: 2,
      timezone: "Asia/Seoul",
      trueSolarTime: false,
      hourIncluded: input.timeKnown,
    },
    uncertainties,
  };
}
