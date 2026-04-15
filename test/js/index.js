const { BuildApp, Text, P, Br } = rawfox
const App = BuildApp({
    mount: "body"
})

App(
    P(
        Text("网站标题"),
        Br().class("divider"),
        Text("—— 一个很牛的介绍"),
    )
    .class("header")
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("padding", "16px")
    .attr("data-role", "header"),

    P(
        Text("用户名："),
        Br(),

        P(
            Text("点击登录"),
        )
        .class("login-btn")
        .style("background", "#409eff")
        .style("color", "#fff")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .attr("data-action", "login")
        .click((e) => {
            console.log("login click", e.clientX)
        }),

        Br(),

        P(
            Text("点击注册"),
        )
        .class("register-btn")
        .style("background", "#67c23a")
        .style("color", "#fff")
        .style("padding", "8px 12px")
        .attr("data-action", "register")
        .on("pointerdown", (e) => {
            console.log("pointer down", e.pointerId)
        }),

    )
    .class("auth-section")
    .style("margin", "20px")
    .style("border", "1px solid #eee")
    .style("padding", "12px"),

    P(
        Text("文章列表"),
        Br().class("list-divider"),

        P(
            Text("文章 1"),
            Br(),
            Text("这是第一篇文章的内容"),
        )
        .class("article-item")
        .style("margin-bottom", "10px")
        .attr("data-id", 1)
        .click((e) => {
            console.log("article1", e)
        }),

        P(
            Text("文章 2"),
            Br(),
            Text("这是第二篇文章的内容"),
        )
        .class("article-item")
        .style("margin-bottom", "10px")
        .attr("data-id", 2)
        .on("click", (e) => {
            console.log("article2", e)
        }),

        P(
            Text("文章 3"),
            Br(),
            Text("这是第三篇文章的内容"),
        )
        .class("article-item highlight")
        .style("margin-bottom", "10px")
        .style("color", "red")
        .attr("data-id", 3)
        .on("mouseenter", (e) => {
            console.log("hover", e)
        })
        .on("mouseleave", (e) => {
            console.log("leave", e)
        }),

    )
    .class("article-list")
    .style("margin", "20px"),

    P(
        Text("页脚信息"),
        Br(),
        Text("© 2026 rawfox.js"),
    )
    .class("footer")
    .style("text-align", "center")
    .style("margin-top", "40px")
    .attr("data-footer", true)
)