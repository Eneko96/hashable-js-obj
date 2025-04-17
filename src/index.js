import { TypeCheck } from "./typecheck.js";

export class HashableObject {
  constructor(obj, hash = true) {
    this.obj = obj;
    this.hash = hash;
    this._cachedUniqueness = this.hash ? this.#getUniqueness() : null;
  }

  get value() {
    return this.obj;
  }

  #getEntries(obj) {
    if (TypeCheck.isArray(obj)) {
      const res = [];
      for (const el of obj) {
        res.push(this.#getEntries(el));
      }
      return res.join(",");
    }

    if (TypeCheck.isObject(obj)) {
      return Object.entries(obj)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([key, val]) => `${key}:${this.#getEntries(val)}`)
        .join("|");
    }

    return String(obj);
  }

  #getUniqueness() {
    if (!this.hash) throw new Error("this object is not hashed");

    if (TypeCheck.isFunction(this.obj.getUniqueness)) {
      return this.obj.getUniqueness();
    }

    if (TypeCheck.isObject(this.obj) || Assert.isArray(this.obj)) {
      return this.#getEntries(this.obj);
    }
  }

  equals(other) {
    if (!(other instanceof HashableObject)) return false;
    return this._cachedUniqueness === other._cachedUniqueness;
  }

  toString() {
    if (this.hash) {
      return `Hashable(${this._cachedUniqueness})`;
    } else {
      try {
        return `Raw(${JSON.stringify(this.obj)})`;
      } catch {
        return `Raw(${String(this.obj)})`;
      }
    }
  }
}
