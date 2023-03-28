import { defineConfig } from 'dumi';

const repo = 'oulae_dumi_component_web';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'oulae_dumi_component_web',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
