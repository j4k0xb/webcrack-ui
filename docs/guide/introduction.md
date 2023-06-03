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

## Query Parameters

Pass either `code` or `url` parameters to load code into the editor.
Keep in mind to encode them (e.g. `encodeURIComponent` in js).

| Parameter | Description                                  |
| --------- | -------------------------------------------- |
| `code`    | Code as a string (max length: ~16,000)       |
| `url`     | URL to fetch code from                       |
| `run`     | Automatically start deobfuscation (optional) |

Examples:

- <https://webcrack.netlify.app/?code=1-1&run>
- <https://webcrack.netlify.app/?url=https%3A%2F%2Fpastebin.com%2Fraw%2Fye3usFvH>

Note: Use this only if you don't mind netlify or corsproxy.io seeing the code/url, otherwise paste it directly into the editor.
