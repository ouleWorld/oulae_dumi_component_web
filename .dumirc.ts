import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/',
  publicPath: '/',
  themeConfig: {
    name: 'oulae_dumi_component_web',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
