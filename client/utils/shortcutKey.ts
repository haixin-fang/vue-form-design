import store from '@/store/index'
export function copy(){
    store.commit('copy')
}

export function paste(){
    store.commit('paste')
}