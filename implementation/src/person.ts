export default abstract class Person {
  protected get nationalCode(): string {
    return this._nationalCode;
  }
  protected set nationalCode(value: string) {
    this._nationalCode = value;
  }
  protected get phoneNumber(): string {
    return this._phoneNumber;
  }
  protected set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
  protected get lastName(): string {
    return this._lastName;
  }
  protected set lastName(value: string) {
    this._lastName = value;
  }
  protected get firstName(): string {
    return this._firstName;
  }
  protected set firstName(value: string) {
    this._firstName = value;
  }
  constructor(private _firstName: string, private _lastName: string, private _phoneNumber: string, private _nationalCode: string) {}
}
