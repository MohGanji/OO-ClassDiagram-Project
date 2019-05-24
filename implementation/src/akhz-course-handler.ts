import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';
import Student from './student';
import { AkhzCourseState } from './course-akhz-shode-agg/akhz-course-state';

class AkhzCourseHandlerSingleton {
  constructor() {}

  DependenciesResolved(course: CourseAkhzShode, student: Student): boolean {
    if (course.state !== AkhzCourseState.Registered) return true;
    return false; // TODO
  }
}

const AkhzCourseHandler = new AkhzCourseHandlerSingleton();
export default AkhzCourseHandler;
