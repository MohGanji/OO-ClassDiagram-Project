import { Course } from './course-agg/course';
import Student from './student';

class AkhzCourseHandlerSingleton {
  constructor() {}

  areDependenciesResolved(course: Course, student: Student): boolean {
    // get course niazes
    // see if student passed all the niazes
    return false;
  }
}

const AkhzCourseHandler = new AkhzCourseHandlerSingleton();
export default AkhzCourseHandler;
