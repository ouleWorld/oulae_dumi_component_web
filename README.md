# 文档地址

[文档地址](https://ouleworld.github.io/oulae_dumi_component_web)

# Development

```bash
# install dependencies
$ npm install

# start dev server
$ npm start

# build docs
$ npm run build
```

# github page 部署

[dumi - 自动部署](https://d.umijs.org/guide/faq#%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2)
[手把手教你将 dumi 自动部署到 github！- 解决路径问题](https://juejin.cn/post/7103871313492017159)
[github pages 用法详解](https://blog.csdn.net/lancemao/article/details/126497147)
[github action - remote: Permission to git denied to github-actions[bot]](https://github.com/ad-m/github-push-action/issues/96#issuecomment-889984928)

# father 文档

[father 文档](https://github.com/umijs/father/blob/master/docs)

# npm 发布流程

```
# 发布一个 patch 版本
$ npm version patch -m "build: release %s"

# 体检 + build
$ npm run prepublishOnly

# 发布
$ npm run build
```
