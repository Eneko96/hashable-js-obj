import { TypeCheck } from "./typecheck";

interface IOptions {
  hash: boolean;
  murmur: boolean;
}

const DEFAULT_OPTIONS = {
  hash: true,
  murmur: true,
} as const;

export class HashableObject<T> {
  private obj: T;
  private hash: boolean;
  private murmur: boolean;
  private _cachedUniqueness: string | number | null;

  constructor(obj: T, options: IOptions) {
    if (TypeCheck.isPrimitive(obj)) {
      throw new Error("Cannot be a primitive nor null or undefined");
    }
    const opts = { ...DEFAULT_OPTIONS, ...options };

    this.obj = obj;
    this.hash = opts.hash;
    this.murmur = opts.murmur;
    this._cachedUniqueness = null;
    if (this.hash) {
      this._cachedUniqueness = this.#getUniqueness();
      if (this.murmur) {
        this._cachedUniqueness = this.#getHash();
      }
    }
  }

  get value() {
    return this.obj;
  }

  #getEntries(obj: unknown): string {
    if (TypeCheck.isArray(obj)) {
      const res = [];
      for (const el of obj as Array<unknown>) {
        res.push(this.#getEntries(el));
      }
      return res.join(",");
    }

    if (TypeCheck.isObject(obj)) {
      return Object.entries(obj as Record<string, unknown>)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([key, val]) => `${key}:${this.#getEntries(val)}`)
        .join("|");
    }

    return String(obj);
  }

  #getUniqueness(): string | null {
    if (!this.hash) return null;

    if (TypeCheck.isFunction((this.obj as any).getUniqueness)) {
      return (this.obj as any).getUniqueness();
    }

    if (TypeCheck.isObject(this.obj) || TypeCheck.isArray(this.obj)) {
      return this.#getEntries(this.obj);
    }

    return null;
  }

  #getHash() {
    const base = this._cachedUniqueness as string;
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

  equals(other: unknown) {
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
