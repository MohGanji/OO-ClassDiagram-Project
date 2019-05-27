import { DayOfWeek } from './day-of-week-enum';

export default interface WeeklyTimeSlot {
  readonly startTime: Time;
  readonly endTime: Time;
  readonly weekDays: DayOfWeek[];
  interfere(otherWeeklyTimeSlot: WeeklyTimeSlot): boolean;
}

class WeeklyTimeSlotImpl implements WeeklyTimeSlot {
  public get startTime(): Time {
    return this._startTime;
  }
  public get endTime(): Time {
    return this._endTime;
  }
  public get weekDays(): DayOfWeek[] {
    return this._weekDays;
  }
  constructor(private _startTime: Time, private _endTime: Time, private _weekDays: DayOfWeek[]) {}

  interfere(other: WeeklyTimeSlot): boolean {
    return (
      this.weekDays === other.weekDays &&
      ((this.startTime > other.startTime && this.startTime < other.endTime) ||
        (this.endTime > other.startTime && this.endTime < other.endTime))
    );
  }
}

export const WeeklyTimeSlotFactory = {
  createWeeklyTimeSlot(startHour: number, startMinute: number, endHour: number, endMinute: number, weekDays: DayOfWeek[]) {
    return new WeeklyTimeSlotImpl(new Time(startHour, startMinute), new Time(endHour, endMinute), weekDays);
  }
};

class Time {
  constructor(private hour: number, private minute: number) {}
}
