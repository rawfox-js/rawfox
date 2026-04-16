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

