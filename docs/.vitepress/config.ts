import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'webcrack',
  description: 'Deobfuscate, unminify and unpack bundled javascript',
  base: '/docs/',
  outDir: '../dist/docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Playground', link: 'https://webcrack.netlify.app' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'CLI', link: '/guide/cli' },
          { text: 'Node.js API', link: '/guide/api' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Deobfuscation', link: '/features/deobfuscation' },
          { text: 'Bundle Unpacking', link: '/features/unpacking' },
          { text: 'Unminifying', link: '/features/unminifying' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/j4k0xb/webcrack' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/j4k0xb/webcrack-ui/edit/master/docs/:path',
    },
  },
});
