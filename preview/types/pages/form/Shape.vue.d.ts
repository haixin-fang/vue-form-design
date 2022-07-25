import type { DefineComponent, Ref, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
declare const _sfc_main: DefineComponent<{
    active: BooleanConstructor;
    currentIndex: NumberConstructor;
    len: NumberConstructor;
    inline: BooleanConstructor;
    layout: BooleanConstructor;
}, {
    isShow: Ref<boolean>;
    handleShortCut: (e: any) => void;
    handleMenu: () => void;
    editForm: Ref<any>;
    handleActive: (type: string) => void;
    handleCopyAndPaste: () => void;
    copyContent: ComputedRef<any>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    active: BooleanConstructor;
    currentIndex: NumberConstructor;
    len: NumberConstructor;
    inline: BooleanConstructor;
    layout: BooleanConstructor;
}>>, {
    layout: boolean;
    active: boolean;
    inline: boolean;
}>;
export default _sfc_main;
