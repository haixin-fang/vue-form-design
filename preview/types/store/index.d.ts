export interface GlobalDataProps {
    form: any;
}
declare const _default: {
    copy(): void;
    paste(): void;
    delete(): void;
    onTop(): void;
    onBottom(): void;
    clear(): void;
    moveTop(): void;
    moveBottom(): void;
    set(name: any, value: any): void;
    get(name: any): any;
    commit(event: string): void;
};
export default _default;
