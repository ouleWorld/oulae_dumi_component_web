import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/oulae_dumi_component_web',
  publicPath: '/oulae_dumi_component_web',
  themeConfig: {
    name: 'oulae_dumi_component_web',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
