# Bundle Unpacking

This feature can unpack [webpack](https://webpack.js.org/) and [browserify](https://browserify.org/) bundles into separate files.

## webpack

- `__webpack_require(id)__` gets rewritten to `require('./relative/path.js')`.

- Modules may get converted to ESM.

::: tip
You can modify the unpacked modules and bundle them again:

```bash
npx webpack-cli ./webcrack-out
```

:::

## browserify

The original file structure is preserved as much as possible.
