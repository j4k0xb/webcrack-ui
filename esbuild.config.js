// @ts-check
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import esbuild from 'esbuild';
import { readFile } from 'fs/promises';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const watch = args.length > 0 && /^(?:--watch|-w)$/i.test(args[0]);

/**
 * @type {import('esbuild').Plugin}
 */
const MonacoLoaderPlugin = {
  name: 'monaco-loader',
  setup(build) {
    build.onResolve({ filter: /^monaco-editor$/ }, args => {
      return { path: args.path, namespace: 'monaco-loader' };
    });
    build.onLoad({ filter: /.*/, namespace: 'monaco-loader' }, async args => {
      const version = JSON.parse(
        await readFile('node_modules/monaco-editor/package.json', 'utf8')
      ).version;
      return {
        contents: `
const BASE_URL = 'https://cdn.jsdelivr.net/npm/monaco-editor@${version}/min/vs';

const script = document.createElement('script');
script.src = BASE_URL + '/loader.js';
document.body.appendChild(script);

export default await new Promise((resolve, reject) => {
  script.onload = () => {
    window.require.config({ paths: { vs: BASE_URL } });
    window.require(['vs/editor/editor.main'], resolve, reject);
  };
});
`,
      };
    });
  },
};

/**
 * Needed because NodeModulesPolyfillPlugin doesn't handle posix path
 * @type {import('esbuild').Plugin}
 */
const NodePathPlugin = {
  name: 'node-posix-path',
  setup(build) {
    build.onResolve({ filter: /^(node:)?path\/posix$/ }, args => {
      return { path: 'node:path', namespace: 'node-path' };
    });
    build.onLoad({ filter: /.*/, namespace: 'node-path' }, args => {
      return {
        contents: `module.exports = require('${args.path}');`,
      };
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: [
    'src/index.ts',
    'src/webcrack.worker.ts',
    'src/style.css',
    'src/index.html',
  ],
  outdir: 'dist',

  bundle: true,
  minify: true,
  format: 'esm',
  sourcemap: true,

  plugins: [
    NodePathPlugin,
    NodeGlobalsPolyfillPlugin({ buffer: true }),
    NodeModulesPolyfillPlugin(),
    MonacoLoaderPlugin,
  ],

  loader: {
    '.html': 'copy',
  },

  define: {
    'process.env.NODE_ENV': watch ? '"development"' : '"production"',
  },
  logLevel: 'info',
});

if (watch) {
  await ctx.watch();
  await ctx.serve({ servedir: 'dist' });
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
