import * as React from 'react';
export interface IBodyMaskProps {
    /** BodyMask 是否可见 */
    visible: boolean;
    /** BodyMask 显示的内容主体 */
    children: any;
    /** BodyMask children div style */
    style?: any;
    /** BodyMask mask color */
    maskBgColor?: string;
    maskClickFn?: () => void;
}
declare const BodyMask: {
    (props: IBodyMaskProps): false | React.ReactPortal;
    defaultProps: {
        style: {};
        maskBgColor: string;
    };
};
export default BodyMask;
