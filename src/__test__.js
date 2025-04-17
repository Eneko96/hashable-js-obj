import { HashableObject } from "../src/index.js";

const a = new HashableObject({ a: 1, b: 2 });
const b = new HashableObject({ a: 1, b: 3 });
const c = new HashableObject({ a: 1, b: 2 });

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

const override1 = new HashableObject(obj1);
const override2 = new HashableObject(obj2);
const override3 = new HashableObject(obj1);

console.assert(
  !override1.equals(override2),
  "Override 1 and 2 should not be equal",
);
console.assert(override1.equals(override3), "Override 1 and 3 should be equal");

const arrObj = [
  { a: 1, b: 2 },
  { a: 2, b: 3 },
];
const arrObj_2 = [
  { a: 1, b: 2 },
  { a: 2, b: 4 },
];

const arrTest_1 = new HashableObject(arrObj);
const arrTest_2 = new HashableObject(arrObj_2);

console.assert(!arrTest_1.equals(arrTest_2), "Should not be equal");

const nested_1 = new HashableObject({
  user: {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "cycling"],
    address: {
      city: "Wonderland",
      zip: 12345,
      coords: [51.509865, -0.118092],
    },
  },
  active: true,
  scores: [10, 20, { level: "hard", passed: true }],
});

const nested_2 = new HashableObject({
  user: {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "cycling"],
    address: {
      city: "Wonderland",
      zip: 12345,
      coords: [51.509865, -0.118092],
    },
  },
  active: true,
  scores: [10, 20, { level: "hard", passed: true }],
});

console.assert(nested_1.equals(nested_2), "Should be equal");

const nested_3 = new HashableObject({
  user: {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "cycling"],
    address: {
      city: "Wonderland",
      zip: 12344,
      coords: [51.509865, -0.118092],
    },
  },
  active: true,
  scores: [10, 20, { level: "hard", passed: true }],
});

console.assert(!nested_1.equals(nested_3), "Should not be equal");

console.log("✅ All tests passed!");
