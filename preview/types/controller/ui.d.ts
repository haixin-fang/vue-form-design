declare const state: {
    columnWidth: {
        left: number;
        center: number;
        right: number;
    };
    dialogWidth: number;
    scale: number;
    isFullscreen: boolean;
};
declare class Ui {
    get<T>(name: keyof typeof state): T;
    set<T>(name: keyof typeof state, value: T): void;
    private setScale;
    private setColumnWidth;
}
export declare type UiControl = Ui;
declare const _default: Ui;
export default _default;
