# Command Line Interface

```text
Usage: webcrack [options] <file>

Deobfuscate, unminify and unpack bundled javascript

Arguments:
  file                           input file

Options:
  -V, --version                  output the version number
  -o, --output <path>            output directory (default: "webcrack-out")
  -f, --force                    overwrite output directory
  -h, --help                     display help for command
```

The output directory will always contain a file named `deobfuscated.js` which contains the deobfuscated/unminified code.

If a bundle is unpacked, the output directory will additionally contain the following files:

- `bundle.json` - contains information about the bundle
- `index.js` - the entry point
- all remaining modules

## Examples

```bash
webcrack input.js
```

```bash
webcrack input.js -o output
```
