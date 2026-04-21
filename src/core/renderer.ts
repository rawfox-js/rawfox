import type { AttrList, CommentNode, ElementNode, EventList, RNode, StyleList, TextNode } from "./rnode"
import { convertCSSPropertyName } from "./tools"
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
export function styleListInsert(rnodeID: string,  styleList: StyleList): void {
    // 寻找是否存在样式表style标签
    const style = document.querySelectorAll("style")
    let insertStyleElement: HTMLStyleElement
    if (style.length) //直接插入到最后一个style标签内
        insertStyleElement = style[style.length - 1] as HTMLStyleElement
    else {
        const newStyleEle = document.createElement("style")
        insertStyleElement = newStyleEle
        document.head.append(newStyleEle)
    }
    insertStyleElement.innerHTML += `[data-rf-${rnodeID}]{` + Object.keys(styleList).map(property => {
        return `${convertCSSPropertyName(property)}: ${styleList[property]};`
    }).join(" ") + "}\n"
}
/**
 * 为元素插入唯一标识符
 * @param ele 元素
 * @param id 唯一ID
 */
export function rnodeIDInsert(ele: HTMLElement, id: string): void {
    ele.setAttribute(`data-rf-${id}`, "")
}
/**
 * 元素类型RNode渲染器
 * @param rnode Element类型RNode节点
 * @returns 节点
 */
export function elementRender(rnode: ElementNode): Node {
    const ele = document.createElement(rnode.name)
    if (rnode.attrList) attrListInsert(ele, rnode.attrList)
    if (Object.keys(rnode.styleList).length) styleListInsert(rnode.id, rnode.styleList)
    if (rnode.eventList) eventListInsert(ele, rnode.eventList)
    rnodeIDInsert(ele, rnode.id)
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