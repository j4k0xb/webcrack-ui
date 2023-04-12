// @ts-check
import esbuild from 'esbuild';

const args = process.argv.slice(2);
const watch = args.length > 0 && /^(?:--watch|-w)$/i.test(args[0]);

const ctx = await esbuild.context({
  entryPoints: ['src/index.ts', 'src/style.css'],
  outdir: 'dist',

  bundle: true,
  minify: true,
  format: 'esm',

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
