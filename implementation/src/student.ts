import Person from './person';
import EnteranceTerm from './enterance-term';

export default class Student extends Person {
  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    nationalCode: string,
    private sid: string,
    private enteranceTerm: EnteranceTerm
  ) {
    super(firstName, lastName, phoneNumber, nationalCode);
  }
}
