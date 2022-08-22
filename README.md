# starfish-vue3-lowcode
Starfish 可视化动态表单平台及h5页面搭建平台。

* 💪 Vue 3.0 Composition API
* 🔥 Written in TypeScript

# 在线体验

https://haixin-fang.github.io/starfish-vue3-lowcode/playground/index.html

## 图片
[![vlt3PU.gif](https://s1.ax1x.com/2022/08/09/vlt3PU.gif)](https://imgtu.com/i/vlt3PU)

## 技术栈

- Vue3
- typescript
- Vite
- element-plus



## 代码规范
- husky
操作 git 钩子的工具
- lint-staged
本地暂存代码检查工具
- commitlint
commit 信息校验工具
- commitizen
辅助 commit 信息 ,就像这样,通过选择输入,规范提交信息
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

http://localhost:1100/starfish-vue3-lowcode/playground/#/

即可得到一个动态表单项目


## 架构

使用monorepo架构
该项目分为多个代码包,有
starfish-form,表单组件
starfish-editor,编辑页面


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


## Bug记录,功能记录,后续解决或完成

- 预览模式下自动保存导致动态表单不显示
- 不能连续点击后退,做个限制
- 是否全屏加入历史快照
- 导入导出json
- 预览功能优化,样式太丑
- 增加表格
- 布局增加卡片、栅格、标签页
- 布局下的表单验证
- 表单新增提示,间距,html
- 组件层级结构树
- 容器组件的显示条件优化
- github自动构建
- 抽离样式,统一修改,解决安装依赖库必须打包问题(打包后才有dist文件和唯一的样式文件),解决全局样式变量必须给每个组件打包同一份样式问题
- 本地运行的产物和打包后的产物不同,所以打包后样式需要手动导入
- 调试交互事件JavaScript代码
- 自定义CSS样式
- 嵌套表格
- 快捷键tabindex的重要性
- 表单联动,通过onChange方法进行表单数据操作
- 布局下的全局样式未生效
- 动作面板
- 自定义CSS样式

# 可用库
- nanoid 一个小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器。

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
import 'starfish-editor/src/styles/index.scss';
const app = createApp(App);
app.use(StarfishEditor);
app.mount("#app");
```
使用编辑器吗,对应字段参考下方
```js
<starfish-editor class="starfish-editor"> </starfish-editor>
```
动态表单使用
```js
import { Dynamicform } from "starfish-form";
app.component(Dynamicform.name, Dynamicform);
```

动态表单组件使用
`formResult`可以为空,list是通过编辑器生成的结果,搭配使用
```js
<Dynamicform v-model:formResult="formResult" :allFormList="list" ></Dynamicform>
```

## 文档
- 需要的基础组件
:basic-fields="['Text', 'textarea']"
- 需要的布局组件
:layout-fields="['grid']"
- 是否禁用快捷键
shortcut-disabled=true
- 保存回调
@save
- 获取json
getJson
- 设置json
setJson
- navlist 每个按钮可配,并且是否可隐藏
- header头是否展示
header-show 默认true
- 菜单按钮自定义
menu: {
    left: ['delete', 'undo', 'redo', 'tree', 'save', 'preview', 'fullscreen'],
    right: ['viewport', 'json-export', 'json-import'],
    column: true
},