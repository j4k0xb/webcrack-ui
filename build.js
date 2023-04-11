// @ts-check

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import esbuild from 'esbuild';

const args = process.argv.slice(2);

const watch = args.length > 0 && /^(?:--watch|-w)$/i.test(args[0]);

const ctx = await esbuild.context({
  entryPoints: [
    'src/index.ts',
    'src/style.css',
    // join(SRC_PATH, 'deobworker.js'),
  ],
  outdir: 'dist',

  bundle: true,
  minify: true,
  format: 'esm',

  plugins: [
    NodeModulesPolyfillPlugin(),
    NodeGlobalsPolyfillPlugin({ buffer: true }),
  ],

  loader: {
    '.ttf': 'file',
  },

  define: {
    'process.env.NODE_ENV': watch ? '"development"' : '"production"',
  },
  logLevel: 'info',
});

if (watch) {
  await ctx.watch();
  await ctx.serve({ servedir: '.' });
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
