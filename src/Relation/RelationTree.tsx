import produce from 'immer';
import * as React from 'react';
import { useEffect, useState } from 'react';
import RelationGroup, { getArrPos } from './RelationGroup';
import { IhandleTermChange } from './RelationItem';
import './RelationTree.less';

/**
 * @param {object} data RelationTree 完整的 value
 * @param {string} pos 位置字符串，形如：0_0_1
 * @param {string} type 操作类型，如：addTerm, addGroup, changeOps(改变逻辑运算符 &&、||), changeTerm, deleteTerm
 * @param {string} record 变更的单项值
 */
const getNewValue = (data = {}, pos = '', type: string, record: Item) => {
  // 当 pos='' 时，就表示我们在
  /**
   * Q: 这个逻辑是什么意思？
   * A:
   * 当 pos='' 时，就表示我们在操作 relations.ops 的值
   * 这种情况， relations.ops 的值在 <RelationGroup> 组件中的 handleOpsChange 回调函数已经改变，即入参的 record, 所以这种情况我们直接返回 record 就可以了
   */
  if (!pos) {
    return record;
  }

  // 将 pos 解析成为数组
  const arrPos = getArrPos(pos);
  // 表示 arrPos 数组的长度，我们使用这个值来判断是否获取到了需要操作的对象
  const last = arrPos.length - 1;

  /**
   * TODO: Q: 为什么这里要使用 immer 处理数据呢？
   */

  // 使用 immer 进行数据处理
  return produce(data, (draft) => {
    let prev = { data: draft, idx: 0 };
    // 暂存遍历到的当前条件组的数据
    // @ts-ignore immer 好像是不支持 ts 的，所以这里直接忽略吧
    let current = draft.children || [];
    // 根据 pos 遍历数据，pos 中的每一个数字代表它所在条件组的序号
    arrPos.forEach((strIdx, i) => {
      // 由于数据格式的原因，这里我们需要强制转换一下类型
      const idx = Number(strIdx);
      if (i === last) {
        // 此时我们找到了操作类型
        switch (type) {
          case 'addTerm':
          case 'addGroup': // 加条件或条件组
            current.splice(idx + 1, 0, record);
            break;
          case 'deleteTerm': // 删除条件项
            current.splice(idx, 1);
            // 如果删除了组的最后一项，则删除整个组
            if (!current.length) {
              (prev.data as Array<any>).splice(prev.idx, 1);
            }
            break;
          default: // 变更逻辑连接符或条件项内容
            current[idx] = record;
        }
      } else {
        // 数据缓存
        prev = { data: current, idx };
        // 将下一个条件组的数据复制到 current
        current = (current[idx] && current[idx].children) || [];
      }
    });
  });
};

// 逻辑关系的枚举值
export enum EnumLogics {
  AND = 'and',
  OR = 'or',
}

enum EnumRelationOperation {
  addGroup = 'addGroup', // 添加条件组
  addTerm = 'addTerm', // 添加条件
  changeOps = 'changeOps', // 修改条件逻辑符
  deleteTerm = 'deleteTerm', // 删除条件
  changeTerm = 'changeTerm', // 修改条件内容
}

// 为了兼容不同的配置类型类型，这里使用 any 进行定义
export interface Item {
  key?: any;
  op?: any;
  value?: any;
  [key: string]: any;
}

// 条件组合组件数据定义模型
export interface Relation {
  ops: EnumLogics;
  children: Array<(Item & Relation) | { [key: string]: any }>;
}

interface IRelationTree {
  fromItemOnChange?: (relations: Relation) => void;
  setElementTerm: IhandleTermChange;
  value?: Relation;
  onValueChange?: (value: Relation, type: string, record: Item) => void;
}

// 条件组合组件默认数据
const defaultRelation = {
  ops: EnumLogics.AND,
  children: [{}],
};

const RelationTree: React.FC<IRelationTree> = ({
  value,
  onValueChange,
  setElementTerm,
  fromItemOnChange,
}) => {
  const [relations, setRelations] = useState<Relation>(
    value || defaultRelation,
  );

  useEffect(() => {
    if (fromItemOnChange) {
      fromItemOnChange(relations);
    }
  }, [relations]);

  /**
   * Q: 为什么 pos 是一个这么奇怪的类型呢？
   * A: 感觉是为了减少渲染，因为 pos 不是一个对象而是一个字符串
   */

  /**
   * @description: 表单值变化时，更新 relations 的回调函数
   * @param {string} pos 位置字符串，形如：0_0_1
   * @param {Item} record 变更的单项值
   * @param {string} type 操作类型，如：addTerm, addGroup, changeOps(改变逻辑运算符 &&、||), changeTerm, deleteTerm
   * @return {*}
   */
  const setOnChange = (
    pos: string,
    record: Item,
    type: EnumRelationOperation,
  ) => {
    const value = getNewValue(relations, pos, type, record) as Relation;
    if (typeof onValueChange === 'function') {
      onValueChange(value, type, record);
    }
    setRelations(value);
  };

  const handleAddGroup = (pos: string, record: Item) => {
    setOnChange(pos, record, EnumRelationOperation.addGroup);
  };
  const handleAddTerm = (pos: string, record: Item) => {
    setOnChange(pos, record, EnumRelationOperation.addTerm);
  };
  const handleOpsChange = (pos: string, record: Item) => {
    setOnChange(pos, record, EnumRelationOperation.changeOps);
  };
  const handleDeleteTerm = (pos: string, record: Item) => {
    setOnChange(pos, record, EnumRelationOperation.deleteTerm);
  };
  const handleTermChange = (pos: string, record: Item) => {
    setOnChange(pos, record, EnumRelationOperation.changeTerm);
  };

  return (
    <div className="vui-relation-tree">
      <RelationGroup
        // 最外层的配置是 ""
        pos=""
        data={relations}
        setElementTerm={setElementTerm}
        onAddGroup={handleAddGroup}
        onAddTerm={handleAddTerm}
        onOpsChange={handleOpsChange}
        onDeleteTerm={handleDeleteTerm}
        onTermChange={handleTermChange}
      />
    </div>
  );
};

export default RelationTree;
