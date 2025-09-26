import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  // GitHub Pages base path (thay 'ai-shared' bằng tên repository của bạn)
  base: process.env.NODE_ENV === 'production' ? '/ai-shared/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/ai-shared/' : '/',
  themeConfig: {
    name: '@emlinh/ai-shared',
    nav: [
      { title: 'API Reference', link: '/api' },
      { title: 'Examples', link: '/examples' },
    ],
    footer: 'Made with ❤️ by EmLinh AI Team',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  exportStatic: {},
  hash: true,
  ignoreMomentLocale: true,
});