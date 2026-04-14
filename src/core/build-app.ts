import { render } from './renderer'
export interface BuildAppConfig {
    mount: string //绑定的根元素选择器
}


export interface BaseNode<Type extends "text" | "element" | "comment"> {
    type: Type
}
export interface TextNode extends BaseNode<"text"> {
    inner: string
}

export interface ElementNode extends BaseNode<"element"> {
    name: string
    inner: RNode | string
}

export interface CommentNode extends BaseNode<"comment"> {
    inner: string
}

export type RNode = TextNode | ElementNode | CommentNode

export function BuildApp(config: BuildAppConfig) {
    if (typeof config !== 'object') throw new TypeError("The buildApp function is configured incorrectly.")
    const mountElement = document.querySelector(config.mount)
    if (!mountElement)
        throw new TypeError("Cannot find the element you have mounted.")
    return new App(mountElement)
}

export class App {
    constructor(mountElement: Element) {
        return function (...args: RNode[]) {
            args.forEach(node => {
                mountElement.append(render(node))
            })
        }
    }
}

