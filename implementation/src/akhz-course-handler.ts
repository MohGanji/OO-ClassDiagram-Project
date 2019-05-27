import { Course } from './course-agg/course';
import Student from './student';
import NiazDarsi from './course-agg/niaz-darsi';
import NiazVahedi from './course-agg/niaz-vahedi';
import { CourseTermi } from './course-termi-agg/course-termi';
import StudentRepository from './repositories/student-repository';

class AkhzCourseHandlerSingleton {
  studentsWhoRegisteredCourse(courseTermi: CourseTermi): Student[] {
    return StudentRepository.getAllStudents().filter(s => {
      const currentTermEntekhabVahed = s.getCurrentTermEntekhabVahed();
      if (!currentTermEntekhabVahed) return false;
      return currentTermEntekhabVahed.getRegisteredCourses().some(c => c.isSameCourseTermi(courseTermi));
    });
  }
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
