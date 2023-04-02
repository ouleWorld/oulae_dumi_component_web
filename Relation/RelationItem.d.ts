import * as React from 'react';
import { Item } from './RelationTree';
export interface IhandleTermChange {
    (data: Item, pos: string, handleTermChange: (value: Item) => void): React.ReactNode;
}
interface IRelationItem {
    data: Item;
    pos: string;
    setElementTerm: IhandleTermChange;
    onDeleteTerm: (pos: string, data: Item) => void;
    onTermChange: (pos: string, data: Item) => void;
}
declare const RelationItem: React.FC<IRelationItem>;
export default RelationItem;
