import EducationalTerm from './educational-term';
import EntekhabVahedTerm from './entekhab-vahed-term';
import Person from './person';
import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';
import { CourseTermi } from './course-termi-agg/course-termi';

export default class Student extends Person {
  public get sid(): string {
    return this._sid;
  }
  private entekhabVahedTerms: EntekhabVahedTerm[] = [];
  get vahedPassed(): number {
    return this.getAllPassedCourses().reduce<number>((res, courseTermi) => courseTermi.course.vahed, 0);
  }
  public get enteranceTerm(): EducationalTerm {
    return this._enteranceTerm;
  }
  private _avgGrade = 0;
  get avgGrade() {
    return this._avgGrade;
  }
  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    nationalCode: string,
    private _sid: string,
    private _enteranceTerm: EducationalTerm
  ) {
    super(firstName, lastName, phoneNumber, nationalCode);
  }
  addEntekhabVahedTerm(entekhabVahedTerm: EntekhabVahedTerm) {
    this.entekhabVahedTerms.push(entekhabVahedTerm);
  }
  getAllPassedCourses(): CourseTermi[] {
    return this.entekhabVahedTerms
      .reduce<CourseAkhzShode[]>((res, evt) => [...res, ...evt.getPassedCourses()], [])
      .map(courseAkhzShode => courseAkhzShode.courseTermi);
  }
}
