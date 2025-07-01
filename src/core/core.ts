import { cac } from "../../node_modules/cac/dist/index"
const cli = cac('rawfox')

//命令的选项类型，值类型和布尔类型
type OptionsType = "valued" | "boolean"


interface Base_Options<O extends string, T extends OptionsType> {
    name?: string; //名称
    otherName: O; //别名
    type: T;
    description?: string;
}
interface ValuedOptions<O extends string> extends Base_Options<O, "valued"> {
    valueName: string;
}
interface BooleanOptions<O extends string> extends Base_Options<O, "boolean"> { }
//命令的选项
type Options<O extends string> = ValuedOptions<O> | BooleanOptions<O>
//配置选项
export type config<O extends string, Q extends Options<O>[]> = {
    name: string; //子命令名
    valueName?: string; //子命令参数名（用于获取参数值）
    description?: string; //介绍
    options?: Q; //选项
    action: (
        name: any,
        options: Q extends Array<infer T> ? {
            [O in T as (O extends { otherName: infer K extends string } ? K : never)]: O extends { type: "boolean" } ? boolean : any
        } : never
    ) => void | Promise<void>; // 回调函数
}

export function setCommands<N extends string, Q extends Options<N>[]>(config: config<N, Q>) {
    const c = cli.command(`${config.name} [${config.valueName}]`, config.description)
    if (config.options)
        for (const i of config.options) {
            c.option(`${i.name ? "-" + i.name + ", " : ""}--${i.otherName} ${i.type === 'valued' ? "<" + i.valueName + ">" : ""}`, i.description ?? "")
        }
    c.action(async (p, o) => {
        await config.action(p, o)
    })
}

export function build() {
    cli.help()
    cli.parse()
}