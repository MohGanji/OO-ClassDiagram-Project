import { EducationalSeason } from './educational-season';

export default class EducationalTerm {
  public get season(): EducationalSeason {
    return this._season;
  }
  public get year(): number {
    return this._year;
  }
  constructor(private _year: number, private _season: EducationalSeason) {}
}
