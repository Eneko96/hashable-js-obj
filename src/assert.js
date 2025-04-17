export class Assert {
  constructor() { }

  static isObject(param) {
    return typeof param === "object" && param !== null;
  }

  static isArray(param) {
    return Array.isArray(param);
  }

  static isFunction(param) {
    return typeof param === "function";
  }
}
