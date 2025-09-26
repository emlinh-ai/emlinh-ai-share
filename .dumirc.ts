import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  // GitHub Pages base path (chỉ sử dụng khi deploy lên GitHub Pages)
  base: process.env.GITHUB_ACTIONS ? '/emlinh-ai-share/' : '/',
  publicPath: process.env.GITHUB_ACTIONS ? '/emlinh-ai-share/' : '/',
  // Cấu hình đa ngôn ngữ
  locales: [
    { id: 'en', name: 'English' , suffix: ''},
    { id: 'vi', name: 'Tiếng Việt' , suffix: '/vi'},
  ],
  themeConfig: {
    name: '@emlinh-ai/types',
    navs: {
      'en' : [
        { title: 'API Reference', link: process.env.GITHUB_ACTIONS ? '/emlinh-ai-share/api' : '/api' },
        { title: 'Examples', link: process.env.GITHUB_ACTION ? '/emlinh-ai-share/examples': '/examples'},
      ],
      'vi' : [
        { title: 'API Reference', link: process.env.GITHUB_ACTIONS ? '/emlinh-ai-share/api/vi' : '/api/vi' },
        { title: 'Examples', link: process.env.GITHUB_ACTION ? '/emlinh-ai-share/examples/vi': '/examples/vi'},
      ],
    },
    footer: 'Made with ❤️ by EmLinh AI Team',
    // Cấu hình social links
    socialLinks: {
      github: 'https://github.com/emlinh-ai/emlinh-ai-share',
    },
    // Cấu hình base path cho navigation
    ...(process.env.GITHUB_ACTIONS && {
      logo: false,
    }),
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  exportStatic: {},
  hash: true,
  ignoreMomentLocale: true,
});