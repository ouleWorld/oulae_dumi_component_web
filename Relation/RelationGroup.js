function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Button, Select } from 'antd';
import RelationItem from "./RelationItem";
import { EnumLogics } from "./RelationTree";
var Option = Select.Option;
export var posSeparator = '_';

// 条件组逻辑内容
var RELATIONAL = [{
  label: '或',
  value: 'and'
}, {
  label: '且',
  value: 'or'
}];
var RelationGroup = function RelationGroup(_ref) {
  var data = _ref.data,
    pos = _ref.pos,
    setElementTerm = _ref.setElementTerm,
    onAddGroup = _ref.onAddGroup,
    onAddTerm = _ref.onAddTerm,
    onOpsChange = _ref.onOpsChange,
    onDeleteTerm = _ref.onDeleteTerm,
    onTermChange = _ref.onTermChange;
  /**
   * @description: 返回当前操作节点的下标信息
   * @return {*}
   */
  var getLastPos = function getLastPos() {
    var arrPos = getArrPos(pos);
    var children = data.children;
    arrPos.push(String(children.length - 1));
    return arrPos.join(posSeparator);
  };
  /**
   * @description: 最外出逻辑符变更的回调事件
   * @param {*} value 变更之后的逻辑符
   * @return {*}
   */
  var handleOpsChange = function handleOpsChange(value) {
    if (typeof onOpsChange === 'function') {
      onOpsChange(pos, _objectSpread(_objectSpread({}, data), {}, {
        ops: value
      }));
    }
  };
  var handleAddTermClick = function handleAddTermClick() {
    var record = {};
    var pos = getLastPos();
    if (typeof onAddTerm === 'function') {
      onAddTerm(pos, record);
    }
  };
  var handleAddGroupClick = function handleAddGroupClick() {
    var record = {
      ops: EnumLogics.AND,
      children: [{}]
    };
    var pos = getLastPos();
    if (typeof onAddGroup === 'function') {
      onAddGroup(pos, record);
    }
  };
  var children = data.children,
    ops = data.ops;
  var relationValue = ops || EnumLogics.AND;
  console.log('RelationGroup data: ', data);
  return /*#__PURE__*/React.createElement("div", {
    className: "vui-relation-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relational"
  }, /*#__PURE__*/React.createElement(Select, {
    className: "relation-sign",
    value: relationValue,
    onChange: handleOpsChange
  }, RELATIONAL.map(function (ele, index) {
    return /*#__PURE__*/React.createElement(Option, {
      key: index,
      value: ele.value
    }, ele.label);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "conditions"
  }, children.map(function (record, i) {
    var _ref2 = record,
      list = _ref2.children;
    var newPos = getNewPos(pos, i);
    return list && list.length ? /*#__PURE__*/React.createElement(RelationGroup, {
      pos: newPos,
      key: newPos,
      data: record,
      setElementTerm: setElementTerm,
      onAddGroup: onAddGroup,
      onAddTerm: onAddTerm,
      onOpsChange: onOpsChange,
      onDeleteTerm: onDeleteTerm,
      onTermChange: onTermChange
    }) : /*#__PURE__*/React.createElement(RelationItem, {
      pos: newPos,
      key: newPos,
      data: record,
      setElementTerm: setElementTerm,
      onDeleteTerm: onDeleteTerm,
      onTermChange: onTermChange
    });
  }), /*#__PURE__*/React.createElement("div", {
    className: "operators"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    className: "add-term",
    onClick: handleAddTermClick
  }, "\u52A0\u6761\u4EF6"), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    className: "add-group",
    onClick: handleAddGroupClick
  }, "\u52A0\u6761\u4EF6\u7EC4"))));
};
var getNewPos = function getNewPos(pos, i) {
  // 如果当前项是整个 value (即组件的起始项)时，新位置即当前序号
  return pos ? "".concat(pos).concat(posSeparator).concat(i) : String(i);
};
export var getArrPos = function getArrPos(pos) {
  return pos && pos.split(posSeparator) || [];
};
export default RelationGroup;