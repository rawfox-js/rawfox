import { BuildRNode } from "../core/rnode";

export function Text(text: string){
    return BuildRNode("text", text)
}