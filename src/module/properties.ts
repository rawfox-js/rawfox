import type { ElementNode, RNode } from "../core/rnode";
/**
 * 已完整注入链式调用属性的RNode节点类型，包含基础RNode、链式方法、扩展方法
 */
export type FullPropertiesNode<Expand> = RNode & Methods<Expand> & Expand
/**
 * 基础事件回调函数类型，所有事件都在它基础上扩展
 */
export type Eventhandler = (e: Event) => void
/**
 * 样式表
 */

export type StyleSheet = {
    [x in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[x];
} & {
    [selector: string]: string | number | StyleSheet
};
/**
 * 链式方法，元素RNode节点类型的基础方法。
 */
export interface Methods<Expand> {
    class: (classNames: string) => FullPropertiesNode<Expand>
    setStyle: (property: string, value: string) => FullPropertiesNode<Expand>
    setStyleSheet: (styleSheet: StyleSheet) => FullPropertiesNode<Expand>
    style: (arg1: string | StyleSheet, arg2?: string) => FullPropertiesNode<Expand>
    attr: (name: string, value: any) => FullPropertiesNode<Expand>
    click: (fn: (e: PointerEvent) => void) => FullPropertiesNode<Expand>
    on: (event: keyof HTMLElementEventMap, handler: Eventhandler) => FullPropertiesNode<Expand>
}
/**
 * 链式方法注入器
 * @param this 元素类型RNode节点
 * @param expand 扩展方法，可为元素定制链式调用方法。
 * @returns 已完整注入链式调用属性的RNode节点类型
 */
export function injectProperties<Expand extends Record<string, (...args: any[]) => any>>(this: ElementNode, expand?: Expand): FullPropertiesNode<Expand> & Expand {
    return {
        ...this,
        ...expand,
        /**
         * 元素类名
         * @param classNames 类名组，例："class1 class2"
         */
        class(classNames) {
            this.attrList.class = classNames
            return this
        },
        /**
         * 直接设置样式，一次只能设置一条。（适合少量样式）
         * @param property 样式名称
         * @param value 值
         */
        setStyle(property, value){
            this.styleList[property] = value
            return this
        },
        /**
         * 设置样式表，包含类型提示
         * @param styleSheet 样式表
         */
        setStyleSheet(styleSheet){
            Object.keys(styleSheet).forEach(key => {
                this.styleList[key] = styleSheet[key]
            })
            return this
        },
        /**
         * 样式设置，支持两种写法：键值对写法/对象样式表写法
         * @param arg1 样式或对象样式表
         * @param arg2 样式值
         */
        style(arg1: string | StyleSheet, arg2?: string) {
            if (typeof arg1 === 'string') {
                if(!arg2) throw new TypeError("When using the `style` method, the first parameter is a string, and the second parameter must be present.")
                this.setStyle(arg1, arg2)
                return this
            }
            this.setStyleSheet(arg1)
            return this
        },
        /**
         * 设置attr
         * @param name 名称
         * @param value 值
         */
        attr(name: string, value: any) {
            this.attrList[name] = value
            return this
        },
        /**
         * 监听器
         * @param event 事件
         * @param handler 回调函数
         */
        on(event, handler) {
            this.eventList[event] = handler
            return this
        },
        /**
         * 点击事件
         * @param fn 回调函数
         */
        click(fn) {
            this.on("click", (e) => {
                fn(e as PointerEvent)
            })
            return this
        }
    }
}