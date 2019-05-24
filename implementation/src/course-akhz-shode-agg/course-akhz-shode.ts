import { AkhzCourseState } from './akhz-course-state-enum';
import { CourseTermi } from '../course-termi-agg/course-termi';

export default class CourseAkhzShode {
  public get state(): AkhzCourseState {
    return this._state;
  }
  constructor(private _state: AkhzCourseState, private courseTermi: CourseTermi) {}
}
