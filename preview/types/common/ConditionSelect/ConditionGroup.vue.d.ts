export default _sfc_main;
declare namespace _sfc_main {
    const name: string;
    namespace components {
        export { ConditionTanc };
    }
    namespace props {
        namespace result {
            export const type: ObjectConstructor;
            function _default(): {};
            function _default(): {};
            export { _default as default };
        }
        namespace index {
            const type_1: NumberConstructor;
            export { type_1 as type };
            const _default: number;
            export { _default as default };
        }
        namespace fieldList {
            const type_2: ArrayConstructor;
            export { type_2 as type };
            function _default(): never[];
            function _default(): never[];
            export { _default as default };
        }
        namespace rightField {
            const type_3: ArrayConstructor;
            export { type_3 as type };
            function _default(): never[];
            function _default(): never[];
            export { _default as default };
        }
        namespace request {
            const type_4: ArrayConstructor;
            export { type_4 as type };
            function _default(): never[];
            function _default(): never[];
            export { _default as default };
        }
    }
    function data(): {
        groupSelect: {
            value: string;
            label: string;
        }[];
    };
    function data(): {
        groupSelect: {
            value: string;
            label: string;
        }[];
    };
    namespace watch {
        export namespace result_1 {
            function handler(): void;
            function handler(): void;
            const deep: boolean;
        }
        export { result_1 as result };
    }
    namespace methods {
        function onAddItem(): void;
        function onAddItem(): void;
        function handleControl(bool: any): void;
        function handleControl(bool: any): void;
        function onDeleteItem(): void;
        function onDeleteItem(): void;
        function handleDelete(index: any): void;
        function handleDelete(index: any): void;
        function onChange(a: any): void;
        function onChange(a: any): void;
        function handleUpdateForce(): void;
        function handleUpdateForce(): void;
        function onEditData(): void;
        function onEditData(): void;
    }
}
import ConditionTanc from "./ConditionTanc.vue";
