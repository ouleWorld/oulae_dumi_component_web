import { ReactWindowStickyCells } from 'oulae_dumi_component_web';
import * as React from 'react';

// 表示横轴表头的数据
const columns = (() => {
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push({
      title: `key_${i}`,
      dataIndex: `key_${i}`,
      width: 75 + Math.round(Math.random() * 50),
      render: (text) => {
        return text;
      },
    });
  }

  return result;
})();

// 表示纵轴的数据
const sourceData = (() => {
  const result = [];
  for (let i = 0; i < 40; i++) {
    const obj = {
      height: 25 + Math.round(Math.random() * 50),
    };
    for (let k = 0; k < 20; k++) {
      obj[`key_${k}`] = `${i}_${k}`;
    }
    result.push(obj);
  }

  return result;
})();

const getColumnsWidth = (index) => {
  return columns[index].width;
};

const getRowHeight = (index) => {
  if (index === 0) {
    return 75;
  } else {
    return sourceData[index - 1].height;
  }
};

const Cell = ({ columnIndex, rowIndex, style }) => {
  if (rowIndex === 0) {
    // 表头的渲染
    return (
      <div
        style={{
          ...style,
          background: '#fff',
        }}
      >
        {columns[columnIndex].title}
      </div>
    );
  } else {
    // 表体的渲染
    const curObj = sourceData[rowIndex - 1];
    const dataIndex = columns[columnIndex].dataIndex;
    const text = curObj[dataIndex];
    return (
      <div
        data-column-index={columnIndex}
        data-row-index={rowIndex - 1}
        style={{
          ...style,
          background: '#fff',
        }}
      >
        {columns[columnIndex].render(text, curObj)}
      </div>
    );
  }
};

const HomePage: React.FC = () => {
  return (
    <div>
      <ReactWindowStickyCells
        className="Grid"
        height={600}
        /**
         * Q: 为什么 rowCount 这里需要 +1，而 columnCount 却不需要呢？
         * A:
         * columns 提供的是列head的数据
         * sourceData 提供行的数据
         * 第 1 行需要默认展示 columns，所以这里需要 +1
         */
        // 列
        columnCount={columns.length}
        // 行
        rowCount={sourceData.length + 1}
        columnWidth={getColumnsWidth}
        rowHeight={getRowHeight}
        width={600}
        fixedStyle={{
          left: 2,
        }}
      >
        {Cell}
      </ReactWindowStickyCells>
    </div>
  );
};

export default HomePage;
