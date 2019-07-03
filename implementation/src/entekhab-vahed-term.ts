import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';
import Student from './student';
import EducationalTerm from './educational-term';
import { AkhzCourseState } from './course-akhz-shode-agg/akhz-course-state-enum';
import { CourseTermi } from './course-termi-agg/course-termi';
import AkhzCourseHandler from './akhz-course-handler';

export default interface EntekhabVahedTerm {
  getPassedCourses(): CourseTermi[];
  akhzCourse(courseTermi: CourseTermi): boolean;
  applyAndFinalize(): boolean;
  revertAkhzCourse(courseTermi: CourseTermi): boolean;
  getRegisteredCourses(): CourseTermi[];
}

class EntekhabVahedTermImpl implements EntekhabVahedTerm {
  courses: CourseAkhzShode[] = [];
  constructor(private minVahed: number, private maxVahed: number, private term: EducationalTerm, private student: Student) {}

  akhzCourse(courseTermi: CourseTermi): boolean {
    if (!this.checkMaxVahed(courseTermi.course.vahed)) return false;
    if (!AkhzCourseHandler.arePishniazDependenciesResolved(courseTermi.course, this.student)) return false;
    if (!this.checkWeeklySchedule(courseTermi)) return false;
    if (!this.checkFinalExamSchedule(courseTermi)) return false;
    if (!this.checkDuplicateCourse(courseTermi)) return false;
    if (!this.checkCourseCapacity(courseTermi)) return false;
    if (!this.checkInternship(courseTermi)) return false;

    this.courses.push(new CourseAkhzShode(AkhzCourseState.Registered, courseTermi));
    return true;
  }
  private checkInternship(courseTermi: CourseTermi) {
    const hasInternship = this.courses.some(c => c.courseTermi.isInternship);
    return hasInternship ? courseTermi.isInternship : !courseTermi.isInternship;
  }
  private checkMaxVahed(vahed: number) {
    const totalVahed = this.AkhzShodeCourses().reduce((res, courseTermi) => res + courseTermi.course.vahed, 0);
    if (totalVahed + vahed > this.maxVahed) return false;
  }
  private checkMinVahed() {
    const totalVahed = this.AkhzShodeCourses().reduce((res, courseTermi) => res + courseTermi.course.vahed, 0);
    return totalVahed < this.minVahed;
  }
  private checkWeeklySchedule(courseTermi: CourseTermi) {
    return courseTermi.weeklyTimeSlots.every(wts =>
      this.AkhzShodeCourses().every(c => c.weeklyTimeSlots.every(otherWts => !wts.interfere(otherWts)))
    );
  }
  private checkFinalExamSchedule(courseTermi: CourseTermi) {
    return this.AkhzShodeCourses().every(c => c.weeklyTimeSlots.every(otherWts => !courseTermi.finalExamTime.interfere(otherWts)));
  }
  private checkDuplicateCourse(courseTermi: CourseTermi) {
    return (
      this.AkhzShodeCourses().every(c => !c.course.isSameCourse(courseTermi.course)) &&
      this.student.getAllPassedCourses().every(c => !c.course.isSameCourse(courseTermi.course))
    );
  }
  private checkCourseCapacity(courseTermi: CourseTermi) {
    return courseTermi.hasCapacity();
  }

  revertAkhzCourse(courseTermi: CourseTermi): boolean {
    const foundCourse = this.courses.find(c => c.courseTermi.course.id === courseTermi.course.id);
    if (!foundCourse) return false;
    this.courses = this.courses.filter(c => c.courseTermi.course.id !== courseTermi.course.id);
    return true;
  }

  applyAndFinalize(): boolean {
    if (!this.checkMinVahed()) return false;
    const akhzShodeCoursesTermi = this.AkhzShodeCourses();
    const akhzShodeCourses = akhzShodeCoursesTermi.map(asc => asc.course);
    const hamniazHaResolved = akhzShodeCoursesTermi.every(courseAkhzShode =>
      courseAkhzShode.course.hamniazHa.every(hn => akhzShodeCourses.indexOf(hn.course) !== -1)
    );

    if (!hamniazHaResolved) return false;

    return true;
  }

  private AkhzShodeCourses(): CourseTermi[] {
    return this.courses
      .filter(c => c.state === AkhzCourseState.Registered || c.state === AkhzCourseState.Pending)
      .map(courseAkhzShode => courseAkhzShode.courseTermi);
  }

  getPassedCourses(): CourseTermi[] {
    return this.courses.filter(c => c.state === AkhzCourseState.Passed).map(c => c.courseTermi);
  }
  getRegisteredCourses(): CourseTermi[] {
    return this.courses.filter(c => c.state === AkhzCourseState.Registered).map(c => c.courseTermi);
  }
}

export const EntekhabVahedTermFactory = {
  createEntekhabVahedTerm(student: Student, term: EducationalTerm) {
    const { minVahed, maxVahed } = AkhzCourseHandler.getMinAndMaxVahedStudentCanTake(student, term);
    const entekhabVahedTerm = new EntekhabVahedTermImpl(minVahed, maxVahed, term, student);
    student.addEntekhabVahedTerm(entekhabVahedTerm);
  }
};
