import type { DefineComponent, ComputedRef, ComponentOptionsMixin, EmitsOptions, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
/**
 * 2022.7.1想到的优化点
 * 新增json导入导出功能
 */
declare const _sfc_main: DefineComponent<{}, {
    handleFormSave: (type?: string | undefined) => void;
    handleFormPre: () => void;
    historyIndex: ComputedRef<unknown>;
    historyLen: ComputedRef<number | undefined>;
    fullscreen: ComputedRef<unknown>;
    clearIsDisable: ComputedRef<boolean>;
    handleClear: () => void;
    handleBack: () => void;
    handleForward: () => void;
    handleFullScreen: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}>;
export default _sfc_main;
