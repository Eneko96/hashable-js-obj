import { HashableObject } from "../src/index.js";

const deep_example = {
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
};

const similar_example = structuredClone(deep_example);
similar_example.user.age = 31; // slight change
console.log(similar_example);

// Create repeated objects
const repeated = Array.from({ length: 100_000 }, () => deep_example);
const unique = Array.from({ length: 100_000 }, (_, i) => ({
  ...deep_example,
  id: i,
}));

// --- Benchmark Helpers ---
function bench(name, fn) {
  console.time(name);
  fn();
  console.timeEnd(name);
}

// --- 1. Creation Benchmarks ---
bench("Create HashableObject - repeated (no hash)", () => {
  repeated.map((item) => new HashableObject(item, false));
});

bench("Create HashableObject - repeated (hash, no murmur)", () => {
  repeated.map((item) => new HashableObject(item, true, false));
});

bench("Create HashableObject - repeated (hash + murmur)", () => {
  repeated.map((item) => new HashableObject(item, true, true));
});

bench("Create HashableObject - unique (hash + murmur)", () => {
  unique.map((item) => new HashableObject(item, true, true));
});

// --- 2. Equality Check Benchmarks ---
const base1 = new HashableObject(deep_example, true, false);
const base2 = new HashableObject(deep_example, true, false);
const slightlyDifferent = new HashableObject(similar_example, true, false);

bench("Compare equality (same obj, no murmur)", () => {
  console.log("Equal?", base1.equals(base2));
});

bench("Compare equality (diff obj, no murmur)", () => {
  console.log("Equal?", base1.equals(slightlyDifferent));
});

const murmur1 = new HashableObject(deep_example, true, true);
const murmur2 = new HashableObject(deep_example, true, true);
const murmurDifferent = new HashableObject(similar_example, true, true);

bench("Compare equality (same obj, murmur)", () => {
  console.log("Equal?", murmur1.equals(murmur2));
});

bench("Compare equality (diff obj, murmur)", () => {
  console.log("Equal?", murmur1.equals(murmurDifferent));
});
console.log("-------------------------");

// --- 4. No hash comparison ---
const raw1 = new HashableObject(deep_example, false);
const raw2 = new HashableObject(deep_example, false);

bench("Compare equality (no hash)", () => {
  console.log("Equal?", raw1.equals(raw2));
});
