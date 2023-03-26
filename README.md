# oulae_dumi_component_web

A static site base on [dumi](https://d.umijs.org).

## Development

```bash
# install dependencies
$ npm install

# start dev server
$ npm start

# build docs
$ npm run build
```

## 部署

[dumi 部署](https://d.umijs.org/guide/faq#%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2)

### 手动部署

借助 [gh-pages](https://github.com/tschaub/gh-pages) 可以轻松帮助我们部署文档到 Github Page

```bash
npm install gh-pages --save-dev
# or
yarn add gh-pages -D
```

`package.json` 中添加

```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

编译生成 `dist` 目录

```bash
# site 模版
npm run build
# react 模版
npm run docs:build
```

一键发布

```bash
npm run deploy
```
