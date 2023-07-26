import { Button } from 'antd';
import { PopoverDialog } from 'oulae_dumi_component_web';
import * as React from 'react';
import styles from './demo1.module.less';
const { useRef } = React;

const HomePage: React.FC = () => {
  const $PopoverDialog = useRef(null);

  const btnCallback = (e) => {
    $PopoverDialog?.current?.show(e.target.getBoundingClientRect());
  };

  return (
    <div>
      <div className={styles.container}>
        <Button
          onClick={btnCallback}
          style={{ position: 'absolute', top: '0', left: '0' }}
        >
          click me!
        </Button>
        <Button
          onClick={btnCallback}
          style={{ position: 'absolute', top: '0', right: '0' }}
        >
          click me!
        </Button>
        <Button
          onClick={btnCallback}
          style={{ position: 'absolute', bottom: '0', left: '0' }}
        >
          click me!
        </Button>
        <Button
          onClick={btnCallback}
          style={{ position: 'absolute', bottom: '0', right: '0' }}
        >
          click me!
        </Button>
      </div>

      <PopoverDialog
        ref={$PopoverDialog}
        mode={'leftRight'}
        containerHeightPx={400}
        containerWidthPx={400}
      >
        <div style={{ width: '400px', height: '400px', background: 'red' }}>
          hello wrold!
        </div>
      </PopoverDialog>
    </div>
  );
};

export default HomePage;
