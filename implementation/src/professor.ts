import Person from './person';

export default class Professor extends Person {
  constructor(firstName: string, lastName: string, phoneNumber: string, nationalCode: string, private pid: string) {
    super(firstName, lastName, phoneNumber, nationalCode);
  }
}
