declare const globalFormList: ({
    ControlType: string;
    nameCn: string;
    data: {
        fieldName: string;
        label: string;
        tip: string;
        value: string;
        showRule: string;
        required: boolean;
        rule: string;
        default: boolean;
        placeholder?: undefined;
        itemConfig?: undefined;
        min?: undefined;
        max?: undefined;
    };
} | {
    ControlType: string;
    nameCn: string;
    data: {
        fieldName: string;
        label: string;
        tip: string;
        placeholder: string;
        showRule: string;
        required: boolean;
        rule: string;
        itemConfig: {
            value: string;
            items: {
                label: string;
                value: string;
                select: boolean;
                id: number;
            }[];
            id: number;
        };
        value?: undefined;
        default?: undefined;
        min?: undefined;
        max?: undefined;
    };
} | {
    ControlType: string;
    nameCn: string;
    data: {
        fieldName: string;
        label: string;
        showRule: string;
        rule: string;
        itemConfig: {
            value: string;
            items: ({
                label: string;
                value: string;
                select: boolean;
                id: number;
            } | {
                label: string;
                value: string;
                id: number;
                select?: undefined;
            })[];
            id: number;
        };
        tip?: undefined;
        value?: undefined;
        required?: undefined;
        default?: undefined;
        placeholder?: undefined;
        min?: undefined;
        max?: undefined;
    };
} | {
    ControlType: string;
    nameCn: string;
    data: {
        fieldName: string;
        label: string;
        tip: string;
        showRule: string;
        required: boolean;
        rule: string;
        default: number;
        min: number;
        max: string;
        value?: undefined;
        placeholder?: undefined;
        itemConfig?: undefined;
    };
} | {
    ControlType: string;
    nameCn: string;
    data: {
        fieldName: string;
        label: string;
        tip: string;
        placeholder: string;
        showRule: string;
        required: boolean;
        rule: string;
        default: string;
        value?: undefined;
        itemConfig?: undefined;
        min?: undefined;
        max?: undefined;
    };
})[];
declare const globalData: {
    Inline: boolean;
    layout: string;
    labelAlign: string;
    labelWidth: number;
    suffix: string;
};
export { globalFormList, globalData };
