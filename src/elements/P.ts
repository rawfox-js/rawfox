import { BuildRNode, type RNode } from "../core/rnode"
import { injectProperties } from "../module/properties"
export function P(...args: RNode[]) {
    if (!args.every(i => (typeof i) != "string")) {
        throw new TypeError("You cannot use strings directly; you must use the \"Text\" element as a text node.")
    }
    return injectProperties.apply(BuildRNode("element", "p", args), [{}])
}
