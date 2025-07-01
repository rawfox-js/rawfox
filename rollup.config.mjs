import terser from '@rollup/plugin-terser'
import { builtinModules } from 'module'

/** @type {import('rollup').RollupOptions} */
export default {
    input: "./dist/main.js",
    output: {
        format: "esm", //使用esmodules模式
        file: "./dist/index.js",
        banner: "#!/usr/bin/env node",
        plugins: [terser()]
    },
    external:[ //防止rollup打包
        ...builtinModules, //所有的node内置模块
        'prompts','cac'
    ]
}