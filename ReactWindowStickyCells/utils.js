import React from 'react';
/**
 * 获取 cell 的位置信息 (column, row)
 * @param {*} child
 * @returns
 */
export function getCellIndicies(child) {
  return {
    row: child.props.rowIndex,
    column: child.props.columnIndex
  };
}

/**
 * 获取虚拟滚动中渲染 data 中数据的下标
 * @param {*} children
 * @returns
 */
export function getShownIndicies(children) {
  var minRow = Infinity;
  var maxRow = -Infinity;
  var minColumn = Infinity;
  var maxColumn = -Infinity;
  React.Children.forEach(children, function (child) {
    var _getCellIndicies = getCellIndicies(child),
      row = _getCellIndicies.row,
      column = _getCellIndicies.column;
    minRow = Math.min(minRow, row);
    maxRow = Math.max(maxRow, row);
    minColumn = Math.min(minColumn, column);
    maxColumn = Math.max(maxColumn, column);
  });
  return {
    from: {
      row: minRow,
      column: minColumn
    },
    to: {
      row: maxRow,
      column: maxColumn
    }
  };
}

/**
 * fixed container - 左上
 * @param {*} props
 * @returns
 */
export function StickyContainerTopLeft(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "containerTopLeft"
  }, props.children);
}

/**
 * fixed container - 右上
 * @param {*} props
 * @returns
 */
export function StickyContainerTopRight(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "containerTopRight"
  }, props.children);
}

/**
 * fixed container - 上
 * @param {*} props
 * @returns
 */
export function StickyContainerTop(props) {
  var height = props.height;
  return /*#__PURE__*/React.createElement("div", {
    className: "containerTop",
    style: {
      height: height
    }
  }, props.children);
}

/**
 *  fixed container - 左
 * @param {*} props
 * @returns
 */
export function StickyContainerLeft(props) {
  var height = props.height;
  return /*#__PURE__*/React.createElement("div", {
    className: "containerLeft",
    style: {
      height: height
    }
  }, props.children);
}

/**
 *  fixed container - 右
 * @param {*} props
 * @returns
 */
export function StickyContainerRight(props) {
  var height = props.height;
  return /*#__PURE__*/React.createElement("div", {
    className: "containerRight",
    style: {
      height: height
    }
  }, props.children);
}

/**
 *  fixed container - 下
 * @param {*} props
 * @returns
 */
export function StickyContainerBottom(props) {
  var height = props.height;
  return /*#__PURE__*/React.createElement("div", {
    className: "containerBottom",
    style: {
      height: height
    }
  }, props.children);
}

/**
 * fixed container - 左下
 * @param {*} props
 * @returns
 */
export function StickyContainerBottomLeft(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "containerBottomLeft"
  }, props.children);
}

/**
 * fixed container - 右下
 * @param {*} props
 * @returns
 */
export function StickyContainerBottomRight(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "containerBottomRight"
  }, props.children);
}