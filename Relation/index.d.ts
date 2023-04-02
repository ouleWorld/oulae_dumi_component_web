import * as React from 'react';
import { IConfigMap } from './RelationTerm';
import { Item, Relation } from './RelationTree';
/**
 * 组件的前提：在具体的业务中，条件选择器的最外层逻辑要么是 && 要么是 ||，不可能存在既有 || 又有 && 的情况
 *
 * 一般的，我们会有这种逻辑筛选：场景=PC && 容器=浏览器 && 用户=男性
 * 这样的逻辑筛选的是错误的，也是混乱的：场景=PC && 容器=浏览器 || 用户=男性
 */
/**
 * Q: 如何获取 Relation 组件的值呢？
 * A:
 * 有两种方式获取：
 * 1. 通过 onChange 函数获取，每当值变化的时候，组件都会调用一次 onChange
 * 2. 将 Relation 组件在 Form 表单中使用，通过 Form.Item 字段去获取(推荐这种方式)
 *
 * 特别注意点：
 * 最终的表单值里面会存在一个 relations_validate 的字段，开发者不需要关心，这个是 Relation 组件为了做校验而设置的一个值
 */
interface IRelationComponent {
    /**
     * @description 条件组合器的 key 的映射关系值
     */
    keyMap: Array<IConfigMap>;
    /**
     * @description 条件组合器的 op 操作符的映射关系
     */
    handleMap: Array<IConfigMap>;
    /**
     * @description 条件组合器的 key 对应的输入方式的映射关系
     */
    valueMap: {
        [key: string]: Array<IConfigMap>;
    };
    /**
     * @description 组件的初始化值（在表单编辑/查看时使用）
     */
    value?: Relation;
    /**
     * @description 组件值变化的回调函数，我们可以使用这个来获取组件的值(不过更推荐使用 Form 表单的形式获取)
     */
    onValueChange?: (value: Relation, type: string, record: Item) => void;
}
declare const RelationComponent: React.FC<IRelationComponent>;
export default RelationComponent;
