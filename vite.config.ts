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
                    chokidar.watch("./src").on("change", () => {
                        exec("npm run build").on("close", ()=>{
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

