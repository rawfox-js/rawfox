import { BuildRNode, type RNode } from "../core/rnode";
import { injectProperties } from "../module/properties";

export function Br(): RNode {
    return injectProperties.apply(BuildRNode("element", undefined, "br"), [{}])
}