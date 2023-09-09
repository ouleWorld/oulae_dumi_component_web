/// <reference types="react" />
interface IStickyContainerProps {
    height?: number;
    [key: string]: any;
}
/**
 * 获取 cell 的位置信息 (column, row)
 * @param {*} child
 * @returns
 */
export declare function getCellIndicies(child: any): {
    row: any;
    column: any;
};
/**
 * 获取虚拟滚动中渲染 data 中数据的下标
 * @param {*} children
 * @returns
 */
export declare function getShownIndicies(children: any): {
    from: {
        row: number;
        column: number;
    };
    to: {
        row: number;
        column: number;
    };
};
/**
 * fixed container - 左上
 * @param {*} props
 * @returns
 */
export declare function StickyContainerTopLeft(props: IStickyContainerProps): JSX.Element;
/**
 * fixed container - 右上
 * @param {*} props
 * @returns
 */
export declare function StickyContainerTopRight(props: IStickyContainerProps): JSX.Element;
/**
 * fixed container - 上
 * @param {*} props
 * @returns
 */
export declare function StickyContainerTop(props: IStickyContainerProps): JSX.Element;
/**
 *  fixed container - 左
 * @param {*} props
 * @returns
 */
export declare function StickyContainerLeft(props: IStickyContainerProps): JSX.Element;
/**
 *  fixed container - 右
 * @param {*} props
 * @returns
 */
export declare function StickyContainerRight(props: IStickyContainerProps): JSX.Element;
/**
 *  fixed container - 下
 * @param {*} props
 * @returns
 */
export declare function StickyContainerBottom(props: IStickyContainerProps): JSX.Element;
/**
 * fixed container - 左下
 * @param {*} props
 * @returns
 */
export declare function StickyContainerBottomLeft(props: IStickyContainerProps): JSX.Element;
/**
 * fixed container - 右下
 * @param {*} props
 * @returns
 */
export declare function StickyContainerBottomRight(props: IStickyContainerProps): JSX.Element;
export {};
