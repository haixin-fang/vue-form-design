<p align="center">
 <img src="https://cdnjson.com/images/2024/03/20/logo56d6f604a78d5e473.png" height="160" />
</p>
<h1 align="center">vue-form-design</h1>

Starfish 可视化动态表单平台. 完全采用 `ECMAScript` 模块（`ESM`）规范来编写和组织代码，使用了最新的 `Vue3`、`Vite`、`Element-Plus`、`TypeScript` 等主流技术开发

- 💪 Vue 3.0 Composition API
- 🔥 Written in TypeScript

# 在线体验

https://haixin-fang.github.io/vue-form-design/playground/index.html

## 相关技术文章

- [低代码表单设计器介绍](https://juejin.cn/post/7126106760191934495)
- [开源表单设计器 vue-form-design 自动化校验实现原理](https://juejin.cn/post/7343161506698592266)
- [重构, 首页体积从 3.9M 到 1.5M](https://juejin.cn/post/7346426730048913435)
- [开源表单设计器颗粒度级别控制表单的显示条件原理分析](https://juejin.cn/post/7347910830761705498)
- [关注我, 持续更文中……](https://juejin.cn/user/4442456629716317)

## 图片

[![vlt3PU.gif](https://s1.ax1x.com/2022/08/09/vlt3PU.gif)](https://imgtu.com/i/vlt3PU)

## 简介

可以简称`starfish设计器`，是一个功能强大、开箱即用的拖拽式低代码设计器。它基于 Vue3 开发，可以让开发者根据自己的需求自由扩展和定制组件。此外，vue-form-design 使用 JSON 配置来生成页面，可帮助开发者快速生成页面，提高开发效率。它提供了两个重要组件：`starfish-editor` 设计器和 `starfish-form` 生成器。

#### 功能

- [x] 拖拽设计
- [x] 自定义 actionBar
- [x] 布局组件扩展
- [x] 自定义组件扩展
- [x] 事件扩展
- [x] 完善布局
- [x] 组件属性自定义
- [x] 动态校验 ([开源表单设计器 vue-form-design 动态表单校验实现原理](https://juejin.cn/post/7343161506698592266))
- [x] 表单显示条件
- [x] 支持快捷键设计表单

## 技术栈

- Vue3
- typescript
- Vite
- element-plus
- codemirror

## 环境准备

node.js >= 16

先安装 pnpm

```bash
$ npm install -g pnpm
```

然后安装依赖

```bash
$ pnpm bootstrap
```

## 运行项目

执行命令

```bash
$ pnpm pg
```

最后在浏览器中打开

http://localhost:1100/vue-form-design/playground/#/

即可得到一个动态表单项目

## 架构

使用 monorepo 架构,该项目分为多个代码包,有 starfish-form 表单生成器, starfish-editor 表单设计器

### 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `build` 对构建系统或者外部依赖项进行了修改
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

### 如何贡献

Pull Request:

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交您的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## 核心组件介绍

#### starfish-editor 设计器

`starfish-editor` 是一个可视化设计器组件，用户可以通过拖拽组件的方式快速生成 JSON 配置。它提供了丰富的组件库和配置项，用户可以根据需要选择合适的组件并配置相应的属性、事件和动作。设计器还提供了实时预览功能，用户可以随时查看所设计页面的效果。最终，用户可以将 JSON 配置导出，用于页面的生成和修改。

#### starfish-form 生成器

`starfish-form` 是一个页面构建组件，它可以将设计器生成的 JSON 配置构建成页面，完成组件的渲染、事件绑定和数据回显等操作。

## 项目中引用表单编辑器

先安装包

```js
npm i starfish-editor -S
```

注册包

```js
import { createApp } from "vue";
import App from "./App.vue";
import StarfishEditor from "starfish-editor";
import "starfish-editor/src/styles/index.scss";
const app = createApp(App);
app.use(StarfishEditor);
app.mount("#app");
```

使用编辑器吗,对应字段参考下方

```js
<starfish-editor class="starfish-editor"> </starfish-editor>
```

生成器使用

```js
import { Dynamicform } from "starfish-form";
app.component(Dynamicform.name, Dynamicform);
```

动态表单组件使用

`formResult`可以为空,list 是通过编辑器生成的结果 json,搭配使用

```js
<Dynamicform v-model:formResult="formResult" :allFormList="list" ></Dynamicform>
```

## 简要文档说明

- 需要的基础组件
  :basic-fields="['Text', 'textarea']"
- 需要的布局组件
  :layout-fields="['grid']"
- 是否禁用快捷键
  shortcut-disabled=true
- 保存回调
  @save
- 获取 json
  getJson
- 设置 json
  setJson
- navlist 每个按钮可配,并且是否可隐藏
- header 头是否展示
  header-show 默认 true
- 菜单按钮自定义
  actionbar: {
  left: ['delete', 'undo', 'redo', 'tree', 'save', 'preview', 'fullscreen'],
  right: ['viewport', 'json-export', 'json-import'],
  column: true
  },
- 属性菜单 tab 自定义
  panel: ["form", "json", "global"] 组件配置、json 配置、表单配置, 不传则默认全展示


## `Star`

非常感谢留下星星的好心人，感谢您的支持 :heart:

[![Stargazers for vue-form-design](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=haixin-fang&repo=vue-form-design)](https://github.com/haixin-fang/vue-form-design/stargazers)

## `Fork`

瞧，那些 `小哥哥` 、`小姐姐` 认真 `学习` 的样子真滴是 `哎呦不错哦` :heart:

[![Forkers repo roster for vue-form-design](https://reporoster.com/forks/haixin-fang/vue-form-design)](https://github.com/haixin-fang/vue-form-design/network/members)
