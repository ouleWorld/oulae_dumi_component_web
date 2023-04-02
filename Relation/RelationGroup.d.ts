import * as React from 'react';
import { IhandleTermChange } from './RelationItem';
import { Item, Relation } from './RelationTree';
export declare const posSeparator = "_";
export declare const getArrPos: (pos: string) => string[];
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
declare const RelationGroup: React.FC<IRelationGroup>;
export default RelationGroup;
