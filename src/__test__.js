import { HashableObject } from "../src/index.js";

const a = new HashableObject({ a: 1, b: 2 }, true);
const b = new HashableObject({ a: 1, b: 3 }, true);
const c = new HashableObject({ a: 1, b: 2 }, true);

console.assert(a !== b, "a and b should be different objects");
console.assert(!a.equals(b), "a and b should not be equal");
console.assert(a !== c, "a and c should be different objects");
console.assert(a.equals(c), "a and c should be equal");

const obj1 = {
  name: "John",
  surname: "Doe",
  age: 25,
  getUniqueness() {
    return `${this.name}-${this.surname}-${this.age}`;
  },
};

const obj2 = {
  name: "John",
  surname: "Doe",
  age: 24,
  getUniqueness() {
    return `${this.name}-${this.surname}-${this.age}`;
  },
};

const override1 = new HashableObject(obj1, true);
const override2 = new HashableObject(obj2, true);
const override3 = new HashableObject(obj1, true);

console.assert(
  !override1.equals(override2),
  "Override 1 and 2 should not be equal",
);
console.assert(override1.equals(override3), "Override 1 and 3 should be equal");

console.log("✅ All tests passed!");
