import type { ElementNode, RNode } from "../core/rnode";

export type FullPropertiesNode<Expand> = RNode & Methods<Expand> & Expand
export type Eventhandler = (e: Event) => void
export interface Methods<Expand> {
    class: (classNames: string) => FullPropertiesNode<Expand>
    style: (property: string, value: string) => FullPropertiesNode<Expand>
    attr: (name: string, value: any) => FullPropertiesNode<Expand>
    click: (fn: (e: PointerEvent) => void) => FullPropertiesNode<Expand>
    on: (event: keyof HTMLElementEventMap, handler: Eventhandler) => FullPropertiesNode<Expand>
}

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
        attr(name: string, value: any) {
            this.attrList[name] = value
            return this
        },
        on(event, handler) {
            this.eventList[event] = handler
            return this
        },
        click(fn) {
            this.on("click", (e) => {
                fn(e as PointerEvent)
            })
            return this
        }
    }
}