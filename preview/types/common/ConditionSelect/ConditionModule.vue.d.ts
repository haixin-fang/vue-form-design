export default _sfc_main;
declare namespace _sfc_main {
    namespace components {
        export { ConditionGroup };
    }
    namespace props {
        namespace data {
            export const type: ObjectConstructor;
            function _default(): {};
            function _default(): {};
            export { _default as default };
        }
        namespace item {
            const type_1: ObjectConstructor;
            export { type_1 as type };
            function _default(): {};
            function _default(): {};
            export { _default as default };
        }
    }
    function data(): {
        result: {};
        stringLink: string;
        leftField: never[];
        rightField: never[];
        condition: never[];
        request: never[];
    };
    function data(): {
        result: {};
        stringLink: string;
        leftField: never[];
        rightField: never[];
        condition: never[];
        request: never[];
    };
    namespace watch {
        namespace result {
            function handler(): void;
            function handler(): void;
            const deep: boolean;
        }
    }
    namespace methods {
        function show(): Promise<void>;
        function show(): Promise<void>;
        function handleUpdateForce(): void;
        function handleUpdateForce(): void;
        function filterCondition(result: any): string;
        function filterCondition(result: any): string;
        function getDataConditionRelate(data: any): string;
        function getDataConditionRelate(data: any): string;
        function closeDialog(): void;
        function closeDialog(): void;
        function saveJson(): void;
        function saveJson(): void;
    }
}
import ConditionGroup from "./ConditionGroup.vue";
