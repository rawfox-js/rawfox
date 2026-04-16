import type { AttrList, CommentNode, ElementNode, EventList, RNode, StyleList, TextNode } from "./rnode"
/**
 * 文本类型RNode渲染器
 * @param rnode 文本类型RNode节点
 * @returns 节点
 */
export function textRender(rnode: TextNode): Node {
    return document.createTextNode(rnode.inner)
}
/**
 * 为元素插入属性
 * @param ele 元素
 * @param attrList 属性
 */
export function attrListInsert(ele: HTMLElement, attrList: AttrList): void {
    Object.keys(attrList).forEach(attr => {
        ele.setAttribute(attr, attrList[attr])
    })
}
/**
 * 为元素注册事件监听器
 * @param ele 元素
 * @param eventList 事件列表
 */
export function eventListInsert(ele: HTMLElement, eventList: EventList): void {
    Object.keys(eventList).forEach((event) => {
        const handler = eventList[event as keyof HTMLElementEventMap]
        if (handler)
            ele.addEventListener(event, handler)
    })
}
/**
 * 为元素插入样式
 * @param ele 元素
 * @param styleList 样式列表
 */
export function styleListInsert(ele: HTMLElement, styleList: StyleList): void {
    Object.keys(styleList).forEach(property => {
        (ele.style as {
            [k: string]: any
        })[property] = styleList[property]
    })
}

/**
 * 元素类型RNode渲染器
 * @param rnode Element类型RNode节点
 * @returns 节点
 */
export function elementRender(rnode: ElementNode): Node {
    const ele = document.createElement(rnode.name)
    if (rnode.attrList) attrListInsert(ele, rnode.attrList)
    if (rnode.styleList) styleListInsert(ele, rnode.styleList)
    if (rnode.eventList) eventListInsert(ele, rnode.eventList)
    if (!rnode.inner) return ele
    if (Array.isArray(rnode.inner)) {
        rnode.inner.forEach(rn => {
            ele.append(render(rn))
        })
    }
    return ele
}
/**
 * 注释类型RNode渲染器
 * @param rnode Comment类型RNode节点
 * @returns 节点
 */
export function commentRender(rnode: CommentNode): Node {
    return document.createComment(rnode.inner)
}
/**
 * 渲染器
 * @param rnode RNode节点
 * @returns Node节点
 */
export function render(rnode: RNode): Node {
    switch (rnode.type) {
        case "text":
            return textRender(rnode)
        case "element":
            return elementRender(rnode)
        case "comment":
            return commentRender(rnode)
    }
}