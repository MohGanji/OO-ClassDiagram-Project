import Professor from '../professor';
import { College } from './college-enum';
import { Course } from '../course-agg/course';

export class CourseTermi {
  public get course(): Course {
    return this._course;
  }
  constructor(
    private _course: Course,
    private year: string,
    private term: string,
    private professor: Professor[],
    private presentationCollege: College
  ) {}
}
