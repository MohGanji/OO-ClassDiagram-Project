import { AkhzCourseState } from './akhz-course-state';
import { CourseTermi } from '../course-termi-agg/course-termi';

export default class CourseAkhzShode {
  constructor(private state: AkhzCourseState, private courseTermi: CourseTermi) {}
}
