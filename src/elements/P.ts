import type { RNode } from "../main"

export function P(text: string): RNode {
    return {
        type: "element",
        name: "p",
        inner: text
    }
}