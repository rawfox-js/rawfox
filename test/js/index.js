const { BuildApp, Text, P, Br, Div } = rawfox
const App = BuildApp({
    mount: "body",
    style: {
        global: {
            margin: 0
        },
        html: {
            height: "100%"
        },
        body: {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Chalkboard'"
        }
    }
})

App(
    Div(
        P(Text("Hello World!"))
        .style("font-size", "3em")
        .style("color", "transparent")
        .style("background-clip", "text")
        .style("background-image", "linear-gradient(to right, blue, red, yellow)")
    )
)