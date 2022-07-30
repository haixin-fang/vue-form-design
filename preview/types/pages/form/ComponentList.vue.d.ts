import type { DefineComponent, ComponentOptionsMixin, EmitsOptions, VNodeProps, AllowedComponentProps, ComponentCustomProps } from 'vue';
declare const _sfc_main: DefineComponent<{
    [x: string & `on${string}`]: ((...args: any[]) => any) | undefined;
} | {
    [x: string & `on${string}`]: ((...args: never) => any) | undefined;
}, {}, {
    formcomponents: any[];
    filterContent: string;
}, {
    newcomponentlist(): any;
    layoutList(): any;
}, {
    clickAddControl(item: any): void;
}, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<{
    [x: string & `on${string}`]: ((...args: any[]) => any) | undefined;
}> | Readonly<{
    [x: string & `on${string}`]: ((...args: never) => any) | undefined;
}>, {} | {}>;
export default _sfc_main;
