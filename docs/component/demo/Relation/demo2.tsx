import { Button, Form } from 'antd';
import { RelationComponent } from 'oulae_dumi_component_web';

const KEY_MAP = [
  {
    label: '品牌',
    value: 'brand',
  },
  {
    label: '浏览器',
    value: 'browser',
  },
  {
    label: '操作系统',
    value: 'system',
  },
  {
    label: '软件',
    value: 'software',
  },
];

const VALUE_MAP = {
  brand: [
    {
      label: '阿里',
      value: 'ali',
    },
    {
      label: '百度',
      value: 'baidu',
    },
    {
      label: '腾讯',
      value: 'tecent',
    },
  ],
  browser: [
    {
      label: '谷歌',
      value: 'chrome',
    },
    {
      label: '火狐',
      value: 'firefox',
    },
    {
      label: 'Edge',
      value: 'edge',
    },
  ],
};

const HANDLE_MAP = [
  {
    label: '等于',
    value: '==',
  },
  {
    label: '不等于',
    value: '!=',
  },
  {
    label: '大于',
    value: '>',
  },
  {
    label: '大于等于',
    value: '>=',
  },
  {
    label: '小于',
    value: '<',
  },
  {
    label: '小于等于',
    value: '<=',
  },
];

const obj = {
  ops: 'and',
  children: [
    {
      key: 'brand',
      op: '!=',
      value: 'ali',
    },
    {
      key: 'system',
      op: '==',
      value: '31',
    },
    {
      ops: 'and',
      children: [
        {
          key: 'software',
          op: '!=',
          value: '31',
        },
        {
          key: 'browser',
          op: '<',
          value: 'firefox',
        },
      ],
    },
  ],
};

const Index = () => {
  const onFinish = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        initialValues={
          {
            // relation: obj,
          }
        }
      >
        <Form.Item label="测试数据" name={'relation'}>
          <RelationComponent
            keyMap={KEY_MAP}
            handleMap={HANDLE_MAP}
            valueMap={VALUE_MAP}
          ></RelationComponent>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
