declare class Flex {
    lastClickTime: number;
    openTanc: boolean;
    constructor();
    clickCountLimit(): boolean;
    generateMixed(): string;
    controlFormRule(controlItems: any[]): any;
    deepClone(target: any): any;
    tryParseJson(json: string): any;
    open(message: string, title?: string, type?: any): void;
    getJsonValidate(): any;
    getDataType(data: any): any;
}
declare const _default: Flex;
export default _default;
