export const TypeCheck = {
  isArray: (val: unknown) => Array.isArray(val),
  isObject: (val: unknown) => typeof val === "object" && val !== null,
  isFunction: (val: unknown) => typeof val === "function",
  isPrimitive: (val: unknown) =>
    typeof val === "number" ||
    typeof val === "string" ||
    typeof val === "boolean" ||
    val === null ||
    val === undefined,
};
