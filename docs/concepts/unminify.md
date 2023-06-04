# Unminify

Bundlers and obfuscators often minify code to reduce the download time (or make it harder to read).

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
