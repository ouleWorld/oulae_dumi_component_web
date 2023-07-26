function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from "./index.module.less";
var useEffect = React.useEffect,
  useRef = React.useRef;
var BodyMask = function BodyMask(props) {
  var visible = props.visible,
    children = props.children,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    maskBgColor = props.maskBgColor,
    maskClickFn = props.maskClickFn;
  var $BodyDiv = useRef(document.createElement('div'));
  useEffect(function () {
    document.body.appendChild($BodyDiv.current);
  });
  return visible && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
    className: styles.bodyMastRoot
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.mask,
    style: _objectSpread({
      backgroundColor: maskBgColor
    }, style),
    onClick: function onClick() {
      maskClickFn === null || maskClickFn === void 0 ? void 0 : maskClickFn();
      console.log('点击了 mask');
    }
  }), children), $BodyDiv.current);
};
BodyMask.defaultProps = {
  style: {},
  maskBgColor: 'rgba(0, 0, 0, 0.45)'
};
export default BodyMask;