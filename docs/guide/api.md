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

Save the deobufscated code and the unpacked bundle to the given directory:

```js
import fs from 'fs';
import { webcrack } from 'webcrack';

const code = fs.readFileSync('bundle.js', 'utf8');
const result = await webcrack(code);
await result.save('output-dir');
```

## Get Bundle Info

```js
const { bundle } = await webcrack(code);
bundle.type; // 'webpack' or 'browserify'
bundle.entryId; // 0
bundle.modules; // Map(10) { 0 => Module { id: 0, ... }, 1 => ... }

const entry = bundle.modules.get(bundle.entryId);
entry.id; // 0
entry.path; // './index.js'
entry.code; // 'const a = require("./1.js");'
```

## Customize Paths

If a matching node in the AST of a module is found, it will be renamed to the given path.

- Path starting with `./` are relative to the output directory.
- Otherwise, the path is treated as a node module.

```js
const result = await webcrack(code, {
  mappings: m => ({
    './utils/color.js': m.regExpLiteral('^#([0-9a-f]{3}){1,2}$'),
    'lodash/index.js': m.memberExpression(
      m.identifier('lodash'),
      m.identifier('map')
    ),
  }),
});
await result.save('output-dir');
```

New folder structure:

```txt
├── index.js
├── utils
│   └── color.js
└── node_modules
    └── lodash
        └── index.js
```

See [@codemod/matchers](https://github.com/codemod-js/codemod/tree/main/packages/matchers#readme) for more information about matchers.

## Options

If you know the code, turn off some options to improve the performance.

```js
await webcrack(code, {
  jsx: false, // when the code doesn't use React
  unpack: false, // when the code is not bundled
  deobfuscate: false, // when the code is not obfuscated
});
```
