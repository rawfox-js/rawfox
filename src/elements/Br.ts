import { BuildRNode } from "../core/rnode";

export function Br() {
    return BuildRNode("element", undefined, "br").injectProperties()
}