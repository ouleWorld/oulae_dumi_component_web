function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import * as React from 'react';
import BodyMask from "../BodyMask";
import styles from "./index.module.less";
var useState = React.useState,
  useEffect = React.useEffect,
  useImperativeHandle = React.useImperativeHandle,
  useRef = React.useRef,
  forwardRef = React.forwardRef;
// 判断 PopoverDialog 是否出现在 window screen 之内
/**
 * 判断 PopverDialog 的位置是否符合规范,符合规范需要满足下面两个要求：
 * 1. PopverDialog 处于 aimDiv 的 direction 方向
 * 2. PopverDialog 出现在当前 window 之内
 * @param left : PopverDialog left 坐标
 * @param top : PopverDialog top 坐标
 * @param direction : 表示当前 PopverDialog 的判断方向
 * @param domClientRectObj: aimDiv DOMRect 对象
 * @param containerWidth : PopverDialog Width
 * @param containerHeight : PopverDialog Height
 * @returns
 */
var judgePositionIsTrue = function judgePositionIsTrue(left, top, direction, containerWidth, containerHeight, domClientRectObj) {
  var x = domClientRectObj.x,
    y = domClientRectObj.y,
    right = domClientRectObj.right,
    bottom = domClientRectObj.bottom;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var judge = undefined;
  if (direction === 'top') {
    // 位置为 top 时: popverDialog bottom line < aimDiv top line
    judge = top + containerHeight < y;
  } else if (direction === 'right') {
    // 位置为 right 时: popverDialog left line > aimDiv right line
    judge = left > right;
  } else if (direction === 'bottom') {
    // 位置为 bottom 时: popverDialog top line > aimDiv bottom line
    judge = top > bottom;
  } else if (direction === 'left') {
    // 位置为 left 时: popverDialog right line < aimDiv left line
    judge = left + containerWidth < x;
  }
  return judge && left > 0 && left + containerWidth < windowWidth && top > 0 && top + containerHeight < windowHeight;
};

/**
 * PopoverDialog 坐标的矫正函数，确保 PopoverDialog 坐标处于视角之内
 * @param l : PopoverDialog 的 left 坐标
 * @param t : PopoverDialog 的 top 坐标
 * @param containerWidth : PopoverDialog 容器宽度
 * @param containerHeight : PopoverDialog 容器高度
 * @param diff : 表示 PopoverDialog 容器和 aimDiv 的安全距离
 * @returns
 */
var formatLeftTop = function formatLeftTop(l, t, containerWidth, containerHeight, diff) {
  var left = l;
  var top = t;
  if (left <= 0) {
    left = diff;
  }
  if (left + containerWidth > window.innerWidth) {
    // left + containerWidth - window.innerWidth: 表示 X 轴超出的距离
    left -= left + containerWidth - window.innerWidth + diff;
  }
  if (top <= 0) {
    top = diff;
  }
  if (top + containerHeight > window.innerHeight) {
    // top + containerHeight - window.innerHeight: 表示 Y 轴超出的距离
    top -= top + containerHeight - window.innerHeight + diff;
  }
  return {
    left: left,
    top: top
  };
};

/**
 * 首先说明两个概念：
 * 非矫正解：不需要矫正 x, y 值就能够使 PopoverDialog 正常显示在页面
 * 矫正解：需要矫正 x, y 值才能够使 PopoverDialog 正常显示在页面
 *
 * 首先页面我们可以分为 4 个象限
 * 4  |  1
 * ————————
 * 3  |  2
 *
 * 在这 4 个象限中，他们分别一定存在矫正解
 * 右下  |  左下
 * ————————————
 * 右上  |  左上
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var PopoverDialog = function PopoverDialog(props, ref) {
  var _props$bodyMaskStyle = props.bodyMaskStyle,
    bodyMaskStyle = _props$bodyMaskStyle === void 0 ? {} : _props$bodyMaskStyle,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? 'leftRight' : _props$mode,
    _props$diff = props.diff,
    diff = _props$diff === void 0 ? 10 : _props$diff,
    _props$containerWidth = props.containerWidthPx,
    containerWidthPx = _props$containerWidth === void 0 ? 0 : _props$containerWidth,
    _props$containerHeigh = props.containerHeightPx,
    containerHeightPx = _props$containerHeigh === void 0 ? 0 : _props$containerHeigh;
  var $PopoverDialogContainer = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var _useState3 = useState(containerWidthPx),
    _useState4 = _slicedToArray(_useState3, 2),
    containerWidth = _useState4[0],
    setContainerWidth = _useState4[1];
  var _useState5 = useState(containerHeightPx),
    _useState6 = _slicedToArray(_useState5, 2),
    containerHeight = _useState6[0],
    setContainerHeight = _useState6[1];
  var _useState7 = useState({
      top: 0,
      left: 0
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    style = _useState8[0],
    setStyle = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    hidden = _useState10[0],
    setHidden = _useState10[1]; // 当 props.children 为自动宽高时，我们需要这个属性来辅助分布渲染(因为我们需要先借助 getBoundingClientRect 来获取元素的宽高)
  var _useState11 = useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    originData = _useState12[0],
    setOriginData = _useState12[1]; // 表示 aimDiv 的 getBoundingClientRect 对象，缓存数据使用

  /**
   * 判断坐标 (left, top) 是否符合位置，如果符合则直接设置属性，返回 true，否则返回 false
   * @param left
   * @param top
   * @param direction
   * @param domClientRectObj
   * @returns
   */
  var judgeAndOperator = function judgeAndOperator(left, top, direction, domClientRectObj) {
    if (judgePositionIsTrue(left, top, direction, containerWidth, containerHeight, domClientRectObj)) {
      setStyle({
        left: left,
        top: top
      });
      setVisible(true);
      return {
        left: left,
        top: top
      };
    }
    return false;
  };

  // 当前 PopoverDialog 坐标的计算方法
  var caculate = function caculate(direction) {
    return function (domClientRectObj) {
      var x = domClientRectObj.x,
        y = domClientRectObj.y,
        width = domClientRectObj.width,
        height = domClientRectObj.height,
        right = domClientRectObj.right,
        bottom = domClientRectObj.bottom;
      var xCenter = x + width / 2;
      var yCenter = y + height / 2;
      var left = -1;
      var top = -1;

      // 计算过程
      if (direction === 'top') {
        // 上位置的计算方法
        left = xCenter - containerWidth / 2;
        top = y - containerHeight - 10;
      } else if (direction === 'right') {
        // 右位置的计算方法
        left = right + 10;
        top = yCenter - containerHeight / 2;
      } else if (direction === 'bottom') {
        // 下位置的计算方法
        left = xCenter - containerWidth / 2;
        top = bottom + 10;
      } else if (direction === 'left') {
        // 左位置的计算方法
        left = x - containerWidth - 10;
        top = yCenter - containerHeight / 2;
      }

      // console.log('after: ', left, top);

      if (judgeAndOperator(left, top, direction, domClientRectObj)) {
        return true;
      }

      // 判断坐标无效之后，还需要经过一次坐标校验，然后再重新计算
      var result = formatLeftTop(left, top, containerWidth, containerHeight, diff);
      left = result.left;
      top = result.top;

      // console.log('2 : ', direction, xCenter);
      // console.log('2 left: ', left);
      // console.log('2 top: ', top);

      if (judgeAndOperator(left, top, direction, domClientRectObj)) {
        return true;
      }
      return false;
    };
  };

  // 根据 DOMRect 对象执行计算函数，使用的地方存在多个，所以这里我们提取成为一个函数
  var showFn = function showFn(domClientRectObj) {
    // 计算坐标的过程
    var fnList = [];
    if (mode === 'leftRight') {
      fnList.push(caculate('right'));
      fnList.push(caculate('left'));
    } else if (mode === 'topBottom') {
      fnList.push(caculate('top'));
      fnList.push(caculate('bottom'));
    } else if (mode === 'auto') {
      fnList.push(caculate('top'));
      fnList.push(caculate('right'));
      fnList.push(caculate('bottom'));
      fnList.push(caculate('left'));
    }
    for (var i = 0, len = fnList.length; i < len; i++) {
      var result = fnList[i](domClientRectObj);
      if (result) {
        break;
      }
    }
    setHidden(false);
    setVisible(true);
  };
  useEffect(function () {
    // 如果父组件没有提供 containerWidth， containerHeight 信息时，我们需要先使用 getBoundingClientRect API 来获取 PopoverDialog 的宽高信息
    // 然后我们在这里出发重新坐标计算(直接调用的话可能会导致不能及时获取 containerWidth， containerHeight，所以这里使用监听器来完成这个功能)
    if (hidden && containerWidth && containerHeight) {
      showFn(originData);
    }
  }, [hidden, containerWidth, containerHeight]);
  useImperativeHandle(ref, function () {
    return {
      show: function show(domClientRectObj) {
        setOriginData(domClientRectObj);
        // 当没有提供 containerWidth, containerHeight 时，我们需要先使用 getBoundingClientRect API 来获取 PopoverDialog 的宽高信息，然后再进行位置的计算
        if (containerWidthPx === 0 && containerHeightPx === 0) {
          setVisible(true);
          setHidden(true);
          /**
           * Q: 为什么这里一定要将 ContainerWidth，ContainerHeight 设置为 0 呢？不设置是否可以
           * A:
           * 如果我们的 popverDialog 是任意宽高的情况下，并且触发了多次打开，未将 ContainerWidth，ContainerHeight 清 0 时， 那么就可能会出现一种情况：
           * 这一次使用的 containerWidth, containerHeight 可能是上一次 popverDialog 的结果，并且我们的 showFn 中将 hidden 变更成为了 false；所以这里就将错就错地渲染了
           * 为了避免这个问题，这里我们将 containerWidth, containerHeight 强制清零
           */
          setContainerWidth(0);
          setContainerHeight(0);
          // 使用 setTimeout 宏任务，确保 getBoundingClientRect 能够获取正确的对象
          setTimeout(function () {
            var _$PopoverDialogContai;
            var rect = $PopoverDialogContainer === null || $PopoverDialogContainer === void 0 ? void 0 : (_$PopoverDialogContai = $PopoverDialogContainer.current) === null || _$PopoverDialogContai === void 0 ? void 0 : _$PopoverDialogContai.getBoundingClientRect();
            var width = rect.width,
              height = rect.height;
            setContainerWidth(width);
            setContainerHeight(height);
          });
          return;
        }
        showFn(domClientRectObj);
      },
      hide: function hide() {
        setVisible(false);
      }
    };
  });
  return /*#__PURE__*/React.createElement(BodyMask, {
    visible: visible,
    style: _objectSpread({}, bodyMaskStyle),
    maskBgColor: 'transform',
    maskClickFn: function maskClickFn() {
      setVisible(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: $PopoverDialogContainer,
    className: styles.container,
    style: _objectSpread({
      // width: `${containerWidth || 'initial'}px`,
      // height: `${containerHeight || 'initial'}px`,
      visibility: hidden ? 'hidden' : 'visible'
    }, style)
  }, props.children));
};
export default forwardRef(PopoverDialog);