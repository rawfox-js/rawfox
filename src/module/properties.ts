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
 * 链式方法，元素RNode节点类型的基础方法。
 */
export interface Methods<Expand> {
    class: (classNames: string) => FullPropertiesNode<Expand>
    style: (property: string, value: string) => FullPropertiesNode<Expand>
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
export function injectProperties<Expand extends {
    [K: string]: (...args: any[]) => RNode & Methods<Expand>
}>(this: ElementNode, expand: Expand): FullPropertiesNode<Expand> {
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
         * 样式设置，将直接设置到style属性上
         * @param property css属性
         * @param value 属性值
         */
        style(property: string, value: string) {
            this.styleList[property] = value
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