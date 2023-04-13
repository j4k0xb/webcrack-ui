// @ts-check
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import esbuild from 'esbuild';

const args = process.argv.slice(2);
const watch = args.length > 0 && /^(?:--watch|-w)$/i.test(args[0]);

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

  plugins: [
    NodeGlobalsPolyfillPlugin({ buffer: true }),
    NodeModulesPolyfillPlugin(),
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
