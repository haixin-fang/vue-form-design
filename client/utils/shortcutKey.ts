import store from '@/store/index'
import vm from './vm'

// 当是json模式下，快捷键失效
let jsonState = false
vm.on('changeViewAndJson', (type) => {
    if(type === 'json'){
        jsonState = true
    }else{
        jsonState = false
    }
})
const CTRL = 17, 
CKEY = 67, // 复制
VKEY = 86, // 粘贴
ZKEY = 90, // 回退
DELETEKEY = 46, // 删除
TOPKEY = 38, // 上移
BOTTOMKEY = 40,  // 下移
XKEY = 88, // 裁剪
EKEY = 69; // 清空画布

const baseMap:any = {
    [CKEY]: copy,
    [VKEY]: paste,
    [TOPKEY]: onTop,
    [BOTTOMKEY]: onBottom,
    [XKEY]: cut,
    [EKEY]: clearCanvas
}

function clearCanvas(){
    store.commit('clear')
}

export function copy(){
    store.commit('copy')
}

export function paste(){
    store.commit('paste')
}

export function cut(){
    store.commit('copy')
    store.commit('delete')
}

export function onDelete(){
    store.commit('delete')
}

export function onTop(){
    store.commit('onTop')
}

export function onBottom(){
    store.commit('onBottom')
}



let isCtrlDown = false; // 默认没有按住ctrl

export function listenGlobalKeyDown(){
    window.onkeydown = (e:any) => {
        if(jsonState){
            return
        }
        if(e.keyCode === CTRL){
            isCtrlDown = true
        }else if(!isCtrlDown){
            if(e.keyCode === DELETEKEY){
                onDelete()
            }else if(e.keyCode === TOPKEY){
                store.commit('moveTop')
            }else if(e.keyCode === BOTTOMKEY){
                store.commit('moveBottom')
            }
        }else if(isCtrlDown){
            e.preventDefault()
            baseMap[e.keyCode] && baseMap[e.keyCode]()
        }
    }
    window.onkeyup = (e: any) => {
        if(jsonState){
            return
        }
        if(isCtrlDown && e.keyCode === CTRL){
            isCtrlDown = false
        }
    }
}