/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "starfish-form";
/**
 * 在d.ts文件中定义类型,就相当于global,不需要再declare global
 */
declare interface Window {
  VueContext: {
    $Flex: any;
  };
  clickCountLimitMock: boolean;
  JSONEditor: any;
  VApp: any;
}
