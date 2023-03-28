function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import produce from 'immer';
import { useEffect, useState } from 'react';
import RelationGroup, { getArrPos } from "./RelationGroup";
import "./RelationTree.less";

// 逻辑关系的枚举值
export var EnumLogics;
(function (EnumLogics) {
  EnumLogics["AND"] = "and";
  EnumLogics["OR"] = "or";
})(EnumLogics || (EnumLogics = {}));
var EnumRelationOperation; // 修改条件内容
// 为了兼容不同的配置类型类型，这里使用 any 进行定义
(function (EnumRelationOperation) {
  EnumRelationOperation["addGroup"] = "addGroup";
  EnumRelationOperation["addTerm"] = "addTerm";
  EnumRelationOperation["changeOps"] = "changeOps";
  EnumRelationOperation["deleteTerm"] = "deleteTerm";
  EnumRelationOperation["changeTerm"] = "changeTerm";
})(EnumRelationOperation || (EnumRelationOperation = {}));
// 条件组合组件默认数据
var defaultRelation = {
  ops: EnumLogics.AND,
  children: [{}]
};
var RelationTree = function RelationTree(_ref) {
  var value = _ref.value,
    onValueChange = _ref.onValueChange,
    setElementTerm = _ref.setElementTerm,
    fromItemOnChange = _ref.fromItemOnChange;
  var _useState = useState(value || defaultRelation),
    _useState2 = _slicedToArray(_useState, 2),
    relations = _useState2[0],
    setRelations = _useState2[1];
  useEffect(function () {
    fromItemOnChange && fromItemOnChange(relations);
  }, [relations]);

  /**
   * Q: 为什么 pos 是一个这么奇怪的类型呢？
   * A: 感觉是为了减少渲染，因为 pos 不是一个对象而是一个字符串
   */

  /**
   * @description: 表单值变化时，更新 relations 的回调函数
   * @param {string} pos 位置字符串，形如：0_0_1
   * @param {Item} record 变更的单项值
   * @param {string} type 操作类型，如：addTerm, addGroup, changeOps(改变逻辑运算符 &&、||), changeTerm, deleteTerm
   * @return {*}
   */
  var setOnChange = function setOnChange(pos, record, type) {
    var value = getNewValue(relations, pos, type, record);
    if (typeof onValueChange === 'function') {
      onValueChange(value, type, record);
    }
    setRelations(value);
  };
  var handleAddGroup = function handleAddGroup(pos, record) {
    setOnChange(pos, record, EnumRelationOperation.addGroup);
  };
  var handleAddTerm = function handleAddTerm(pos, record) {
    setOnChange(pos, record, EnumRelationOperation.addTerm);
  };
  var handleOpsChange = function handleOpsChange(pos, record) {
    setOnChange(pos, record, EnumRelationOperation.changeOps);
  };
  var handleDeleteTerm = function handleDeleteTerm(pos, record) {
    setOnChange(pos, record, EnumRelationOperation.deleteTerm);
  };
  var handleTermChange = function handleTermChange(pos, record) {
    setOnChange(pos, record, EnumRelationOperation.changeTerm);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "vui-relation-tree"
  }, /*#__PURE__*/React.createElement(RelationGroup
  // 最外层的配置是 ""
  , {
    pos: "",
    data: relations,
    setElementTerm: setElementTerm,
    onAddGroup: handleAddGroup,
    onAddTerm: handleAddTerm,
    onOpsChange: handleOpsChange,
    onDeleteTerm: handleDeleteTerm,
    onTermChange: handleTermChange
  }));
};

/**
 * @param {object} data RelationTree 完整的 value
 * @param {string} pos 位置字符串，形如：0_0_1
 * @param {string} type 操作类型，如：addTerm, addGroup, changeOps(改变逻辑运算符 &&、||), changeTerm, deleteTerm
 * @param {string} record 变更的单项值
 */
var getNewValue = function getNewValue() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = arguments.length > 2 ? arguments[2] : undefined;
  var record = arguments.length > 3 ? arguments[3] : undefined;
  // 当 pos='' 时，就表示我们在
  /**
   * Q: 这个逻辑是什么意思？
   * A:
   * 当 pos='' 时，就表示我们在操作 relations.ops 的值
   * 这种情况， relations.ops 的值在 <RelationGroup> 组件中的 handleOpsChange 回调函数已经改变，即入参的 record, 所以这种情况我们直接返回 record 就可以了
   */
  if (!pos) {
    return record;
  }

  // 将 pos 解析成为数组
  var arrPos = getArrPos(pos);
  // 表示 arrPos 数组的长度，我们使用这个值来判断是否获取到了需要操作的对象
  var last = arrPos.length - 1;

  /**
   * TODO: Q: 为什么这里要使用 immer 处理数据呢？
   */

  // 使用 immer 进行数据处理
  return produce(data, function (draft) {
    var prev = {
      data: draft,
      idx: 0
    };
    // 暂存遍历到的当前条件组的数据
    // @ts-ignore immer 好像是不支持 ts 的，所以这里直接忽略吧
    var current = draft.children || [];
    // 根据 pos 遍历数据，pos 中的每一个数字代表它所在条件组的序号
    arrPos.forEach(function (strIdx, i) {
      // 由于数据格式的原因，这里我们需要强制转换一下类型
      var idx = Number(strIdx);
      if (i === last) {
        // 此时我们找到了操作类型
        switch (type) {
          case 'addTerm':
          case 'addGroup':
            // 加条件或条件组
            current.splice(idx + 1, 0, record);
            break;
          case 'deleteTerm':
            // 删除条件项
            current.splice(idx, 1);
            // 如果删除了组的最后一项，则删除整个组
            if (!current.length) {
              prev.data.splice(prev.idx, 1);
            }
            break;
          default:
            // 变更逻辑连接符或条件项内容
            current[idx] = record;
        }
      } else {
        // 数据缓存
        prev = {
          data: current,
          idx: idx
        };
        // 将下一个条件组的数据复制到 current
        current = current[idx] && current[idx].children || [];
      }
    });
  });
};
export default RelationTree;