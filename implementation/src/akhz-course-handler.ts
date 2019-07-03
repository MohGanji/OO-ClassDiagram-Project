import { Course } from './course-agg/course';
import Student from './student';
import NiazDarsi from './course-agg/niaz-darsi';
import NiazVahedi from './course-agg/niaz-vahedi';
import { CourseTermi } from './course-termi-agg/course-termi';
import StudentRepository from './repositories/student-repository';
import EducationalTerm from './educational-term';

class AkhzCourseHandlerSingleton {
  constructor() {}

  studentsWhoRegisteredCourse(courseTermi: CourseTermi): Student[] {
    return StudentRepository.getAllStudents().filter(s => {
      const currentTermEntekhabVahed = s.getCurrentTermEntekhabVahed();
      if (!currentTermEntekhabVahed) return false;
      return currentTermEntekhabVahed.getRegisteredCourses().some(c => c.isSameCourseTermi(courseTermi));
    });
  }

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

  getMinAndMaxVahedStudentCanTake(student: Student, term: EducationalTerm) {
    const { enteranceTerm, avgGrade } = student;
    const maxVahed = avgGrade < 12 ? 14 : avgGrade > 17 ? 24 : 20;
    const minVahed = term.year - enteranceTerm.year >= 4 ? 0 : 12;
    return { minVahed, maxVahed };
  }
}

const AkhzCourseHandler = new AkhzCourseHandlerSingleton();
export default AkhzCourseHandler;
