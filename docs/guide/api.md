# API Examples

:::warning
This is a pure ESM package, so you need to use `import` instead of `require`.
For more info, check out [this gist](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
:::

## Basic Usage

```js
import { webcrack } from 'webcrack';

const result = await webcrack('const a = 1+1;');
console.log(result.code); // 'const a = 2;'
```

## Save Files To Disk

Save the deobufscated code and the extracted bundle to the given directory.

This creates `deobfuscated.js`, `bundle.json` and all the module files.

```js
const result = await webcrack(code);
await result.save('output-directory');
```

## Get Bundle Info

```js
const file = fs.readFileSync('bundle.js', 'utf8');

const { bundle } = await webcrack(file);
bundle.type; // 'webpack' or 'browserify'
bundle.entryId; // 0
bundle.modules; // Map(10) { 0 => Module { id: 0, ... }, 1 => ... }

const entry = bundle.modules.get(bundle.entryId);
entry.id; // 0
entry.path; // './index.js'
entry.code; // 'const a = require("./1.js");'
```

## Options

If you know the code, turn off some options to improve the performance.

```js
await webcrack(code, {
  jsx: false, // when the code doesn't use React
  unpack: false, // when the code is not bundled
  deobfuscate: false, // when the code is not obfuscated
});
```
