# Get Started

- To quickly try it in your browser, open the [Playground](https://webcrack.netlify.app/).
- Use the Node.js library or CLI for more advanced usage.

## Installation

:::info Prerequisites
You need to have a compiler toolchain installed for the [isolated-vm](https://github.com/laverdet/isolated-vm#requirements) dependency.

- Windows + OS X: follow the instructions in [node-gyp](https://github.com/nodejs/node-gyp#installation)
- Ubuntu: `sudo apt-get install python g++ build-essential`
- Arch Linux: `sudo pacman -S make gcc python`
  :::

CLI:

```bash
npm install -g webcrack
```

Node.js:

```bash
npm install webcrack
```

## Platforms

| Platform | Deobfuscate | Unminify | Unpack | Configurable |
| -------- | ----------- | -------- | ------ | ------------ |
| node     | ✅          | ✅       | ✅     | ✅           |
| cli      | ✅          | ✅       | ✅     | ❌           |
| web      | ✅          | ✅       | ❌     | ❌           |
