/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@starfish/*' {
  export default {
    install: () => {},
    formcomponents: any
  };
}