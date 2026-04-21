# RawFox

`rawfox`是一款声明式前端框架，支持组件化开发，所有内容只需要在JavaScript中编写。

### 快速开始

通过npm安装

```bash
npm i rawfox
```

通过unpkg引入

```html
<script src="https://unpkg.com/rawfox@x.x.x/dist/rawfox.js"></script>
```

> [!NOTE]
>
> 注意将x替换为最新版本版本号

### 使用

工程化构建

```js
import { BuildApp } from 'rawfox'
```

在浏览器中使用

```js
//组件与基础函数都挂载在window.rawfox下
const { BuildApp } = rawfox
```

### 开始搭建

```js
import { BuildApp, Text } from 'rawfox'
const App = BuildApp({
  mount: "body"
})
App(
  Text("Hello World")
)
```

恭喜你，完成了基础配置。

