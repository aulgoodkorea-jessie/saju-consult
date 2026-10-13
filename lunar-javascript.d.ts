declare module "lunar-javascript" {
  export class EightChar {
    setSect(sect: number): void;
    getYearGan(): string;
    getYearZhi(): string;
    getYearShiShenGan(): string;
    getYearHideGan(): string[];
    getMonthGan(): string;
    getMonthZhi(): string;
    getMonthShiShenGan(): string;
    getMonthHideGan(): string[];
    getDayGan(): string;
    getDayZhi(): string;
    getDayShiShenGan(): string;
    getDayHideGan(): string[];
    getTimeGan(): string;
    getTimeZhi(): string;
    getTimeShiShenGan(): string;
    getTimeHideGan(): string[];
  }

  export class Lunar {
    static fromYmdHms(
      year: number,
      month: number,
      day: number,
      hour: number,
      minute: number,
      second: number,
    ): Lunar;
    getEightChar(): EightChar;
  }

  export class Solar {
    static fromYmdHms(
      year: number,
      month: number,
      day: number,
      hour: number,
      minute: number,
      second: number,
    ): { getLunar(): Lunar };
  }

  export class LunarYear {
    static fromYear(year: number): { getLeapMonth(): number };
  }
}
