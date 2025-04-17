export class HashableObject {
  constructor(obj, hash = true) {
    this.obj = obj;
    this.hash = hash;
    this._cachedUniqueness = this.hash ? this.#getUniqueness() : null;
  }

  get value() {
    return this.obj;
  }

  set value(obj) {
    this.obj = obj;
  }

  #getUniqueness() {
    if (!this.hash) throw new Error("this object is not hashed");
    if (typeof this.obj.getUniqueness === "function") {
      return this.obj.getUniqueness();
    }
    if (typeof this.obj === "object" && this.obj !== null) {
      return Object.entries(this.obj)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([key, val]) => `${key}:${JSON.stringify(val)}`)
        .join("|");
    }
  }

  equals(other) {
    return this._cachedUniqueness === other._cachedUniqueness;
  }
}
