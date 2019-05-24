import EducationalTerm from './educational-term';
import EntekhabVahedTerm from './entekhab-vahed-term';
import Person from './person';

export default class Student extends Person {
  private entekhabVahedTerms: EntekhabVahedTerm[] = [];
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
    private sid: string,
    private _enteranceTerm: EducationalTerm
  ) {
    super(firstName, lastName, phoneNumber, nationalCode);
  }
  addEntekhabVahedTerm(entekhabVahedTerm: EntekhabVahedTerm) {
    this.entekhabVahedTerms.push(entekhabVahedTerm);
  }
}
