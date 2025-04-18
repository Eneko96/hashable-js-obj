import { TypeCheck } from "./typecheck.js";

export class HashableObject {
  constructor(obj, hash = true, murmur = true) {
    if (
      typeof obj === "number" ||
      typeof obj === "string" ||
      obj === null ||
      obj === undefined
    )
      throw new Error("Cannot be a primitive nor null or undefined");
    this.obj = obj;
    this.hash = hash;
    this.murmur = murmur;
    this._cachedUniqueness = null;
    if (this.hash) {
      this._cachedUniqueness = this.#getUniqueness();
      if (this.murmur) {
        this._cachedUniqueness = this.#getHash(this._cachedUniqueness);
      }
    }
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

    if (TypeCheck.isObject(this.obj) || TypeCheck.isArray(this.obj)) {
      return this.#getEntries(this.obj);
    }
  }

  #getHash() {
    const base = this._cachedUniqueness;
    let h1 = 0;

    for (let i = 0; i < base.length; i++) {
      let k1 = base.charCodeAt(i);
      k1 = (k1 & 0xffff) * 0x5bd1e995;
      h1 ^= k1;
      h1 = (h1 << 15) | (h1 >>> 17);
    }

    h1 ^= h1 >>> 16;
    h1 = h1 * 0x85ebca6b;
    h1 ^= h1 >>> 13;
    h1 = h1 * 0xc2b2ae35;
    h1 ^= h1 >>> 16;

    return h1.toString(16);
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
