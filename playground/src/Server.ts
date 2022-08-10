import {reactive} from 'vue';
const state = reactive({
    allFormList: []
})

class Store {
    get(key:string){
        return state[key];
    }
    set(key:string, value:any){
        state[key] = value;
    }
}

export default new Store();