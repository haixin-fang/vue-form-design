# starfish-vue3-lowcode
Starfish 可视化动态表单平台及h5页面搭建平台。

* 💪 Vue 3.0 Composition API
* 🔥 Written in TypeScript

# 在线体验

https://haixin-fang.github.io/starfish-vue3-lowcode/preview/index.html

## 图片
[![j3pVnH.png](https://s1.ax1x.com/2022/07/02/j3pVnH.png)](https://imgtu.com/i/j3pVnH)

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
$ pnpm dev
```

最后在浏览器中打开

http://localhost:8888/

即可得到一个动态表单项目

## 架构

使用monorepo架构
该项目分为多个代码包,有
starfish-form,表单组件
@starfish/editor,编辑页面


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


# 可用库
- nanoid 一个小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器。