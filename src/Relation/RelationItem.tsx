import { Button } from 'antd';
import * as React from 'react';
import { Item } from './RelationTree';

export interface IhandleTermChange {
  (
    data: Item,
    pos: string,
    handleTermChange: (value: Item) => void,
  ): React.ReactNode;
}

interface IRelationItem {
  data: Item;
  pos: string;
  setElementTerm: IhandleTermChange;
  onDeleteTerm: (pos: string, data: Item) => void;
  onTermChange: (pos: string, data: Item) => void;
}

const RelationItem: React.FC<IRelationItem> = ({
  data,
  pos,
  setElementTerm,
  onDeleteTerm,
  onTermChange,
}) => {
  const handleDeleteTermClick = () => {
    if (typeof onDeleteTerm === 'function') {
      onDeleteTerm(pos, data);
    }
  };

  // 此 value 入参必须是 { key: value } 格式的
  const handleTermChange = (value: Item) => {
    if (typeof onTermChange === 'function') {
      onTermChange(pos, { ...data, ...value });
    }
  };

  if (typeof setElementTerm !== 'function') {
    console.error(
      'setElementTerm 属性必须设置，且必须是返回 ReactElement 的Function',
    );
    return null;
  }

  return (
    <div className="vui-relation-item">
      {setElementTerm(data, pos, handleTermChange)}
      <Button
        type="primary"
        danger
        onClick={handleDeleteTermClick}
        className="delete-term"
      >
        删除
      </Button>
    </div>
  );
};

export default RelationItem;
