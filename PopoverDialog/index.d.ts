import * as React from 'react';
declare type IMode = 'leftRight' | 'topBottom' | 'auto';
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
declare const _default: React.ForwardRefExoticComponent<Omit<Iprops, "ref"> & React.RefAttributes<unknown>>;
export default _default;
