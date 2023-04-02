import * as React from 'react';
import RelationTerm from "./RelationTerm";
import RelationTree from "./RelationTree";

/**
 * 组件的前提：在具体的业务中，条件选择器的最外层逻辑要么是 && 要么是 ||，不可能存在既有 || 又有 && 的情况
 *
 * 一般的，我们会有这种逻辑筛选：场景=PC && 容器=浏览器 && 用户=男性
 * 这样的逻辑筛选的是错误的，也是混乱的：场景=PC && 容器=浏览器 || 用户=男性
 */

/**
 * Q: 如何获取 Relation 组件的值呢？
 * A:
 * 有两种方式获取：
 * 1. 通过 onChange 函数获取，每当值变化的时候，组件都会调用一次 onChange
 * 2. 将 Relation 组件在 Form 表单中使用，通过 Form.Item 字段去获取(推荐这种方式)
 *
 * 特别注意点：
 * 最终的表单值里面会存在一个 relations_validate 的字段，开发者不需要关心，这个是 Relation 组件为了做校验而设置的一个值
 */

var RelationComponent = function RelationComponent(props) {
  var keyMap = props.keyMap,
    handleMap = props.handleMap,
    value = props.value,
    valueMap = props.valueMap,
    onValueChange = props.onValueChange;

  /**
   * Q: 为什么要将 RelationTerm 的渲染定义在这里呢？
   * A: 为了方便地将 keyMap，handleMap，valueMap 值传递到 RelationTerm 组件
   */
  var setElementTerm = function setElementTerm(record, pos, onChange) {
    return /*#__PURE__*/React.createElement(RelationTerm, {
      keyMap: keyMap,
      handleMap: handleMap,
      valueMap: valueMap,
      pos: pos,
      data: record,
      onChange: onChange
    });
  };
  return /*#__PURE__*/React.createElement(RelationTree, {
    value: value,
    onValueChange: onValueChange
    // 通过 props.onChange 参数，我们可以将组件的值快速更新到 Form 中
    ,
    fromItemOnChange: props.onChange,
    setElementTerm: setElementTerm
  });
};
export default RelationComponent;