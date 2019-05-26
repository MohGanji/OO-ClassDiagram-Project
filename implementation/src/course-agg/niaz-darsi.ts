import Niaz from './niaz';
import { Course } from './course';

export default class NiazDarsi extends Niaz {
  public get course(): Course {
    return this._course;
  }
  constructor(private _course: Course) {
    super();
  }
}
