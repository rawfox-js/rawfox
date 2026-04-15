import type { RNode } from "./rnode";

export function render(rnode: RNode): Node {
    switch (rnode.type) {
        case "text":
            return document.createTextNode(rnode.inner)
        case "element":
            const ele = document.createElement(rnode.name)
            if (rnode.attrList)
                Object.keys(rnode.attrList).forEach(attr => {
                    ele.setAttribute(attr, rnode.attrList[attr])
                })
            if (rnode.styleList)
                Object.keys(rnode.styleList).forEach(property => {
                    (ele.style as {
                        [k: string]: any
                    })[property] = rnode.styleList[property]
                })
            if (rnode.eventList)
                Object.keys(rnode.eventList).forEach((event) => {
                    const handler = rnode.eventList[event as keyof HTMLElementEventMap]
                    if (handler)
                        ele.addEventListener(event, handler)
                })
            if (!rnode.inner) return ele
            if (typeof rnode.inner == 'string') {
                ele.innerText = rnode.inner
            }
            if (Array.isArray(rnode.inner)) {
                rnode.inner.forEach(rn => {
                    ele.append(render(rn))
                })
            }
            return ele
        case "comment":
            return document.createComment(rnode.inner)
    }
}