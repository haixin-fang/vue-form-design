/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'starfish-form'

declare module "jsoneditor";


/**
 * 在d.ts文件中定义类型,就相当于global,不需要再declare global
 */
interface Window {
  VueContext: {
    $Flex: any;
  };
  clickCountLimitMock: boolean;
  JSONEditor: any;
  VApp: any;
  Clipboard:any;
}
