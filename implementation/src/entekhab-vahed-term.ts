import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';

export default class EntekhabVahedTerm {
  courseAkhzShode: CourseAkhzShode[] = [];
  constructor(private minVahed: number, private maxVahed: number) {}

  addCourse(course: CourseAkhzShode) {
    this.courseAkhzShode.push(course);
  }
}
