export default _sfc_main;
declare namespace _sfc_main {
    namespace props {
        namespace fieldList {
            export const type: ObjectConstructor;
            function _default(): {};
            function _default(): {};
            export { _default as default };
        }
        namespace data {
            const type_1: ObjectConstructor;
            export { type_1 as type };
            function _default(): {};
            function _default(): {};
            export { _default as default };
        }
    }
    function data(): {
        table: never[];
        groupSelect: {
            value: string;
            label: string;
        }[];
        logicList: {
            value: string;
            label: string;
        }[];
        typeList: {
            rule: never[];
            value: string;
            label: string;
        }[];
    };
    function data(): {
        table: never[];
        groupSelect: {
            value: string;
            label: string;
        }[];
        logicList: {
            value: string;
            label: string;
        }[];
        typeList: {
            rule: never[];
            value: string;
            label: string;
        }[];
    };
    namespace computed {
        function newtypeList(): any;
        function newtypeList(): any;
    }
    namespace methods {
        function handleType(type: any): void;
        function handleType(type: any): void;
        function getFiled(): any;
        function getFiled(): any;
        function getMultiple(): any;
        function getMultiple(): any;
        function getLogic(): any;
        function getLogic(): any;
        function show(data: any): void;
        function show(data: any): void;
        function onAddItem(): void;
        function onAddItem(): void;
        function getTypeIsChange(index: any): any;
        function getTypeIsChange(index: any): any;
        function getRules(value: any): any;
        function getRules(value: any): any;
        function closeDialog(): void;
        function closeDialog(): void;
        function deleteRow(): void;
        function deleteRow(): void;
        function saveJson(): Promise<void>;
        function saveJson(): Promise<void>;
    }
}
