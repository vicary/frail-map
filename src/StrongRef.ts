/** As oppose to WeakRef */
export class StrongRef<T extends object> {
  #data: T;
  constructor(data: T) {
    this.#data = data;
  }
  deref() {
    return this.#data;
  }
  get [Symbol.toStringTag]() {
    return "StrongRef";
  }
}
