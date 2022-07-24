import type { DefineComponent, ComponentPropsOptions, ComputedRef, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes, ComponentObjectPropsOptions } from 'vue';
export default _sfc_main;
declare const _sfc_main: DefineComponent<Readonly<ComponentPropsOptions<{
    [x: string]: unknown;
}>>, {
    fieldList: ComputedRef<any>;
    maxJsonDialog: Ref<any>;
    formList: Ref<any>;
    handleType(index: any, tableIndex: any, type: any): void;
    getLogic(index: any, tableIndex: any): {
        value: string;
        label: string;
    }[];
    getFiled(index: any, tableIndex: any): any;
    show(): void;
    getMultiple(index: any, tableIndex: any): boolean;
    getNewTypeList(index: any, tableIndex: any): any;
    deleteRow(index: any, tableIndex: any): void;
    getTypeIsChange(index: any, tableIndex: any): boolean;
    getRules(value: any): {
        value: any;
    };
    onAddItem(index: any): Promise<void>;
    onOrItem(): void;
    closeDialog(): void;
    saveJson(): void;
    andData: Ref<never[][]>;
    logicList: Ref<{
        value: string;
        label: string;
    }[]>;
    typeList: Ref<{
        value: string;
        label: string;
    }[]>;
}, any, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, readonly string[] | Readonly<ExtractPropTypes<Readonly<ComponentObjectPropsOptions<{
    [x: string]: unknown;
}>>>>, {
    [x: number]: string;
} | {}>;
