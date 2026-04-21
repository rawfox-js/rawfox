# RawFox JS

<img src="https://img.shields.io/badge/Light-green"/> <img src="https://img.shields.io/badge/0 Dependencies-orange"/> <img src="https://img.shields.io/badge/Fast-red"/>

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

## 使用方法

**ES Modules**

```js
import { BuildApp, Text, P, Br } from 'rawfox'
const App = BuildApp({
    mount: "#app",
  	globalStyle: {
       //全局样式注入
    }
})

App(
    P(
        Text("Hello World"),
        Br(),
        Text("This is RawFox."),
        Br(),
        Text("Follow us from GitHub!")
    )
    .style("font-size", "2em")
    .style("background", "linear-gradient(to right, red, blue)")
    .style("background-clip", "text")
    .style("color", "transparent")
    .style("font-weight", "100")
)
```

推荐使用`Vite`构建RawFox项目

**浏览器**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/rawfox.js"></script> <!--导入RawFox IIFE版本-->
</head>
<body>
    <script>
        const { BuildApp, Text, P, Br } = rawfox
        const App = BuildApp({
            mount: "body"
        })
        App(
            P(
                Text("Hello World"),
                Br(),
                Text("This is RawFox."),
                Br(),
                Text("Follow us from GitHub!")
            )
            .style("font-size", "2em")
            .style("background", "linear-gradient(to right, red, blue)")
            .style("background-clip", "text")
            .style("color", "transparent")
            .style("font-weight", "100")
        )
  	</script>
</body>
</html>
```

## 自定义组件

```js
export function P(...args: RNode[]) { // 嵌套组件
    //写入你的特殊代码
    return BuildRNode("element", args, "p").injectProperties({ //通过BuildRNode函数返回组件实例
      a(){
        //特殊方法，为组件定制方法
      }
    }) 
}
```

## 框架原理

### 核心运行流程

```mermaid
graph TD
    %% 用户调用入口
    User([用户代码]) --> BuildApp[BuildApp /src/core/app.ts]
    User --> Elements[Elements /src/elements/*]

    %% 应用启动流程
    BuildApp -->|1. 获取 DOM 挂载点| MountPoint[DOM Element]
    BuildApp -->|2. 创建 App 实例| AppInstance[App 实例]
    AppInstance -->|3. 执行挂载| MountFunc[mount /src/core/app.ts]

    %% 节点构建流程
    subgraph "节点构建层 (RNode Construction)"
        Elements -->|P / Text / Br| BuildRNode[BuildRNode /src/core/rnode.ts]
        BuildRNode -->|返回 RNode| InjectProps[injectProperties /src/module/properties.ts]
        InjectProps -->|赋予链式调用能力| RNodeWithMethods[具有 .class .style .on 等方法的 RNode]
    end

    %% 渲染流程
    subgraph "渲染层 (Rendering)"
        MountFunc -->|调用| Render[render /src/core/renderer.ts]
        Render -->|如果是文本| textRender[textRender]
        Render -->|如果是元素| elementRender[elementRender]
        Render -->|如果是注释| commentRender[commentRender]
        
        elementRender -->|1. 创建 DOM| CreateEle[document.createElement]
        elementRender -->|2. 处理属性| attrListInsert[attrListInsert]
        elementRender -->|3. 处理样式| styleListInsert[styleListInsert]
        elementRender -->|4. 处理事件| eventListInsert[eventListInsert]
        elementRender -->|5. 递归渲染子节点| Render
    end

    %% 最终产出
    Render -->|返回真实 DOM| MountPoint
```

