import { defineConfig, type Plugin } from 'vite'
import chokidar from 'chokidar'
import { exec } from 'node:child_process'
import fs from 'fs'

export default defineConfig({
    root: "./test/",
    plugins: [
        (function () {
            return {
                name: "dev-watcher",
                configureServer() {
                    chokidar.watch("./src").on("change", (e) => {
                        if(e === 'src/main.ts') return
                        // 读取element目录下的所有文件
                        const files = fs.readdirSync("./src/elements")
                        let result = files.map(i => `export * from './elements/${i.replace(/\.ts/, "")}'`).join("\n")
                        const start = `export * from './core/app'\n`
                        result = start + result
                        fs.writeFileSync("./src/main.ts", result)
                        exec("npm run build").on("close", () => {
                            fs.copyFileSync("./dist/rawfox.js", "./test/js/rawfox.js")
                        })
                    })
                }
            }
        })()
    ],
    server: {
        port: 5175
    }
})

