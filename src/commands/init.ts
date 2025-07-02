import { setCommands } from "../core/core"
import fs from 'fs'
import prompts from "prompts"
import type { PromptObject } from "prompts"
import chalk from "chalk"
//要询问用户的内容
const promptsOption: PromptObject<string>[] = [
    {
        type: "toggle",
        name: "declaration",
        message: "是否生成类型声明文件？",
        initial: false
    },
    {
        type: "select",
        name: "mode",
        message: "以哪种模式打包？",
        choices:[
            {
                title: "Web Component API",
                description: "基于Web Component API生成文件（基于Shadow DOM API）",
                value: "webComponent",
            },
            {
                title: "DOM Nesting",
                description: "原生DOM嵌套模式（会生成CSS文件来支持）",
                value: "DOMNest"
            }
        ],
        initial: 1
    }
]
//配置文件的默认内容
const configFile = `export default {
    input: "./src/",
    output: "./dist/",
    mode: __mode__
    outputOptions: {
        declarationFile: __declaration__,
    }
}`

type ConfigRules = {
    [name: string]: any
    declaration: boolean
    mode: "DOMNest" | "webComponent"
}
//生成的配置文件的替换规则
const configRules: ConfigRules = {
    declaration: false, //默认不生成类型声明文件
    mode: "webComponent"
}
//配置项会替换配置文件中的 __键__ 为对应值
function setConfigFile(config: {
    [K in keyof ConfigRules]?: ConfigRules[K]
}) {
    let content = configFile
    for (const i of Object.keys(config)) {
        content = configFile.replaceAll(`__${i}__`, config[i] ?? "")
    }
    return content
}
//rawfox init
setCommands({
    name: "init",
    valueName: "value",
    description: "初始化一个rawfox项目",
    options: [
        //生成默认的配置文件
        {
            name: "y",
            otherName: "default",
            type: "boolean"
        },
        //是否生成基础模板
        {
            name: "t",
            otherName: "template",
            type: "boolean"
        }
    ],
    async action(_name, options) {
        try {
            fs.accessSync("rawfox.config.js")
            console.log(chalk.bgRed.italic.white("rawfox.config.js文件已存在。"))
            console.log(chalk.green.bold("请删除rawfox.config.js或重命名后重试。"))
        } catch {
            //询问用户相关配置
            let res
            if (!options.default)
                res = await prompts(promptsOption)
            else
                res = configRules
            fs.writeFileSync("rawfox.config.js", setConfigFile(res))
            if (options.template) {
                //创建src文件夹
                const porjectPrompts = await prompts({
                    type: "text",
                    name: "projectName",
                    initial: "my-components-library",
                    message: "项目名称"
                })
                fs.mkdirSync("src")
                fs.writeFileSync("package.json", JSON.stringify({
                    name: porjectPrompts.projectName,
                    version: "1.0.0",
                    description: "",
                    main: "index.js",
                    scripts: {
                        test: "echo \"Error: no test specified\" && exit 1"
                    },
                    keywords: [],
                    author: "",
                    license: "ISC",
                    type: "commonjs"
                }))
                fs.opendirSync("src")
                fs.writeFileSync("src/my-component.rawfox", `<script lang="js">
                    //This is the Configuration Object.
                    export default {
                        name: "my-component", // The component name must be xxx-xxx.
                        syncData: { //Sync data, when the data update, the template will also update.
                            count: 1
                        },
                        mounted() { // When the component is mounted into the document, this function will be executed.
                            const base = useTemplate("baseElement")
                            base.onclick = () => this.syncData.count++
                        }
                    }
                </script>
                <template>
                    <!--Build your fist Web Component.-->
                    <div rawfox-use="baseElement">{{ $syncData.count }}</div>
                </template>
                <style>
                    /*You can use <style> to construct styles for components.*/
                    div {
                        background-color: white;
                        color: black;
                        padding: 5px 8px;
                        border-radius: 10px;
                        cursor: pointer;
                    }
                    &:hover {
                        background-color: rgb(230, 230, 230);
                    }
                </style>`)
            }
            console.log(chalk.bold.white.bgGreen("项目初始化完成"))
        }
    }
})