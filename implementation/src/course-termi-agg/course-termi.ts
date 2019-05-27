import Professor from '../professor';
import { College } from './college-enum';
import { Course } from '../course-agg/course';
import WeeklyTimeSlot from './weekly-time-slot';

export class CourseTermi {
  public get capacity(): number {
    return this._capacity;
  }
  public get finalExamTime(): WeeklyTimeSlot {
    return this._finalExamTime;
  }
  public get weeklyTimeSlots(): WeeklyTimeSlot[] {
    return this._weeklyTimeSlots;
  }
  public get course(): Course {
    return this._course;
  }
  constructor(
    private _course: Course,
    private year: string,
    private term: string,
    private professor: Professor[],
    private presentationCollege: College,
    private _weeklyTimeSlots: WeeklyTimeSlot[],
    private _finalExamTime: WeeklyTimeSlot,
    private _capacity: number
  ) {}
}
