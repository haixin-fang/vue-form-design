export interface GlobalDataProps {
    form: any;
}
declare const _default: {
    copy(list: any): void;
    paste(list: any): void;
    delete(list: any): void;
    onTop(list: any): void;
    onBottom(list: any): void;
    clear(): void;
    moveTop(): void;
    moveBottom(list: any): void;
    set(name: any, value: any): void;
    get(name: any): any;
    commit(event: string): void;
};
export default _default;
