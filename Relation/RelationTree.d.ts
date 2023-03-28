/// <reference types="react" />
import { IhandleTermChange } from './RelationItem';
import './RelationTree.less';
export declare enum EnumLogics {
    AND = "and",
    OR = "or"
}
export interface Item {
    key?: any;
    op?: any;
    value?: any;
    [key: string]: any;
}
export interface Relation {
    ops: EnumLogics;
    children: Array<(Item & Relation) | {}>;
}
interface IRelationTree {
    fromItemOnChange?: any;
    setElementTerm: IhandleTermChange;
    value?: Relation;
    onValueChange?: (value: Relation, type: string, record: Item) => void;
}
declare const RelationTree: React.FC<IRelationTree>;
export default RelationTree;
