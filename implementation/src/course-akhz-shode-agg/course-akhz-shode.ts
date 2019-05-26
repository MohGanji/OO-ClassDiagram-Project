import { CourseTermi } from '../course-termi-agg/course-termi';
import { AkhzCourseState } from './akhz-course-state-enum';

export default class CourseAkhzShode {
  public get courseTermi(): CourseTermi {
    return this._courseTermi;
  }
  public get state(): AkhzCourseState {
    return this._state;
  }
  constructor(private _state: AkhzCourseState, private _courseTermi: CourseTermi) {}
}
