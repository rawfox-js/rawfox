import { BuildRNode, type RNode } from "../core/rnode"
export function Div(...args: RNode[]) {
    if (!args.every(i => (typeof i) != "string")) {
        throw new TypeError("You cannot use strings directly; you must use the \"Text\" element as a text node.")
    }
    return BuildRNode("element", args, "div").injectProperties()
}