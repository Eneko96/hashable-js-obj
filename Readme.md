# 🧩 HashableObject

A small JavaScript utility built **just for fun and curiosity**, inspired by Java-style object hashing and equality checking.

`HashableObject` lets you wrap any object or array and generate a consistent, order-independent "hash" (actually a string representation) for deep comparison. It's not meant to be a cryptographic hash or production-grade tool—just a little experiment to explore object uniqueness, equality, and caching techniques.

## 🚀 Why?

This was a personal side project—born from a moment of curiosity:  
**“How would Java-style object hashing look like in JavaScript?”**

I wanted to see if I could:

- Generate consistent string representations of objects regardless of key order
- Compare deeply nested structures easily
- Play around with caching, stringifying, and custom equality logic

## ✨ Features

- 🔍 Deep uniqueness string generation
- 💾 Cached uniqueness value on creation
- 📦 Supports objects, arrays, and nested combinations
- 🎭 Equality comparison via `.equals()`
- 🧵 `toString()` output for better debugging

## 📦 Example

```js
import { HashableObject } from "./HashableObject.js";

const a = new HashableObject({ b: 2, a: 1 });
const b = new HashableObject({ a: 1, b: 2 });

console.log(a.equals(b)); // true
console.log(String(a)); // Hashable(a:1|b:2)
```

## ⚠️ Not for Production™

This isn’t optimized for performance, and it doesn't use true hashing algorithms. Think of it more as a toy, a thought experiment, or something you might use in small personal tools.

But works well for:

- Object comparisons

- Simple memoization

- Debugging or testing utilities
