import { Chart } from "./chart";
import { Course } from "./course-agg/course";
import { CourseTermi } from "./course-termi-agg/course-termi";

class GraduationHandlerSingleton {
  constructor() { }

  private hasPassedCourse(course: Course, passedCourses: Course[]): boolean {
    return !!passedCourses.find(passedCourse => passedCourse.isSameCourse(course))
  }

  hasPassedRequiredCourses(chart: Chart, passedCourses: Course[]): boolean {
    return chart.requiredCourses.every(
      (course: Course) => this.hasPassedCourse(course, passedCourses)
    );
  }
  hasPassedSelectiveCourses(chart: Chart, passedCourses: Course[]): boolean {
    return chart.selectiveCourseGroups.every(
      (selectiveGroup) => selectiveGroup.some((course) => this.hasPassedCourse(course, passedCourses))
    );
  }
  hasPassedEnoughOptionalCourses(chart: Chart, passedCourses: Course[]): boolean {
    const optionalCoursesPassed: Course[] = chart.optionalCourses.filter((course: Course) =>
      this.hasPassedCourse(course, passedCourses)
    );
    return optionalCoursesPassed
      .map(ocp => ocp.vahed)
      .reduce((res, vahed) => res + vahed, 0) === chart.optionalCourseCount
  }
}

const GraduationHandler = new GraduationHandlerSingleton();
export default GraduationHandler;
