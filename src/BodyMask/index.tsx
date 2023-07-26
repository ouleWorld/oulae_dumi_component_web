import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
const { useEffect, useRef } = React;

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

const BodyMask = (props: IBodyMaskProps) => {
  const { visible, children, style = {}, maskBgColor, maskClickFn } = props;
  const $BodyDiv = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild($BodyDiv.current);
  });

  return (
    visible &&
    ReactDOM.createPortal(
      <div className={styles.bodyMastRoot}>
        <div
          className={styles.mask}
          style={{ backgroundColor: maskBgColor, ...style }}
          onClick={() => {
            maskClickFn?.();
            console.log('点击了 mask');
          }}
        ></div>
        {children}
      </div>,
      $BodyDiv.current,
    )
  );
};

BodyMask.defaultProps = {
  style: {},
  maskBgColor: 'rgba(0, 0, 0, 0.45)',
};

export default BodyMask;
