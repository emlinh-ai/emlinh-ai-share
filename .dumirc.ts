import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  // GitHub Pages base path (sử dụng tên repository thực tế)
  base: process.env.NODE_ENV === 'production' ? '/emlinh-ai-share/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/emlinh-ai-share/' : '/',
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