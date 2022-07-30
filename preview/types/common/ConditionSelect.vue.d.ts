import type { DefineComponent, ComponentPropsOptions, ComputedRef, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes, ComponentObjectPropsOptions } from 'vue';
declare const _sfc_main: DefineComponent<Readonly<ComponentPropsOptions<{
    [x: string]: unknown;
}>>, {
    fieldList: ComputedRef<any>;
    maxJsonDialog: Ref<any>;
    formList: Ref<any>;
    handleType(index: number, tableIndex: number, type: string): void;
    getLogic(index: number, tableIndex: number): {
        value: string;
        label: string;
        rule?: any[] | undefined;
    }[];
    getFiled(index: number, tableIndex: number): any;
    show(): void;
    getMultiple(index: number, tableIndex: number): boolean;
    getNewTypeList(index: number, tableIndex: number): {
        value: string;
        label: string;
        rule?: any[] | undefined;
    }[];
    deleteRow(index: number, tableIndex: number): void;
    getTypeIsChange(index: number, tableIndex: number): boolean;
    getRules(value: any): {
        value: any[] | undefined;
    };
    onAddItem(index: number): Promise<void>;
    onOrItem(): void;
    closeDialog(): void;
    saveJson(): void;
    andData: Ref<any[][]>;
    logicList: Ref<{
        value: string;
        label: string;
        rule?: any[] | undefined;
    }[]>;
    typeList: Ref<{
        value: string;
        label: string;
        rule?: any[] | undefined;
    }[]>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "change"[], "change", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<readonly string[] | ExtractPropTypes<Readonly<ComponentObjectPropsOptions<{
    [x: string]: unknown;
}>>>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    [x: number]: string;
} | {}>;
export default _sfc_main;
