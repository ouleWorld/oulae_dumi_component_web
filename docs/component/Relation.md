---
title: Relation
toc: content
order: 1
---

:::warning

1. 组件的基础实现来自于：[手把手教你写一个条件组合组件](https://juejin.cn/post/7005869798483558431)，如果要了解原理建议先阅读这篇文章
2. 该组件依赖于："antd": "^5.3.2"，如果是其他 UI 框架的话，需要自行进行修改
   :::

## Relation

在具体的业务中，我们可能会存在如下的场景：

1. 某些字段需要相关同学去配置条件关系
2. 这些条件关系存在着多层级的组合

而 Relation 组件就是一个解决条件组合的组件

## 基础使用

<code src="./demo/Relation/demo1.tsx"></code>

## 表单校验

:::info
Q: 表单校验为什么需要在 Form 中额外维护一个 relations_validate 对象呢？直接使用 Relation value 值不行吗？

A: 因为 Relation Value 值是一个对象，同时它的层级也是不可控的；这里为了降低复杂度，因此直接重新定义了一个 relations_validate 对象值
同时，组件值的状态同步其实也是组件内部主动调用 onChange 实现的！
:::

<code src="./demo/Relation/demo2.tsx"></code>

**为了做表单校验，我们在 Form 对象中整体维护了一个 relations_validate 对象(在 Form 组件的 onFinish callback 中可以看到)，在表单提交的时候注意过滤一下**

## API

<API id="RelationComponent"></API>

**这一步建议直接看代码中 ts 定义文件**

### IConfig

```
interface IConfigMap {
  label: string;
  value: IValueType;
}
```

### Relation

```
interface Relation {
  ops: EnumLogics;
  children: Array<(Item & Relation) | {}>;
}
```

### Item

```
interface Item {
  key?: any;
  op?: any;
  value?: any;
  [key: string]: any;
}
```

## 参考链接

1， [手把手教你写一个条件组合组件](https://juejin.cn/post/7005869798483558431)
