# Introduction

webcrack is a tool for reverse engineering javascript.
It can deobfuscate [obfuscator.io](https://github.com/javascript-obfuscator/javascript-obfuscator), unminify,
and unpack [webpack](https://webpack.js.org/)/[browserify](https://browserify.org/),
to resemble the original source code as much as possible.

- 🚀 **Performance** - Especially for large files
- 🛡️ **Safety** - Considers variable references and scope
- 🔬 **Auto-detection** - Finds code patterns without needing a config
- ✍🏻 **Readability** - Removes obfuscator/bundler artifacts
- ⌨️ **TypeScript** - All code is written in TypeScript
- 🧪 **Tests** - To make sure nothing breaks

## Platforms

| Platform | Deobfuscate | Unminify | Unpack | Configurable |
| -------- | ----------- | -------- | ------ | ------------ |
| node     | ✅          | ✅       | ✅     | ✅           |
| cli      | ✅          | ✅       | ✅     | ❌           |
| web      | ✅          | ✅       | ❌     | ❌           |

## Planned Features

- rename variables
- support older obfuscator.io versions
- unpack `rollup`, `parcel`, `swc`, etc.
- unpack bundles split into multiple chunks
- multi-file editor and zip downloading for the website
- convert [@babel/preset-env](https://babeljs.io/docs/babel-preset-env) helpers to modern syntax
- decompile typescript enums
- decompile other frontend frameworks: `vue`, `svelte`, etc.
