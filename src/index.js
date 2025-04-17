import { Assert } from "./assert.js";

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

  #getEntries(obj) {
    if (Assert.isArray(obj)) {
      const res = [];
      for (const el of obj) {
        res.push(this.#getEntries(el));
      }
      return res.join(",");
    }

    if (Assert.isObject(obj)) {
      return Object.entries(obj)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([key, val]) => `${key}:${this.#getEntries(val)}`)
        .join("|");
    }

    return String(obj);
  }

  #getUniqueness() {
    if (!this.hash) throw new Error("this object is not hashed");

    if (Assert.isFunction(this.obj.getUniqueness)) {
      return this.obj.getUniqueness();
    }

    if (Assert.isObject(this.obj) || Assert.isArray(this.obj)) {
      return this.#getEntries(this.obj);
    }
  }

  equals(other) {
    return this._cachedUniqueness === other._cachedUniqueness;
  }
}
