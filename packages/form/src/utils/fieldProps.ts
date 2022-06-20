import {PropType} from 'vue';

interface FormConfig {
    [key:string]: string;
}

export default {
    drag: {
        type: Boolean,
        default: false
    },
    data: Object as PropType<FormConfig>,
    item: Object,
}