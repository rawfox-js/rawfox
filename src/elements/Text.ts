import type { RNode } from "../core/rnode";

export function Text(text: string): RNode {
    return {
        type: "text",
        inner: text
    }
}