import type { DefineComponent, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
declare const _sfc_main: DefineComponent<{
    dialogclass: StringConstructor;
    showDialog: BooleanConstructor;
    width: NumberConstructor;
}, {
    isshow: Ref<boolean>;
    title: Ref<string>;
    icon: Ref<string>;
    isFullScreen: Ref<boolean>;
    init(titles: string, icons: string): void;
    show(): void;
    close(): void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("close" | "open")[], "close" | "open", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    dialogclass: StringConstructor;
    showDialog: BooleanConstructor;
    width: NumberConstructor;
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
}, {
    showDialog: boolean;
}>;
export default _sfc_main;
