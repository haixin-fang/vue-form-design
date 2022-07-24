import { HistoryItem } from '../type';
declare const state: {
    historyList: {
        allFormList: any[];
        currentIndex: number;
        curControl: any;
    }[];
    index: number;
    historyFlag: boolean;
};
declare class History {
    setValue(value: HistoryItem): void;
    back(): void;
    go(): void;
    get<T>(name: keyof typeof state): T;
    set(name: keyof typeof state, value: any): void;
}
export declare type hisContrl = History;
declare const _default: History;
export default _default;
