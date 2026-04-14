import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ["./dist/main.js"],
    bundle: true,
    outfile: './dist/rawfox.js',
    treeShaking: true,
    format: "iife",
    minify: true,
    globalName: "rawfox"
})