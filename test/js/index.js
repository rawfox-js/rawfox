const { BuildApp, Text, P } = rawfox
const App = BuildApp({
    mount: "#app"
})

App(
    Text("hello World\n"),
    Text("煞笔"),
    P("你好"),
    {
        name: "div",
        type: "element",
        inner: '1'
    }
)