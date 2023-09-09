var _excluded = ["fixedStyle"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import "./index.less";
import { getShownIndicies, StickyContainerBottom, StickyContainerBottomLeft, StickyContainerBottomRight, StickyContainerLeft, StickyContainerRight, StickyContainerTop, StickyContainerTopLeft, StickyContainerTopRight } from "./utils";

/**
 * 渲染虚拟 DOM 的组件
 * @param {*} Cell
 * @param {*} columnWidth
 * @param {*} rowHeight
 * @param {*} columnCount
 * @param {*} rowCount
 * @param {*} fixedStyle
 * @returns
 */
function useInnerElementType(Cell, columnWidth, rowHeight, columnCount, rowCount, fixedStyle) {
  // 使用 React.useMemo 做缓存优化
  return React.useMemo(function () {
    return /*#__PURE__*/React.forwardRef(function (props, ref) {
      /**
       * 计算 rows 高度的累加和，我们使用这个函数计算第一个 sticky row 的 marginTop
       * @param {*} startIndex 开始的index
       * @param {*} endIndex 结束的index
       * @returns
       */
      function sumRowsHeights(startIndex) {
        var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var index = startIndex;
        var sum = 0;
        while (index > endIndex) {
          sum += rowHeight(index - 1);
          index -= 1;
        }
        return sum;
      }

      /**
       * 计算 columns 宽度的累加和，我们使用这个函数计算第一个 sticky columns 的 marginLeft
       * @param {*} startIndex 开始的index
       * @param {*} endIndex 结束的index
       * @returns
       */
      function sumColumnWidths(startIndex) {
        var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var index = startIndex;
        var sum = 0;
        while (index > endIndex) {
          sum += columnWidth(index - 1);
          index -= 1;
        }
        return sum;
      }

      // 获取虚拟滚动中渲染 data 中数据的下标
      var shownIndecies = getShownIndicies(props.children);
      // console.log('====> shownIndecies: ', shownIndecies);

      /**
       * Q: React.Children 这个 API 的作用是啥？
       * A:
       * 参考链接：https://react.dev/reference/react/Children#children-map
       * 这个 API 可以让我们遍历 props.child 属性
       */
      // 简而言之，这里对 children 的操作其实就是：干掉(0, 0)位置的 Cell, 然后我们新建一个 (0, 0) 位置的 Cell，它具有 sticky 布局的性质
      var children = React.Children.map(props.children, function (child) {
        // TODO: 这里存在一个优化的手段，我们可以将 fixed 的元素全部都过滤掉
        // const { column, row } = getCellIndicies(child);
        // if (row + (fixedStyle?.bottom || 0) >= rowCount) {
        //   return null;
        // }

        return child;
      });

      // column 的展示数量
      var shownColumnsCount = shownIndecies.to.column - shownIndecies.from.column;
      // row 的展示数量
      var shownRowsCount = shownIndecies.to.row - shownIndecies.from.row;

      // 为页面中的各个容器计算出相应的元素

      // 左上角容器逻辑
      var topLeftContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.top && fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.left) {
        // k - 行，i -列
        for (var k = 0; k < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top); k++) {
          topLeftContainer[k] = [];
          for (var i = 0; i < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left); i++) {
            var columnIndex = i;
            var rowIndex = k;
            var width = columnWidth(columnIndex);
            var height = rowHeight(rowIndex);
            topLeftContainer[k].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(rowIndex, ":").concat(columnIndex),
              rowIndex: rowIndex,
              columnIndex: columnIndex,
              style: {
                display: 'inline-flex',
                width: width,
                height: height
              }
            }));
          }
        }
      }

      // 右上角容器逻辑
      var topRightContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.top && fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.right) {
        // k - 行，i -列
        for (var _k = 0; _k < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top); _k++) {
          topRightContainer[_k] = [];
          for (var _i = fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.right; _i > 0; _i--) {
            // 右上角数据的计算方法
            var _columnIndex = columnCount - _i;
            var _rowIndex = _k;
            var _width = columnWidth(_columnIndex);
            var _height = rowHeight(_rowIndex);
            topRightContainer[_k].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex, ":").concat(_columnIndex),
              rowIndex: _rowIndex,
              columnIndex: _columnIndex,
              style: {
                display: 'inline-flex',
                width: _width,
                height: _height
              }
            }));
          }
        }
      }

      // 上容器逻辑
      var topContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.top) {
        for (var _k2 = 0; _k2 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top); _k2++) {
          topContainer[_k2] = [];
          for (var _i2 = (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left) || 0; _i2 <= shownColumnsCount; _i2 += 1) {
            var _columnIndex2 = shownIndecies.from.column + _i2;
            var _rowIndex2 = _k2;
            var _width2 = columnWidth(_columnIndex2);
            var _height2 = rowHeight(_rowIndex2);
            var marginLeft = undefined;
            if (_i2 === ((fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left) || 0)) {
              if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.left) {
                // 存在固定行时，固定列的 marginLeft 方法
                marginLeft = sumColumnWidths(_columnIndex2, fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left);
              } else {
                marginLeft = sumColumnWidths(_columnIndex2);
              }

              // marginLeft = sumColumnWidths(columnIndex);
            }

            topContainer[_k2].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex2, ":").concat(_columnIndex2),
              rowIndex: _rowIndex2,
              columnIndex: _columnIndex2,
              style: {
                marginLeft: marginLeft,
                display: 'inline-flex',
                width: _width2,
                height: _height2,
                zIndex: 3
              }
            }));
          }
        }
      }

      // 做容器逻辑
      var leftContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.left) {
        // k 表示 固定列-left 的序号，方向是从左到右
        for (var _k3 = 0; _k3 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left); _k3++) {
          leftContainer[_k3] = [];
          var temp = shownRowsCount;
          // 如果 bottom 方向存在固定行的话，那么固定的内容则不进行加载了
          if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.bottom) {
            temp -= fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.bottom;
          }
          for (var _i3 = (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top) || 0; _i3 <= temp; _i3 += 1) {
            var _columnIndex3 = _k3;
            var _rowIndex3 = _i3 + shownIndecies.from.row;
            var _width3 = columnWidth(_columnIndex3);
            var _height3 = rowHeight(_rowIndex3);
            var marginTop = undefined;
            if (_i3 === ((fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top) || 0)) {
              if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.top) {
                // 存在固定行时，固定列的 marginTop 方法
                /**
                 * Q: 存在固定行时，为什么固定列的 marginTop 是这样计算呢？
                 * A:
                 * 关于 marginTop 的意义我们可以看下面的注释
                 */
                marginTop = sumRowsHeights(_rowIndex3, fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top);
              } else {
                /**
                 * Q: 不存在固定行时，为什么 marginTop 的计算方法是这样的呢？
                 * A:
                 * 首先说一下 marginTop 的意义：marginTop 表示将 left div 放置在合适的位置，以此来让我们在 y 轴滚动时 left div 显示正确地元素 DOM
                 * 如果在不使用虚拟滚动的情况下，一般的我们会向所有的原始内容渲染在页面上，这样由于滚动的同步我们就能看到相应的内容了
                 * 但是在虚拟滚动的场景中，我们并不会渲染所有的元素，因此我们使用 marginTop 来校验首个元素的位置(后面的元素堆叠排放，这样位置就正确了)
                 * 因此 marginTop 的实际意义是：因此的固定列元素 height 之和
                 * 因此在这个场景下，我们直接使用 sumRowHeights 计算即可
                 */
                marginTop = sumRowsHeights(_rowIndex3);
              }
            }
            leftContainer[_k3].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex3, ":").concat(_columnIndex3),
              rowIndex: _rowIndex3,
              columnIndex: _columnIndex3,
              style: {
                marginTop: marginTop,
                display: 'inline-flex',
                width: _width3,
                height: _height3,
                zIndex: 3
              }
            }));
          }
        }
      }

      // 右容器逻辑
      var rightContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.right) {
        // k 表示 固定列-left 的序号，方向是从左到右
        for (var _k4 = 0; _k4 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.right); _k4++) {
          rightContainer[_k4] = [];
          var _temp = shownRowsCount;
          if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.bottom) {
            _temp -= fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.bottom;
          }
          for (var _i4 = (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top) || 0; _i4 <= _temp; _i4 += 1) {
            var _columnIndex4 = columnCount - _k4 - 1;
            var _rowIndex4 = _i4 + shownIndecies.from.row;
            var _width4 = columnWidth(_columnIndex4);
            var _height4 = rowHeight(_rowIndex4);
            var _marginTop = undefined;
            if (_i4 === ((fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top) || 0)) {
              if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.top) {
                // 存在固定行时，固定列的 marginTop 方法
                /**
                 * Q: 存在固定行时，为什么固定列的 marginTop 是这样计算呢？
                 * A:
                 * 关于 marginTop 的意义我们可以看下面的注释
                 */
                _marginTop = sumRowsHeights(_rowIndex4, fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top);
              } else {
                /**
                 * Q: 不存在固定行时，为什么 marginTop 的计算方法是这样的呢？
                 * A:
                 * 首先说一下 marginTop 的意义：marginTop 表示将 left div 放置在合适的位置，以此来让我们在 y 轴滚动时 left div 显示正确地元素 DOM
                 * 如果在不使用虚拟滚动的情况下，一般的我们会向所有的原始内容渲染在页面上，这样由于滚动的同步我们就能看到相应的内容了
                 * 但是在虚拟滚动的场景中，我们并不会渲染所有的元素，因此我们使用 marginTop 来校验首个元素的位置(后面的元素堆叠排放，这样位置就正确了)
                 * 因此 marginTop 的实际意义是：因此的固定列元素 height 之和
                 * 因此在这个场景下，我们直接使用 sumRowHeights 计算即可
                 */
                _marginTop = sumRowsHeights(_rowIndex4);
              }
            }
            rightContainer[_k4].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex4, ":").concat(_columnIndex4),
              rowIndex: _rowIndex4,
              columnIndex: _columnIndex4,
              style: {
                marginTop: _marginTop,
                display: 'inline-flex',
                width: _width4,
                height: _height4,
                zIndex: 3
              }
            }));
          }
        }
      }

      // 下容器逻辑
      var bottomContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.bottom) {
        for (var _k5 = 0; _k5 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.bottom); _k5++) {
          bottomContainer[_k5] = [];
          for (var _i5 = (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left) || 0; _i5 <= shownColumnsCount; _i5 += 1) {
            var _columnIndex5 = shownIndecies.from.column + _i5;
            var _rowIndex5 = rowCount - _k5 - 1;
            var _width5 = columnWidth(_columnIndex5);
            var _height5 = rowHeight(_rowIndex5);
            var _marginLeft = undefined;
            if (_i5 === ((fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left) || 0)) {
              if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.left) {
                // 存在固定行时，固定列的 marginLeft 方法
                _marginLeft = sumColumnWidths(_columnIndex5, fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left);
              } else {
                _marginLeft = sumColumnWidths(_columnIndex5);
              }
            }
            bottomContainer[_k5].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex5, ":").concat(_columnIndex5),
              rowIndex: _rowIndex5,
              columnIndex: _columnIndex5,
              style: {
                marginLeft: _marginLeft,
                display: 'inline-flex',
                width: _width5,
                height: _height5,
                zIndex: 3
              }
            }));
          }
        }
      }

      // 左下容器逻辑
      var bottomLeftContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.bottom && fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.left) {
        for (var _k6 = 0; _k6 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.bottom); _k6++) {
          bottomLeftContainer[_k6] = [];
          for (var _i6 = 0; _i6 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.left); _i6++) {
            var _columnIndex6 = _i6;
            var _rowIndex6 = rowCount - _k6 - 1;
            var _width6 = columnWidth(_columnIndex6);
            var _height6 = rowHeight(_rowIndex6);
            bottomLeftContainer[_k6].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex6, ":").concat(_columnIndex6),
              rowIndex: _rowIndex6,
              columnIndex: _columnIndex6,
              style: {
                display: 'inline-flex',
                width: _width6,
                height: _height6
              }
            }));
          }
        }
      }

      // 右下容器逻辑
      var bottomRightContainer = [];
      if (fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.bottom && fixedStyle !== null && fixedStyle !== void 0 && fixedStyle.right) {
        for (var _k7 = 0; _k7 < (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.bottom); _k7++) {
          bottomRightContainer[_k7] = [];
          for (var _i7 = fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.right; _i7 > 0; _i7--) {
            var _columnIndex7 = columnCount - _i7;
            var _rowIndex7 = rowCount - _k7 - 1;
            var _width7 = columnWidth(_columnIndex7);
            var _height7 = rowHeight(_rowIndex7);
            bottomRightContainer[_k7].push( /*#__PURE__*/React.createElement(Cell, {
              key: "".concat(_rowIndex7, ":").concat(_columnIndex7),
              rowIndex: _rowIndex7,
              columnIndex: _columnIndex7,
              style: {
                display: 'inline-flex',
                width: _width7,
                height: _height7
              }
            }));
          }
        }
      }

      // 为了组件能够正常的展示，我们的 childrenContainer 需要一个正常的高度
      // childrenContainer 的高度是不需要将 top, bottom 方向上 sticky 元素计算进去的
      var childrenContainerHeight = sumRowsHeights(rowCount - (fixedStyle.bottom || 0), fixedStyle.top || 0);

      /**
       * Q: 为什么 childrenContainer Y 轴需要一个辅助的高度 childrenContainerHeight,而 X 轴不需要呢？
       * A:
       * top, bottom容器是没有脱离文档流的
       * 所以 reactWindowStickyCellsContainer 的容器高度 = childrenContainerHeight + top 容器高度 + bottom 容器高度
       * 如果不对 reactWindowStickyCellsContainer 容器高度做限制的话，我们 bottom sticky 内容是会重复展示的
       * 所以我们需要对 childrenContainer 容器做高度限制，让 reactWindowStickyCellsContainer 容器高度等于所有视角内展示元素高度之和
       *
       * 因为左右容器是脱离文档流的，所以不会出现这个问题，容器的宽度就等于所有视角内展示元素的宽度之和
       */

      return (
        /*#__PURE__*/
        // 注意这里一定要使用 ref 进行绑定， Grid 应该是会默认传入一个 ref 的(scrollToItem API)
        React.createElement("div", _extends({
          ref: ref
        }, props, {
          className: "reactWindowStickyCellsContainer"
        }), topLeftContainer.length ? /*#__PURE__*/React.createElement(StickyContainerTopLeft, null, topLeftContainer.map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            key: key,
            style: {
              width: 'fit-content'
            }
          }, ele);
        })) : null, topRightContainer.length ? /*#__PURE__*/React.createElement(StickyContainerTopRight, null, topRightContainer.map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            key: key,
            style: {
              width: 'fit-content'
            }
          }, ele);
        })) : null, topContainer.length ? /*#__PURE__*/React.createElement(StickyContainerTop, {
          height: sumRowsHeights(fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.top)
        }, topContainer.map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            key: key
          }, ele);
        })) : null, leftContainer.length ? /*#__PURE__*/React.createElement(StickyContainerLeft, null, leftContainer.map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            className: "leftContainer",
            key: key,
            style: {
              width: 'fit-content',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column'
            }
          }, ele);
        })) : null, rightContainer.length ? /*#__PURE__*/React.createElement(StickyContainerRight, null, rightContainer.map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            className: "rightContainer",
            key: key,
            style: {
              width: 'fit-content',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column'
            }
          }, ele);
        })) : null, /*#__PURE__*/React.createElement("div", {
          className: "childrenContainer",
          style: {
            height: "".concat(childrenContainerHeight, "px")
          }
        }, children), bottomLeftContainer.length ? /*#__PURE__*/React.createElement(StickyContainerBottomLeft, null, bottomLeftContainer.reverse().map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            key: key,
            style: {
              width: 'fit-content'
            }
          }, ele);
        })) : null, bottomRightContainer.length ? /*#__PURE__*/React.createElement(StickyContainerBottomRight, null, bottomRightContainer.reverse().map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            key: key,
            style: {
              width: 'fit-content'
            }
          }, ele);
        })) : null, bottomContainer.length ? /*#__PURE__*/React.createElement(StickyContainerBottom, {
          height: sumRowsHeights(rowCount, rowCount - (fixedStyle === null || fixedStyle === void 0 ? void 0 : fixedStyle.bottom))
        }, bottomContainer.reverse().map(function (ele, key) {
          return /*#__PURE__*/React.createElement("div", {
            key: key
          }, ele);
        })) : null)
      );
    });
  }, [Cell, columnWidth, rowHeight, columnCount, rowCount, fixedStyle]);
}

/**
 * 虚拟滚动table - 附带固定行列功能
 * @param {*} props
 * @returns
 */
export default function ReactWindowStickyCells(props) {
  var fixedStyle = props.fixedStyle,
    propsParams = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement(Grid, _extends({}, propsParams, {
    /**
     * Q: innerElementType 属性是什么意思？
     * A:
     * 传递给 document.createElement 的标签名称，用于创建内部容器元素。这是一个高级属性；在大多数情况下，应使用默认值（"div"）。
     * 它表示的是整个虚拟DOM container，该组件只会被渲染一次
     */
    innerElementType: useInnerElementType(propsParams.children, propsParams.columnWidth, propsParams.rowHeight, propsParams.columnCount, propsParams.rowCount, fixedStyle)
  }));
}