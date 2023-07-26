import * as React from 'react';
import BodyMask from '../BodyMask';
import styles from './index.module.less';
const { useState, useEffect, useImperativeHandle, useRef, forwardRef } = React;

type IDirection = 'top' | 'right' | 'bottom' | 'left';
type IMode = 'leftRight' | 'topBottom' | 'auto';

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
const judgePositionIsTrue = (
  left: number,
  top: number,
  direction: IDirection,
  containerWidth: number,
  containerHeight: number,
  domClientRectObj: DOMRect,
) => {
  const { x, y, right, bottom } = domClientRectObj;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let judge = undefined;
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

  return (
    judge &&
    left > 0 &&
    left + containerWidth < windowWidth &&
    top > 0 &&
    top + containerHeight < windowHeight
  );
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
const formatLeftTop = (
  l: number,
  t: number,
  containerWidth: number,
  containerHeight: number,
  diff: number,
) => {
  let left = l;
  let top = t;

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

  return { left, top };
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

interface Iprops {
  /**
   * @description bodyMask 组件的 style 对象
   * @default {}
   */
  bodyMaskStyle: any;
  /**
   * @description 表示 PopverDialog 的模式，即 PopverDialog 判断出现位置的顺序
   * @default leftRight
   */
  mode: IMode;
  /**
   * @description 表示 PopverDialog 和目标元素之间的 diff 举例
   * @default 10
   */
  diff: number;
  /**
   * @description PopverDialog 容器的宽度
   * @default 0
   */
  containerWidthPx: number;
  /**
   * @description PopverDialog 容器的高度
   * @default 0
   */
  containerHeightPx: number;
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PopoverDialog: React.FC<Iprops> = (props: Iprops, ref) => {
  const {
    bodyMaskStyle = {},
    mode = 'leftRight',
    diff = 10,
    containerWidthPx = 0,
    containerHeightPx = 0,
  } = props;
  const $PopoverDialogContainer = useRef(null);

  const [visible, setVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(containerWidthPx);
  const [containerHeight, setContainerHeight] = useState(containerHeightPx);
  const [style, setStyle] = useState({
    top: 0,
    left: 0,
  });
  const [hidden, setHidden] = useState(false); // 当 props.children 为自动宽高时，我们需要这个属性来辅助分布渲染(因为我们需要先借助 getBoundingClientRect 来获取元素的宽高)
  const [originData, setOriginData] = useState({}); // 表示 aimDiv 的 getBoundingClientRect 对象，缓存数据使用

  /**
   * 判断坐标 (left, top) 是否符合位置，如果符合则直接设置属性，返回 true，否则返回 false
   * @param left
   * @param top
   * @param direction
   * @param domClientRectObj
   * @returns
   */
  const judgeAndOperator = (
    left: number,
    top: number,
    direction: IDirection,
    domClientRectObj: DOMRect,
  ) => {
    if (
      judgePositionIsTrue(
        left,
        top,
        direction,
        containerWidth,
        containerHeight,
        domClientRectObj,
      )
    ) {
      setStyle({
        left,
        top,
      });
      setVisible(true);
      return { left, top };
    }
    return false;
  };

  // 当前 PopoverDialog 坐标的计算方法
  const caculate = (direction: IDirection) => {
    return (domClientRectObj: DOMRect) => {
      const { x, y, width, height, right, bottom } = domClientRectObj;
      const xCenter = x + width / 2;
      const yCenter = y + height / 2;

      let left = -1;
      let top = -1;

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
      const result = formatLeftTop(
        left,
        top,
        containerWidth,
        containerHeight,
        diff,
      );
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
  const showFn = (domClientRectObj: DOMRect) => {
    // 计算坐标的过程
    const fnList = [];
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

    for (let i = 0, len = fnList.length; i < len; i++) {
      const result = fnList[i](domClientRectObj);
      if (result) {
        break;
      }
    }
    setHidden(false);
    setVisible(true);
  };

  useEffect(() => {
    // 如果父组件没有提供 containerWidth， containerHeight 信息时，我们需要先使用 getBoundingClientRect API 来获取 PopoverDialog 的宽高信息
    // 然后我们在这里出发重新坐标计算(直接调用的话可能会导致不能及时获取 containerWidth， containerHeight，所以这里使用监听器来完成这个功能)
    if (hidden && containerWidth && containerHeight) {
      showFn(originData as DOMRect);
    }
  }, [hidden, containerWidth, containerHeight]);

  useImperativeHandle(ref, () => {
    return {
      show: (domClientRectObj: DOMRect) => {
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
          setTimeout(() => {
            const rect =
              $PopoverDialogContainer?.current?.getBoundingClientRect();
            const { width, height } = rect;
            setContainerWidth(width);
            setContainerHeight(height);
          });
          return;
        }

        showFn(domClientRectObj);
      },
      hide: () => {
        setVisible(false);
      },
    };
  });

  return (
    <BodyMask
      visible={visible}
      style={{
        ...bodyMaskStyle,
      }}
      maskBgColor={'transform'}
      maskClickFn={() => {
        setVisible(false);
      }}
    >
      <div
        ref={$PopoverDialogContainer}
        className={styles.container}
        style={{
          // width: `${containerWidth || 'initial'}px`,
          // height: `${containerHeight || 'initial'}px`,
          visibility: hidden ? 'hidden' : 'visible',
          ...style,
        }}
      >
        {props.children}
      </div>
    </BodyMask>
  );
};

export default forwardRef(PopoverDialog);
