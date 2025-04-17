export const TypeCheck = {
  isArray: (val) => Array.isArray(val),
  isObject: (val) => typeof val === "object" && val !== null,
  isFunction: (val) => typeof val === "function",
};
