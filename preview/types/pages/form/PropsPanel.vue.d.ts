import type { DefineComponent, Ref, ComputedRef, ComponentOptionsMixin, EmitsOptions, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
declare const _sfc_main: DefineComponent<{}, {
    globalFormLists: Ref<({
        ControlType: string;
        nameCn: string;
        data: {
            fieldName: string;
            label: string;
            tip: string;
            value: string;
            showRule: string;
            required: boolean;
            rule: string;
            default: boolean;
            placeholder?: undefined;
            itemConfig?: undefined;
            min?: undefined;
            max?: undefined;
        };
    } | {
        ControlType: string;
        nameCn: string;
        data: {
            fieldName: string;
            label: string;
            tip: string;
            placeholder: string;
            showRule: string;
            required: boolean;
            rule: string;
            itemConfig: {
                value: string;
                items: {
                    label: string;
                    value: string;
                    select: boolean;
                    id: number;
                }[];
                id: number;
            };
            value?: undefined;
            default?: undefined;
            min?: undefined;
            max?: undefined;
        };
    } | {
        ControlType: string;
        nameCn: string;
        data: {
            fieldName: string;
            label: string;
            showRule: string;
            rule: string;
            itemConfig: {
                value: string;
                items: ({
                    label: string;
                    value: string;
                    select: boolean;
                    id: number;
                } | {
                    label: string;
                    value: string;
                    id: number;
                    select?: undefined;
                })[];
                id: number;
            };
            tip?: undefined;
            value?: undefined;
            required?: undefined;
            default?: undefined;
            placeholder?: undefined;
            min?: undefined;
            max?: undefined;
        };
    } | {
        ControlType: string;
        nameCn: string;
        data: {
            fieldName: string;
            label: string;
            tip: string;
            showRule: string;
            required: boolean;
            rule: string;
            default: number;
            min: number;
            max: string;
            value?: undefined;
            placeholder?: undefined;
            itemConfig?: undefined;
        };
    } | {
        ControlType: string;
        nameCn: string;
        data: {
            fieldName: string;
            label: string;
            tip: string;
            placeholder: string;
            showRule: string;
            required: boolean;
            rule: string;
            default: string;
            value?: undefined;
            itemConfig?: undefined;
            min?: undefined;
            max?: undefined;
        };
    })[]>;
    globalDatas: ComputedRef<any>;
    jsonCenter: Ref<any>;
    handleClick: (tab: any) => void;
    activeName: Ref<string>;
    handleMouseDown: () => Promise<void>;
    moduleIsHidden: Ref<boolean>;
    handleEditBtn: () => void;
    isTransition: Ref<boolean>;
    editRight: Ref<any>;
    controlItems: ComputedRef<any>;
    curControl: ComputedRef<any>;
    ruleForm: Ref<any>;
    show: Ref<boolean>;
    currentIndex: ComputedRef<any>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}>;
export default _sfc_main;
