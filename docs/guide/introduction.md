# Introduction

webcrack is a tool for reverse engineering javascript.
It can deobfuscate, unminify, and unpack bundles, to resemble the original source code as much as possible.

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

- support older obfuscator.io versions
- unpack more bundlers: `rollup`, `parcel`, `swc`, etc.
- multi-file editor and zip downloading for the website
- convert [@babel/preset-env](https://babeljs.io/docs/babel-preset-env) helpers to modern syntax
- decompile typescript enums
- decompile other frontend frameworks: `vue`, `svelte`, etc.
