import { render } from './renderer'
import type { RNode } from './rnode'
import { convertCSSPropertyName } from './tools'

export type GlobalStyleSheet = {
    [x in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[x]
}
/**
 * 基础构建配置
 */
export interface BuildAppConfig {
    mount: string //绑定的根元素选择器
    style?: {
        global?: GlobalStyleSheet
        body?: GlobalStyleSheet
        base?: GlobalStyleSheet
        html?: GlobalStyleSheet
    }
}
/**
 * 注入全局样式
 * @param styleSheet 样式表
 */
export function injectGlobalCSSStyle(styleSheet: GlobalStyleSheet): void {
    const style = document.querySelectorAll("style")
    let insertStyleElement: HTMLStyleElement
    if (style.length) //直接插入到最后一个style标签内
        insertStyleElement = style[style.length - 1] as HTMLStyleElement
    else {
        const newStyleEle = document.createElement("style")
        insertStyleElement = newStyleEle
        document.head.append(newStyleEle)
    }
    let styleString = ''
    Object.keys(styleSheet).forEach(p => {
        styleString += `${convertCSSPropertyName(p)}: ${styleSheet[p as keyof CSSStyleDeclaration]}; `
    })
    insertStyleElement.innerHTML += `* { ${styleString}}\n`
}
/**
 * 注入Body样式
 * @param styleSheet 样式表
 */
export function injectBodyCSSStyle(styleSheet: GlobalStyleSheet): void {
    const style = document.querySelectorAll("style")
    let insertStyleElement: HTMLStyleElement
    if (style.length) //直接插入到最后一个style标签内
        insertStyleElement = style[style.length - 1] as HTMLStyleElement
    else {
        const newStyleEle = document.createElement("style")
        insertStyleElement = newStyleEle
        document.head.append(newStyleEle)
    }
    let styleString = ''
    Object.keys(styleSheet).forEach(p => {
        styleString += `${convertCSSPropertyName(p)}: ${styleSheet[p as keyof CSSStyleDeclaration]}; `
    })
    insertStyleElement.innerHTML += `body { ${styleString}}\n`
}

/**
 * 注入根元素样式
 * @param styleSheet 样式表
 */
export function injectBaseCSSStyle(mountSelector: string, styleSheet: GlobalStyleSheet): void {
    const style = document.querySelectorAll("style")
    let insertStyleElement: HTMLStyleElement
    if (style.length) //直接插入到最后一个style标签内
        insertStyleElement = style[style.length - 1] as HTMLStyleElement
    else {
        const newStyleEle = document.createElement("style")
        insertStyleElement = newStyleEle
        document.head.append(newStyleEle)
    }
    let styleString = ''
    Object.keys(styleSheet).forEach(p => {
        styleString += `${convertCSSPropertyName(p)}: ${styleSheet[p as keyof CSSStyleDeclaration]}; `
    })
    insertStyleElement.innerHTML += `${mountSelector} { ${styleString}}\n`
}

/**
 * 注入HTML元素样式
 * @param styleSheet 样式表
 */
export function injectHTMLCSSStyle(styleSheet: GlobalStyleSheet): void {
    const style = document.querySelectorAll("style")
    let insertStyleElement: HTMLStyleElement
    if (style.length) //直接插入到最后一个style标签内
        insertStyleElement = style[style.length - 1] as HTMLStyleElement
    else {
        const newStyleEle = document.createElement("style")
        insertStyleElement = newStyleEle
        document.head.append(newStyleEle)
    }
    let styleString = ''
    Object.keys(styleSheet).forEach(p => {
        styleString += `${convertCSSPropertyName(p)}: ${styleSheet[p as keyof CSSStyleDeclaration]}; `
    })
    insertStyleElement.innerHTML += `html { ${styleString}}\n`
}


/**
 * 构建器
 * @param config 配置选项
 * @returns 根元素
 */
export function BuildApp(config: BuildAppConfig) {
    if (typeof config !== 'object') throw new TypeError("The buildApp function is configured incorrectly.")
    config?.style?.global && injectGlobalCSSStyle(config.style.global)
    config.style?.html && injectHTMLCSSStyle(config.style.html)
    config?.style?.body && injectBodyCSSStyle(config.style.body)
    config?.style?.base && injectBaseCSSStyle(config.mount, config.style.base)
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
        return (...args: RNode[]) => {
            mount(this.mountElement as HTMLElement, args)
        }
    }
}
