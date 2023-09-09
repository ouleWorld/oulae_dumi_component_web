---
title: ReactWindowStickyCells
toc: content
order: 3
---

## ReactWindowStickyCells

react-window 是一个用于高效呈现大型列表和表格数据的 React 库
但是这个库本身并不直接支持固定表格行列
ReactWindowStickyCells 组件是对 react-window 的一个扩展，使其能够支持通过参数化控制上右下左 4 个方向的 sticky 布局

## 固定 - 上

<code src="./demo/ReactWindowStickyCells/demo1.tsx"></code>

## 固定 - 右

<code src="./demo/ReactWindowStickyCells/demo2.tsx"></code>

## 固定 - 下

<code src="./demo/ReactWindowStickyCells/demo3.tsx"></code>

## 固定 - 左

<code src="./demo/ReactWindowStickyCells/demo4.tsx"></code>

## 固定 - 上左

<code src="./demo/ReactWindowStickyCells/demo5.tsx"></code>

## 固定 - 下右

<code src="./demo/ReactWindowStickyCells/demo6.tsx"></code>

## 固定 - 上下左右

<code src="./demo/ReactWindowStickyCells/demo7.tsx"></code>

## API

由于该组件拓展自 react-window 的 VariableSizeGrid 组件因此支持 react-window VariableSizeGrid 组件的所有参数
[react-window VariableSizeGrid 参数列表](https://react-window.vercel.app/#/api/VariableSizeGrid)

除此之外，在 ReactWindowStickyCells 组件中，我们使用 fixedStyle 参数来控制 sticky 布局
**具体可以参见上述 demo**

```

fixedStyle: {
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
}
```
