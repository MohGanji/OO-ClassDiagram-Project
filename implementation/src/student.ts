import Person from './person';
import EducationalTerm from './educational-term';
 
export default class Student extends Person {
  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    nationalCode: string,
    private sid: string,
    private enteranceTerm: EducationalTerm
  ) {
    super(firstName, lastName, phoneNumber, nationalCode);
  }
}
