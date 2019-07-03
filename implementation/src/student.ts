import { CourseTermi } from './course-termi-agg/course-termi';
import EducationalTerm from './educational-term';
import EntekhabVahedTerm from './entekhab-vahed-term';
import Person from './person';
import StudentRepository from './repositories/student-repository';
import GraduationHandler from './graduation-handler';
import { Chart } from './chart';
import { Course } from './course-agg/course';

export default interface Student {
  readonly sid: string;
  readonly vahedPassed: number;
  readonly avgGrade: number;
  readonly enteranceTerm: EducationalTerm;
  readonly chart: Chart;
  getAllPassedCourses(): CourseTermi[];
  addEntekhabVahedTerm(entekhabVahedTerm: EntekhabVahedTerm): void;
  getCurrentTermEntekhabVahed(): EntekhabVahedTerm | undefined;
}

class StudentImpl implements Student {
  public get chart() {
    return this._chart
  }
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
  constructor(private person: Person, private _sid: string, private _enteranceTerm: EducationalTerm, private _chart: Chart) { }
  addEntekhabVahedTerm(entekhabVahedTerm: EntekhabVahedTerm) {
    this.entekhabVahedTerms.push(entekhabVahedTerm);
  }
  getAllPassedCourses(): CourseTermi[] {
    return this.entekhabVahedTerms.reduce<CourseTermi[]>((res, evt) => [...res, ...evt.getPassedCourses()], []);
  }
  getCurrentTermEntekhabVahed(): EntekhabVahedTerm | undefined {
    return this.entekhabVahedTerms[this.entekhabVahedTerms.length - 1];
  }
  hasGraduated(): boolean {
    // TODO:
    const myPassedCourses: Course[] = this.getAllPassedCourses().map(c => c.course);
    return GraduationHandler.hasPassedRequiredCourses(this.chart, myPassedCourses)
      && GraduationHandler.hasPassedEnoughOptionalCourses(this.chart, myPassedCourses)
      && GraduationHandler.hasPassedSelectiveCourses(this.chart, myPassedCourses)
  }
}

export const StudentFactory = {
  createStudent(person: Person, sid: string, enteranceTerm: EducationalTerm, chart: Chart) {
    const student = new StudentImpl(person, sid, enteranceTerm, chart);
    StudentRepository.save(student);
    return student;
  }
};
