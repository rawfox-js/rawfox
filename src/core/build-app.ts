import { render } from './renderer'
import type { RNode } from './rnode'
export interface BuildAppConfig {
    mount: string //绑定的根元素选择器
}

export function BuildApp(config: BuildAppConfig) {
    if (typeof config !== 'object') throw new TypeError("The buildApp function is configured incorrectly.")
    const mountElement = document.querySelector(config.mount)
    if (!mountElement)
        throw new TypeError("Cannot find the element you have mounted.")
    return new App(mountElement)
}


export function mount(mountedElement: Element, rnode: RNode | RNode[]) {
    if (Array.isArray(rnode)) {
        rnode.forEach(rn => {
            mountedElement.append(render(rn))
        })
    } else {
        mountedElement.append(render(rnode))
    }
}

export class App {
    constructor(mountElement: Element) {
        return function (...args: RNode[]) {
            mount(mountElement, args)
        }
    }
}

