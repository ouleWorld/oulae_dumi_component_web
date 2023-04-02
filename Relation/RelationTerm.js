import { Form, Input, Select } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
var Option = Select.Option;
var RelationTerm = function RelationTerm(_ref) {
  var data = _ref.data,
    pos = _ref.pos,
    onChange = _ref.onChange,
    keyMap = _ref.keyMap,
    handleMap = _ref.handleMap,
    valueMap = _ref.valueMap,
    defaultValueStatus = _ref.defaultValueStatus;
  var key = data.key,
    op = data.op,
    value = data.value;
  var setOnChange = function setOnChange(params) {
    if (typeof onChange === 'function') {
      // 执行传入的 onChange 回调，入参都是 { key: value } 格式
      onChange(params);
    }
  };
  var handleKeyChange = function handleKeyChange(val) {
    setOnChange({
      key: val
    });
  };
  var handleOpsChange = function handleOpsChange(val) {
    setOnChange({
      op: val
    });
  };
  var handleValueChange = function handleValueChange(e) {
    setOnChange({
      value: e.target.value
    });
  };
  var handleValueChangeWithValue = function handleValueChangeWithValue(val) {
    setOnChange({
      value: val
    });
  };
  var getValueRender = function getValueRender() {
    var _valueMap$key;
    if (!key) {
      return null;
    }
    if ((_valueMap$key = valueMap[key]) !== null && _valueMap$key !== void 0 && _valueMap$key.length) {
      return /*#__PURE__*/React.createElement(Form.Item, {
        name: ['relations_validate', pos, 'value_value'],
        initialValue: value,
        rules: [{
          required: true,
          message: '请选择操作值'
        }],
        style: {
          marginRight: '6px'
        }
      }, /*#__PURE__*/React.createElement(Select, {
        placeholder: "\u8BF7\u9009\u62E9\u64CD\u4F5C\u503C",
        onChange: handleValueChangeWithValue
      }, valueMap[key].map(function (item, index) {
        return /*#__PURE__*/React.createElement(Option, {
          key: index,
          value: item.value
        }, item.label);
      })));
    } else {
      return /*#__PURE__*/React.createElement(Form.Item, {
        name: ['relations_validate', pos, 'value_value'],
        initialValue: value,
        rules: [{
          required: true,
          message: '请输入操作值'
        }],
        style: {
          marginRight: '6px'
        }
      }, /*#__PURE__*/React.createElement(Input, {
        placeholder: "\u8BF7\u8F93\u5165\u64CD\u4F5C\u503C",
        value: value,
        onChange: handleValueChange
      }));
    }
  };
  useEffect(function () {
    // 表单的初始化
    if (defaultValueStatus) {
      setOnChange({
        key: keyMap[0].value,
        op: handleMap[0].value
      });
    }
  }, []);

  /**
   * Q: Relation 组件配合 Form 组件的原理？
   * A:
   * 主要是关注两个流程：1. 表单值变化时的获取值流程(新建) 2. initialValue 设置值流程(编辑)
   * 表单值变化时的获取值流程(新建)：
   * 虽然我们在组建的内部使用了 Form.Item，但是这里我们并不是将值直接绑定到 Form 对象中，而是在 <RelationTree> 中维护了一个relations值，如果relations 值发生变更，那么我们直接使用 Form.Item.onChange 同步到 Form 对象中
   *
   * initialValue 设置值流程(编辑)
   * 同样的，由于我们最底层的 Form.Item 并没有直接绑定 Form 表单对象，因此我们在 Form 设置 initialValue 时是不会生效的；
   * 所以这里我们使用了 Form.Item 的 initialValue 值来进行设置，因为我们组件的内部是能够拿到具体的值的
   * 注意点：设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准
   *
   *
   * Q: 组件的表单校验的原理是什么？
   * 我们在 Form 对象中额外维护了一个表单值 relations_validate，我们使用这个表单值来维护表单校验的状态
   */
  return /*#__PURE__*/React.createElement("div", {
    className: "term"
  }, /*#__PURE__*/React.createElement("span", {
    className: "element"
  }, /*#__PURE__*/React.createElement(Form.Item, {
    name: ['relations_validate', pos, 'element_value'],
    initialValue: key,
    rules: [{
      required: true,
      message: '请选择条件'
    }],
    style: {
      marginRight: '6px'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "\u8BF7\u9009\u62E9\u6761\u4EF6\u9879"
    // value={key}
    ,
    onChange: handleKeyChange
  }, keyMap.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Option, {
      key: index,
      value: item.value
    }, item.label);
  })))), /*#__PURE__*/React.createElement("span", {
    className: "comparison"
  }, /*#__PURE__*/React.createElement(Form.Item, {
    name: ['relations_validate', pos, 'comparison_value'],
    initialValue: op,
    rules: [{
      required: true,
      message: '请选择关系符'
    }],
    style: {
      marginRight: '6px'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "\u8BF7\u9009\u62E9\u5173\u7CFB\u7B26"
    // value={op}
    ,
    onChange: handleOpsChange
  }, handleMap.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Option, {
      key: index,
      value: item.value
    }, item.label);
  })))), /*#__PURE__*/React.createElement("span", {
    className: "value"
  }, getValueRender()));
};
RelationTerm.defaultProps = {
  defaultValueStatus: false
};
export default RelationTerm;