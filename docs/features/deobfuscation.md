# Deobfuscation

## javascript-obfuscator

The most popular javascript obfuscator. The source code is available on
[GitHub](https://github.com/javascript-obfuscator/javascript-obfuscator)
and it can be used online at [obfuscator.io](https://obfuscator.io).

webcrack can deobfuscate code obfuscated with the following options:

- String Array
  - Rotate
  - Shuffle
  - Index Shift
  - Calls Transform
  - Variable/Function Wrapper Type
  - None/Base64/RC4 Encoding
  - Split Strings
- Other Transformations
  - Compact
  - Simplify
  - Numbers To Expressions
  - Control Flow Flattening
  - Dead Code Injection
- Disable Console Output
- Self Defending
- Debug Protection
- Domain Lock

## Unminify

Bundlers and obfuscators often minify code to make it smaller and harder to read.

The following patterns are detected and unminified:

```js
console['\x6c\x6f\x67']('\x61'); // console.log('a')
x && y && z(); // if (x && y) z();
x || y || z(); // if (!(x || y)) z();
!0; // true
!1; // false
![]; // false
!![]; // true
return a(), b(), c(); // a(); b(); return c();
if ((a(), b())) c(); // a(); if (b()) c();
void 0; // undefined
'red' === color; // color === 'red'
```

Note that variable and function names are often mangled to be shorter.
This information is lost when minifying, so it's not possible to restore the original names.
