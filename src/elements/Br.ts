import { BuildRNode } from "../core/rnode";
import { injectProperties } from "../module/properties";

export function Br() {
    return injectProperties.apply(BuildRNode("element", undefined, "br"), [{}])
}