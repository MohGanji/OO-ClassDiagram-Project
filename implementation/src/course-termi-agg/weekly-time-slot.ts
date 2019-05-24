import { DayOfWeek } from './day-of-week-enum';

export default interface WeeklyTimeSlot {
  startTime: Time;
  endTime: Time;
  weekDay: DayOfWeek;
  interfere(otherWeeklyTimeSlot: WeeklyTimeSlot): boolean;
}

class WeeklyTimeSlotImpl implements WeeklyTimeSlot {
  public get startTime(): Time {
    return this._startTime;
  }
  public get endTime(): Time {
    return this._endTime;
  }
  public get weekDay(): DayOfWeek {
    return this._weekDay;
  }
  constructor(private _startTime: Time, private _endTime: Time, private _weekDay: DayOfWeek) {}

  interfere(other: WeeklyTimeSlot): boolean {
    return (
      this.weekDay === other.weekDay &&
      ((this.startTime > other.startTime && this.startTime < other.endTime) ||
        (this.endTime > other.startTime && this.endTime < other.endTime))
    );
  }
}

export const WeeklyTimeSlotFactory = {
  createWeeklyTimeSlot(startHour: number, startMinute: number, endHour: number, endMinute: number, weekDay: DayOfWeek) {
    return new WeeklyTimeSlotImpl(new Time(startHour, startMinute), new Time(endHour, endMinute), weekDay);
  }
};

class Time {
  constructor(private hour: number, private minute: number) {}
}
