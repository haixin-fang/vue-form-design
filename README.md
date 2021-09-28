## 技术栈

- Vue3
- typescript
- webpack

## 目录结构

- formcomponents 表单组件
- pages 存放页面
  - Editer 编辑组件页面
    - components 编辑器相关组件
- styles 全局样式
- router 路由管理
- store 状态管理
- utils 全局公共方法
  - _ 公共方法
  - editMouse 编辑器鼠标拖拽和监听鼠标滚动事件

## 更新

> 2021/9/26 更新[配置完善、路由新增、sass模块引入](https://github.com/fhx10012091/starfish-h5/commit/7ba16bd0d1f37f2b35b087456b963830277200e5)

> 2021/9/27 更新[编辑模块移动与拖拽和鼠标滑动联动，放大缩小](https://github.com/fhx10012091/starfish-h5/commit/fc60e180a71675afbe3973ca8b7aeff77a684740)

> 2021/9/28 引用vuedraggable库，完成内容拖拽，内容顺序拖拽功能

## 问题

- 鼠标监听与顺序拖拽冲突问题：https://editor.csdn.net/md/?articleId=120528792