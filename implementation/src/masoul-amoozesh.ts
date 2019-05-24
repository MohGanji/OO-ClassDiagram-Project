import Person from './person';

export default class MasoulAmoozesh extends Person {
  constructor(firstName: string, lastName: string, phoneNumber: string, nationalCode: string) {
    super(firstName, lastName, phoneNumber, nationalCode);
  }
}
