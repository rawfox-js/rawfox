import { render } from './renderer'
import type { RNode } from './rnode'
/**
 * 基础构建配置
 */
export interface BuildAppConfig {
    mount: string //绑定的根元素选择器
}
/**
 * 构建器
 * @param config 配置选项
 * @returns 根元素
 */
export function BuildApp(config: BuildAppConfig) {
    if (typeof config !== 'object') throw new TypeError("The buildApp function is configured incorrectly.")
    const mountElement = document.querySelector(config.mount)
    if (!mountElement)
        throw new TypeError("Cannot find the element you have mounted.")
    return new App(mountElement).app()
}

/**
 * 将根节点绑定到元素上
 * @param mountedElement 被绑定元素
 * @param rnode RNode节点
 */
export function mount(mountedElement: Element, rnode: RNode | RNode[]) {
    if (Array.isArray(rnode)) {
        rnode.forEach(rn => {
            mountedElement.append(render(rn))
        })
    } else {
        mountedElement.append(render(rnode))
    }
}
/**
 * 根组件
 */
export class App {
    mountElement: Element | null = null
    constructor(mountElement: Element) {
        this.mountElement = mountElement
    }
    app() {
        return  (...args: RNode[]) => {
            mount(this.mountElement as HTMLElement, args)
        }
    }
}
