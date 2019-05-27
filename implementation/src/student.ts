import EducationalTerm from './educational-term';
import EntekhabVahedTerm from './entekhab-vahed-term';
import Person from './person';
import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';
import { CourseTermi } from './course-termi-agg/course-termi';
import StudentRepository from './repositories/student-repository';

export default interface Student {
  readonly sid: string;
  readonly vahedPassed: number;
  readonly avgGrade: number;
  readonly enteranceTerm: EducationalTerm;
  getAllPassedCourses(): CourseTermi[];
  addEntekhabVahedTerm(entekhabVahedTerm: EntekhabVahedTerm): void;
  getCurrentTermEntekhabVahed(): EntekhabVahedTerm | undefined;
}

class StudentImpl extends Person implements Student {
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
    return this.entekhabVahedTerms.reduce<CourseTermi[]>((res, evt) => [...res, ...evt.getPassedCourses()], []);
  }
  getCurrentTermEntekhabVahed(): EntekhabVahedTerm | undefined {
    return this.entekhabVahedTerms[this.entekhabVahedTerms.length - 1];
  }
}

export const StudentFactory = {
  createStudent(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    nationalCode: string,
    sid: string,
    enteranceTerm: EducationalTerm
  ) {
    const student = new StudentImpl(firstName, lastName, phoneNumber, nationalCode, sid, enteranceTerm);
    StudentRepository.save(student);
    return student;
  }
};
