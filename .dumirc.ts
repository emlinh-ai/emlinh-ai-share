import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  // GitHub Pages base path (chỉ sử dụng khi deploy lên GitHub Pages)
  base: process.env.GITHUB_ACTIONS ? '/emlinh-ai-share/' : '/',
  publicPath: process.env.GITHUB_ACTIONS ? '/emlinh-ai-share/' : '/',
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