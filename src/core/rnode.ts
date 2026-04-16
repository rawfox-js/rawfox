import { injectProperties, type Eventhandler } from "../module/properties"
/**
 * RNode的基础三种类型
 */
export type RNodeBaseType = "text" | "element" | "comment"
/**
 * 用于泛型的RNode基础三种类型
 */
export type RNodeType<T extends RNodeBaseType> = T
/**
 * 基础节点类型，包含所有节点必备的属性
 */
export interface BaseNode<Type extends RNodeBaseType> {
    [key: string]: any
    type: Type
}
/**
 * 文本节点
 */
export interface TextNode extends BaseNode<"text"> {
    inner: string
}
/**
 * 属性表
 */
export type AttrList = Record<string, any>
/**
 * 样式表
 */
export type StyleList = Record<string, string>
/**
 * 事件表
 */
export type EventList = {
    [x in keyof HTMLElementEventMap]?: Eventhandler
}
/**
 * 元素类型节点，主要特点是可进行节点嵌套以及属性表、样式表、事件的绑定。
 */
export interface ElementNode extends BaseNode<"element"> {
    name: string
    inner?: RNode | RNode[]
    attrList: AttrList
    styleList: StyleList
    eventList: EventList
}
/**
 * 注释节点
 */
export interface CommentNode extends BaseNode<"comment"> {
    inner: string
}

/**
 * 完整的RNode节点
 */
export type RNode = TextNode | ElementNode | CommentNode
/**
 * 创建文本RNode节点
 * @param type 节点类型
 * @param inner 文本
 */
export function BuildRNode(type: RNodeType<"text">, inner: string): TextNode
/**
 * 创建元素RNode节点
 * @param type 节点类型
 * @param inner 嵌套节点/节点组/空
 * @param name 标签名称
 */
export function BuildRNode(type: RNodeType<"element">, inner: RNode | RNode[] | undefined, name: string): ElementNode
/**
 * 创建注释RNode节点
 * @param type 节点类型
 * @param inner 文本
 */
export function BuildRNode(type: RNodeType<"comment">, inner: string): CommentNode
export function BuildRNode(type: RNodeBaseType, inner: string | RNode | RNode[] | undefined, name?: string): RNode {
    switch (type) {
        case "text":
            return {
                type: "text",
                inner: inner as string,
            }
        case "element":
            return {
                type: "element",
                inner: inner as (RNode | RNode[]),
                name: name as string,
                attrList: {},
                styleList: {},
                eventList: {}
            }
        case "comment":
            return {
                type: "comment",
                inner: inner as string,
            }
    }
}
