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

> 2021/9/29 完成动态表单大致框架，定义数据格式，通过vuex实现动态交互
> 2021/9/30 电脑中病毒重装系统，心态崩了
> 2021/10/2 动态表单模块完成单选框组件、文本域组件

## 问题

- 鼠标监听与顺序拖拽冲突问题：https://editor.csdn.net/md/?articleId=120528792
- 表单拖拽到页面时，数据是引用类型，导致拖多个相同表单，修改一个时其他都会变化，监听拖拽到页面时数据变化，通过深拷贝的方式对数据进行重新赋值

### eslint 问题

- https://blog.csdn.net/weixin_43768107/article/details/120556194

