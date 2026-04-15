import { injectProperties, type Eventhandler } from "../module/properties"

export type RNodeBaseType = "text" | "element" | "comment"

export type RNodeType<T extends RNodeBaseType> = T

export interface BaseNode<Type extends RNodeBaseType> {
    [key: string]: any
    type: Type
}
export interface TextNode extends BaseNode<"text"> {
    inner: string
}

export interface ElementNode extends BaseNode<"element"> {
    name: string
    inner?: RNode | RNode[]
    attrList: Record<string, any>
    styleList: Record<string, string>
    eventList: {
        [x in keyof HTMLElementEventMap]?: Eventhandler
    }
}

export interface CommentNode extends BaseNode<"comment"> {
    inner: string
}


export type RNode = TextNode | ElementNode | CommentNode

export function BuildRNode(type: RNodeType<"text">, inner: string): TextNode
export function BuildRNode(type: RNodeType<"element">, name: string, inner?: RNode | RNode[]): ElementNode
export function BuildRNode(type: RNodeType<"comment">, inner: string): CommentNode
export function BuildRNode(type: RNodeBaseType, name: string, inner?: string | RNode | RNode[]): RNode {

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
                name: name,
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
