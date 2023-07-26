import { Button, Radio } from 'antd';
import { PopoverDialog } from 'oulae_dumi_component_web';
import * as React from 'react';
import styles from './demo1.module.less';
const { useState, useRef } = React;

const productRandomNumber = (min, max, n) => {
  return Number((Math.random() * (max - min) + min).toFixed(n));
};

const HomePage: React.FC = () => {
  const $PopoverDialog = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mode, setMode] = useState('leftRight');

  const btnCallback = (e) => {
    setWidth(productRandomNumber(100, 300, 0));
    setHeight(productRandomNumber(100, 500, 0));

    setTimeout(() => {
      $PopoverDialog?.current?.show(e.target.getBoundingClientRect());
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <Radio.Group
          options={[
            { label: 'leftRight', value: 'leftRight' },
            { label: 'topBottom', value: 'topBottom' },
            { label: 'auto', value: 'auto' },
          ]}
          onChange={(e) => {
            setMode(e.target.value);
          }}
          value={mode}
        />

        <Button
          onClick={btnCallback}
          style={{ position: 'absolute', top: '30px', left: '0' }}
        >
          click me!
        </Button>
        <Button
          onClick={btnCallback}
          style={{ position: 'absolute', top: '30px', right: '0' }}
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

      <PopoverDialog ref={$PopoverDialog} mode={mode}>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background: 'red',
          }}
        >
          hello wrold!
        </div>
      </PopoverDialog>
    </div>
  );
};

export default HomePage;
