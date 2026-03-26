class Validated<E = unknown> {

  private _value: E;
  private _isValid: boolean;
  private _error: string;

  constructor(value: E) {
    this._value = value;
  }

  public getError(): string {
    return this._error;
  }

  public setError(value: string): void {
    this._error = value;
  }

  public getIsValid(): boolean {
    return this._isValid;
  }

  public setIsValid(value: boolean): void {
    this._isValid = value;
  }

  public getValue(): E {
    return this._value;
  }

  public setValue(value: E): void {
    this._value = value;
  }
}

export default Validated;