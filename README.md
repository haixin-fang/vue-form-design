## 技术栈

- Vue3
- typescript
- webpack

## 目录结构

- formcomponents 表单组件
  - CheckBox 复选框
  - JsonEditor JSON编辑器
  - KeyValueConfig 单选框键值对配置
  - KeyValueConfigMult 多选框键值对配置
  - Radio 单选框
  - Switch 开关
  - Text 文本
  - TextArea 文本域
- pages 存放页面
  - Editer 编辑组件页面
    - components 编辑器相关组件
      - dynamicform 动态表单渲染(已经配置完成的渲染)
- styles 全局样式
- router 路由管理
- store 状态管理
- utils 全局公共方法
  - _ 公共方法
  - editMouse 编辑器鼠标拖拽和监听鼠标滚动事件
  - dynamicform 表单组件公共表单配置

## 更新

> 2021/9/26 更新[配置完善、路由新增、sass模块引入](https://github.com/fhx10012091/starfish-h5/commit/7ba16bd0d1f37f2b35b087456b963830277200e5)

> 2021/9/27 更新[编辑模块移动与拖拽和鼠标滑动联动，放大缩小](https://github.com/fhx10012091/starfish-h5/commit/fc60e180a71675afbe3973ca8b7aeff77a684740)

> 2021/9/28 引用vuedraggable库，完成内容拖拽，内容顺序拖拽功能

> 2021/9/29 完成动态表单大致框架，定义数据格式，通过vuex实现动态交互

> 2021/9/30 电脑中病毒重装系统，心态崩了

> 2021/10/2 动态表单模块完成单选框组件、文本域组件

> 2021/10/3 增加多选框，修复滚动配置动态表单模块(右边模块)中间也会滚动问题，通过监听鼠标移动的标签中的类是否在右边进行判断

> 2021/10/4 动态表单验证，表单预览，表单保存

> 2021/10/5 增加json编辑器表单组件

> 2021/10/6 修复编辑器鼠标拖动和放大缩小冲突问题，增加所有表单组件验证规则判断，显示条件判断，jsonEditor表单组件全屏功能，增加公共组件dialog

## 问题

- 鼠标监听与顺序拖拽冲突问题：https://editor.csdn.net/md/?articleId=120528792
- 表单拖拽到页面时，数据是引用类型，导致拖多个相同表单，修改一个时其他都会变化，监听拖拽到页面时数据变化，通过深拷贝的方式对数据进行重新赋值
- 动态表单组件相关配置中，JsonEditor编辑器组件非直接v-model修改data的数据，而是通过mounted时动态设置，导致配置多个表单组件，切换表单组件，component(vue 中的内置组件)渲染的JSON编辑器不会重新执行mounted，所以储存的data和item都是渲染第一个JsonEditor的，其他JsonEditor更新，所有的JsonEditor都会更新。解决方法：通过监听切换表单组件，变更时单独对JsonEditor进行重新渲染，与其他表单组件隔离开，数据变更是异步的，导致了把JsonEditor从false到true，默认直接是true，组件同样不会刷新，所以先变false,再执行nextTick后变成true

### eslint 问题

- https://blog.csdn.net/weixin_43768107/article/details/120556194

