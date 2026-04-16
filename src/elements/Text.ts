import { BuildRNode, type RNode } from "../core/rnode";

export function Text(text: string): RNode {
    return BuildRNode("text", text)
}