import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist' },
  // umd: {
  //   entry: 'src/index', // 默认构建入口文件
  // },
});
