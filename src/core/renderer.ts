import type { RNode } from "./build-app";

export function render(rnode: RNode): Node {
    switch (rnode.type) {
        case "text":
            return document.createTextNode(rnode.inner)
        case "element":
            const ele = document.createElement(rnode.name)
            if (typeof rnode.inner === 'string')
                ele.innerText = rnode.inner
            else ele.append(render(rnode.inner))
            return ele
        case "comment":
            return document.createComment(rnode.inner)
    }
}