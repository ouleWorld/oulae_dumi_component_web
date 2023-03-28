/// <reference types="react" />
import { Item } from './RelationTree';
declare type IValueType = string | number | boolean;
export interface IConfigMap {
    label: string;
    value: IValueType;
}
interface IRelationTerm {
    data: Item;
    pos: string;
    onChange: (params: Item) => void;
    keyMap: Array<IConfigMap>;
    handleMap: Array<IConfigMap>;
    valueMap: {
        [key: string]: Array<IConfigMap>;
    };
    defaultValueStatus?: boolean;
}
declare const RelationTerm: React.FC<IRelationTerm>;
export default RelationTerm;
