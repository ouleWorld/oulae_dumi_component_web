import { Form, Input, Select } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { Item } from './RelationTree';

const { Option } = Select;

type IValueType = string | number | boolean;

export interface IConfigMap {
  label: string;
  value: IValueType;
}

interface IRelationTerm {
  /* 条件的数据 */
  data: Item;
  /* 表示当前字符对应的 pos 位置 */
  pos: string;
  /* 条件变化之后的回调函数 */
  onChange: (params: Item) => void;
  /* 条件组合器的 key 的映射关系值 */
  keyMap: Array<IConfigMap>;
  /* 条件组合器的 op 操作符的映射关系 */
  handleMap: Array<IConfigMap>;
  /* 条件组合器的 key 对应的输入方式的映射关系 */
  valueMap: { [key: string]: Array<IConfigMap> };
  /* key, op 字段是否使用默认值初始化 */
  defaultValueStatus?: boolean;
}

const RelationTerm: React.FC<IRelationTerm> = ({
  data,
  pos,
  onChange,
  keyMap,
  handleMap,
  valueMap,
  defaultValueStatus,
}) => {
  const { key, op, value } = data;

  const setOnChange = (params: Item) => {
    if (typeof onChange === 'function') {
      // 执行传入的 onChange 回调，入参都是 { key: value } 格式
      onChange(params);
    }
  };

  const handleKeyChange = (val: IValueType) => {
    setOnChange({ key: val });
  };

  const handleOpsChange = (val: IValueType) => {
    setOnChange({ op: val });
  };

  const handleValueChange = (e: any) => {
    setOnChange({ value: e.target.value });
  };

  const handleValueChangeWithValue = (val: IValueType) => {
    setOnChange({ value: val });
  };

  const getValueRender = () => {
    if (!key) {
      return null;
    }

    if (valueMap[key]?.length) {
      return (
        <Form.Item
          name={['relations_validate', pos, 'value_value']}
          initialValue={value}
          rules={[
            {
              required: true,
              message: '请选择操作值',
            },
          ]}
          style={{
            marginRight: '6px',
          }}
        >
          <Select
            placeholder="请选择操作值"
            onChange={handleValueChangeWithValue}
          >
            {valueMap[key].map((item, index) => {
              return (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item
          name={['relations_validate', pos, 'value_value']}
          initialValue={value}
          rules={[
            {
              required: true,
              message: '请输入操作值',
            },
          ]}
          style={{
            marginRight: '6px',
          }}
        >
          <Input
            placeholder="请输入操作值"
            value={value}
            onChange={handleValueChange}
          />
        </Form.Item>
      );
    }
  };

  useEffect(() => {
    // 表单的初始化
    if (defaultValueStatus) {
      setOnChange({
        key: keyMap[0].value,
        op: handleMap[0].value,
      });
    }
  }, []);

  /**
   * Q: Relation 组件配合 Form 组件的原理？
   * A:
   * 主要是关注两个流程：1. 表单值变化时的获取值流程(新建) 2. initialValue 设置值流程(编辑)
   * 表单值变化时的获取值流程(新建)：
   * 虽然我们在组建的内部使用了 Form.Item，但是这里我们并不是将值直接绑定到 Form 对象中，而是在 <RelationTree> 中维护了一个relations值，如果relations 值发生变更，那么我们直接使用 Form.Item.onChange 同步到 Form 对象中
   *
   * initialValue 设置值流程(编辑)
   * 同样的，由于我们最底层的 Form.Item 并没有直接绑定 Form 表单对象，因此我们在 Form 设置 initialValue 时是不会生效的；
   * 所以这里我们使用了 Form.Item 的 initialValue 值来进行设置，因为我们组件的内部是能够拿到具体的值的
   * 注意点：设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准
   *
   *
   * Q: 组件的表单校验的原理是什么？
   * 我们在 Form 对象中额外维护了一个表单值 relations_validate，我们使用这个表单值来维护表单校验的状态
   */
  return (
    <div className="term">
      <span className="element">
        <Form.Item
          name={['relations_validate', pos, 'element_value']}
          initialValue={key}
          rules={[
            {
              required: true,
              message: '请选择条件',
            },
          ]}
          style={{
            marginRight: '6px',
          }}
        >
          <Select
            placeholder="请选择条件项"
            // value={key}
            onChange={handleKeyChange}
          >
            {keyMap.map((item, index) => {
              return (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </span>
      <span className="comparison">
        <Form.Item
          name={['relations_validate', pos, 'comparison_value']}
          initialValue={op}
          rules={[
            {
              required: true,
              message: '请选择关系符',
            },
          ]}
          style={{
            marginRight: '6px',
          }}
        >
          <Select
            placeholder="请选择关系符"
            // value={op}
            onChange={handleOpsChange}
          >
            {handleMap.map((item, index) => {
              return (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </span>
      <span className="value">
        {getValueRender()}
        {/* <Input
          placeholder="请输入条件值"
          value={value}
          onChange={handleValueChange}
        /> */}
      </span>
    </div>
  );
};

RelationTerm.defaultProps = {
  defaultValueStatus: false,
};

export default RelationTerm;
