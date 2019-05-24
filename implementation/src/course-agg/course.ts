import { CourseTypeEnum } from './course-type-enum';
import Niaz from './niaz';
import NiazDarsi from './niaz-darsi';

export class Course {
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
  constructor(private _name: string, private _vahed: number, private _courseType: CourseTypeEnum) {}

  addPishniaz() {}
  addHamniaz() {}
}