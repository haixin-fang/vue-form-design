import type { DefineComponent, Ref, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
declare const _sfc_main: DefineComponent<{
    active: BooleanConstructor;
    currentIndex: NumberConstructor;
    len: {
        type: NumberConstructor;
        default: number;
    };
    inline: BooleanConstructor;
    layout: BooleanConstructor;
    currentId: StringConstructor;
    item: ObjectConstructor;
}, {
    isShow: Ref<boolean>;
    handleShortCut: (e: any) => void;
    handleMenu: () => void;
    editForm: Ref<any>;
    handleActive: (type: string) => void;
    handleCopyAndPaste: () => void;
    copyContent: ComputedRef<any>;
    handleColumn: () => void;
    handleRow: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    active: BooleanConstructor;
    currentIndex: NumberConstructor;
    len: {
        type: NumberConstructor;
        default: number;
    };
    inline: BooleanConstructor;
    layout: BooleanConstructor;
    currentId: StringConstructor;
    item: ObjectConstructor;
}>>, {
    layout: boolean;
    active: boolean;
    len: number;
    inline: boolean;
}>;
export default _sfc_main;
