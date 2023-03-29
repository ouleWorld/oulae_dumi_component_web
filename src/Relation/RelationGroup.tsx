import { Button, Select } from 'antd';
import * as React from 'react';
import RelationItem, { IhandleTermChange } from './RelationItem';
import { EnumLogics, Item, Relation } from './RelationTree';

const { Option } = Select;
export const posSeparator = '_';

const getNewPos = (pos: string, i: number) => {
  // 如果当前项是整个 value (即组件的起始项)时，新位置即当前序号
  return pos ? `${pos}${posSeparator}${i}` : String(i);
};

export const getArrPos = (pos: string) => {
  return (pos && pos.split(posSeparator)) || [];
};

// 条件组逻辑内容
const RELATIONAL = [
  {
    label: '或',
    value: 'and',
  },
  {
    label: '且',
    value: 'or',
  },
];

interface IRelationGroup {
  data: Relation;
  pos: string;
  setElementTerm: IhandleTermChange;
  onAddGroup: (pos: string, record: Item) => void;
  onAddTerm: (pos: string, record: Item) => void;
  onOpsChange: (pos: string, record: Item) => void;
  onDeleteTerm: (pos: string, record: Item) => void;
  onTermChange: (pos: string, record: Item) => void;
}

const RelationGroup: React.FC<IRelationGroup> = ({
  data,
  pos,
  setElementTerm,
  onAddGroup,
  onAddTerm,
  onOpsChange,
  onDeleteTerm,
  onTermChange,
}) => {
  /**
   * @description: 返回当前操作节点的下标信息
   * @return {*}
   */
  const getLastPos = () => {
    const arrPos = getArrPos(pos);
    const { children } = data;
    arrPos.push(String(children.length - 1));
    return arrPos.join(posSeparator);
  };
  /**
   * @description: 最外出逻辑符变更的回调事件
   * @param {*} value 变更之后的逻辑符
   * @return {*}
   */
  const handleOpsChange = (value: string | number | boolean) => {
    if (typeof onOpsChange === 'function') {
      onOpsChange(pos, { ...data, ops: value });
    }
  };
  const handleAddTermClick = () => {
    const record = {};
    const pos = getLastPos();
    if (typeof onAddTerm === 'function') {
      onAddTerm(pos, record);
    }
  };
  const handleAddGroupClick = () => {
    const record = { ops: EnumLogics.AND, children: [{}] };
    const pos = getLastPos();
    if (typeof onAddGroup === 'function') {
      onAddGroup(pos, record);
    }
  };

  const { children, ops } = data;
  const relationValue = ops || EnumLogics.AND;

  console.log('RelationGroup data: ', data);
  return (
    <div className="vui-relation-group">
      <div className="relational">
        <Select
          className="relation-sign"
          value={relationValue}
          onChange={handleOpsChange}
        >
          {RELATIONAL.map((ele, index) => {
            return (
              <Option key={index} value={ele.value}>
                {ele.label}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="conditions">
        {/* 条件部分 */}
        {children.map((record, i) => {
          const { children: list } = record as Item & Relation;
          const newPos = getNewPos(pos, i);

          return list && list.length ? (
            <RelationGroup
              pos={newPos}
              key={newPos}
              data={record as Item & Relation}
              setElementTerm={setElementTerm}
              onAddGroup={onAddGroup}
              onAddTerm={onAddTerm}
              onOpsChange={onOpsChange}
              onDeleteTerm={onDeleteTerm}
              onTermChange={onTermChange}
            />
          ) : (
            <RelationItem
              pos={newPos}
              key={newPos}
              data={record}
              setElementTerm={setElementTerm}
              onDeleteTerm={onDeleteTerm}
              onTermChange={onTermChange}
            />
          );
        })}

        {/* 按钮部分 */}
        {/**
         * Q: 操作-加条件，操作-加条件组 这两个操作有什么区别呢？
         * A:
         * 假设现在有这样一个条件：key1=a
         *
         * 操作-加条件：key1=a && key2=b
         *
         * 操作-加条件组：此时 key2=b 这个是一个条件组，它还能够添加条件
         * key1=a && (key2=b)
         * 它允许被扩展：key1=a && (key2=b || key3=c)
         */}
        <div className="operators">
          <Button
            type="primary"
            className="add-term"
            onClick={handleAddTermClick}
          >
            加条件
          </Button>
          <Button
            type="primary"
            className="add-group"
            onClick={handleAddGroupClick}
          >
            加条件组
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelationGroup;
