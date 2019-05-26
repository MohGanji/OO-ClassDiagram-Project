import Niaz from './niaz';

export default class NiazVahedi extends Niaz {
  public get minPassedVahed(): number {
    return this._minPassedVahed;
  }
  constructor(private _minPassedVahed: number) {
    super();
  }
}
