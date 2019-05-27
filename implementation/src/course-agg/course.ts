import { CourseTypeEnum } from './course-type-enum';
import Niaz from './niaz';
import NiazDarsi from './niaz-darsi';

export class Course {
  isSameCourse(course: Course): boolean {
    return this.id === course.id;
  }
  public get id(): string {
    return this._id;
  }
  public get courseType(): CourseTypeEnum {
    return this._courseType;
  }
  public set courseType(value: CourseTypeEnum) {
    this._courseType = value;
  }
  public get vahed(): number {
    return this._vahed;
  }
  public set vahed(value: number) {
    this._vahed = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  pishniazHa: Niaz[] = [];
  hamniazHa: NiazDarsi[] = [];
  constructor(private _id: string, private _name: string, private _vahed: number, private _courseType: CourseTypeEnum) {}

  addPishniaz(niaz: Niaz) {
    this.pishniazHa.push(niaz);
  }
  addHamniaz(niaz: NiazDarsi) {
    this.hamniazHa.push(niaz);
  }
}
