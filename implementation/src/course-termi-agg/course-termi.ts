import Professor from '../professor';
import { College } from './college-enum';

export class CourseTermi {
  constructor(private year: string, private term: string, private professor: Professor[], private presentationCollege: College) {}
}
