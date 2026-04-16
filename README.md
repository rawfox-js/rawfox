# RawFox JS

## 简洁、易读

无依赖，无侵入，支持无`css`构建。

```js
App(
		Text("Hello World"),
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
)
```

## 框架原理

