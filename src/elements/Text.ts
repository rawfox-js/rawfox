import type { RNode } from '../core/build-app'
export function Text(text: string): RNode {
    return {
        type: "text",
        inner: text
    }
}