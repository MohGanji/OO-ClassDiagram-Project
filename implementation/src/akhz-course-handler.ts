import { Course } from './course-agg/course';
import Student from './student';
import NiazDarsi from './course-agg/niaz-darsi';
import NiazVahedi from './course-agg/niaz-vahedi';

class AkhzCourseHandlerSingleton {
  constructor() {}

  arePishniazDependenciesResolved(course: Course, student: Student): boolean {
    const { pishniazHa } = course;
    const allPassedCourses = student.getAllPassedCourses();
    const vahedPassed = student.vahedPassed;

    const pishniazHaResolved = pishniazHa.every(pn => {
      if (pn instanceof NiazDarsi) {
        return allPassedCourses.map(courseAkhzShode => courseAkhzShode.course).indexOf(pn.course) !== -1;
      } else if (pn instanceof NiazVahedi) {
        return vahedPassed >= pn.minPassedVahed;
      } else {
        // Unexpected: unsupported type of niaz!
        return false;
      }
    });

    return pishniazHaResolved;
  }
}

const AkhzCourseHandler = new AkhzCourseHandlerSingleton();
export default AkhzCourseHandler;
