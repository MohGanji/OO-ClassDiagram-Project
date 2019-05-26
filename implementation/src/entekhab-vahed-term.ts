import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';
import Student from './student';
import EducationalTerm from './educational-term';
import { AkhzCourseState } from './course-akhz-shode-agg/akhz-course-state-enum';
import { CourseTermi } from './course-termi-agg/course-termi';
import AkhzCourseHandler from './akhz-course-handler';

export default interface EntekhabVahedTerm {
  getPassedCourses(): CourseAkhzShode[];
  akhzCourse(courseTermi: CourseTermi): boolean;
}

class EntekhabVahedTermImpl implements EntekhabVahedTerm {
  courses: CourseAkhzShode[] = [];
  constructor(private minVahed: number, private maxVahed: number, private term: EducationalTerm, private student: Student) {}

  akhzCourse(courseTermi: CourseTermi): boolean {
    if (!this.checkMaxVahed(courseTermi.course.vahed)) return false;
    if (!AkhzCourseHandler.arePishniazDependenciesResolved(courseTermi.course, this.student)) return false;
    if (!this.checkWeeklySchedule(courseTermi)) return false;
    // TODO zaman emtehan

    this.courses.push(new CourseAkhzShode(AkhzCourseState.Registered, courseTermi));
    return true;
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
      this.AkhzShodeCourses().every(c => c.weeklyTimeSlots.every(otherWts => wts.interfere(otherWts)))
    );
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

  getPassedCourses(): CourseAkhzShode[] {
    return this.courses.filter(c => c.state === AkhzCourseState.Passed);
  }
}

export const EntekhabVahedTermFactory = {
  createEntekhabVahedTerm(student: Student, term: EducationalTerm) {
    const { enteranceTerm, avgGrade } = student;
    const maxVahed = avgGrade < 12 ? 14 : avgGrade > 17 ? 24 : 20;
    const minVahed = term.year - enteranceTerm.year >= 4 ? 0 : 12;
    const entekhabVahedTerm = new EntekhabVahedTermImpl(minVahed, maxVahed, term, student);
    student.addEntekhabVahedTerm(entekhabVahedTerm);
  }
};
