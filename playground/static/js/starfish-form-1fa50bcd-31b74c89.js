import{Y as _export_sfc,d as defineComponent,$ as getCurrentInstance,r as ref,o as onMounted,a as openBlock,b as createElementBlock,h as createVNode,w as withCtx,F as Fragment,e as renderList,f as createBlock,g as resolveDynamicComponent,ac as mergeProps,q as createCommentVNode,t as toRaw,J as ElFormItem,K as ElForm}from"./main-837926ce.js";const _sfc_main=defineComponent({name:"Dynamicform",props:{allFormList:{type:Array,default(){return[]}},formResult:{type:Object,default(){return{}}},globalConfig:{type:Object,default(){return{}}}},setup(props,{emit}){const{proxy}=getCurrentInstance(),rules=ref({}),ruleForm=ref(),controlObj=ref();props.allFormList?.forEach(e=>{getRules(e)});function getFormListRules(rules){const result=[];return Array.isArray(rules)&&rules&&rules.length>0&&rules.forEach(item=>{if(item.type=="enum"){const func=eval(`(${item.value})`);result.push({validator:func,trigger:"blur"})}else if(item.type=="func"){const mainData=props.formResult,func=eval(`((rule, value, callback, mainData = mainData) => {${item.value.func}})`);result.push({validator:func,trigger:"blur"}),console.log("mainData",mainData)}else if(item.type=="high"){if(item.value.ruleType==5){result.push({validator:eval(item.value.validor),trigger:item.value.trigger});return}result.push(item.value)}}),result}function getRules(e){if(e.layout)e.layout&&(e.ControlType=="Grid"?e.data.columns.forEach(r=>{r.list.forEach(o=>{getRules(o)})}):e.ControlType=="TableLayout"?e.data.trs.forEach(o=>{o.tds.forEach(t=>{t.list.forEach(a=>{getRules(a)})})}):(e.ControlType=="Collapse"||e.ControlType=="Tabs")&&e.data.items.forEach(o=>{o.list.forEach(t=>{getRules(t)})}));else{let r=[];e.data.required&&r.push({required:!0,message:"请输入"+e.data.label,trigger:"blur"}),typeof e.data.rule=="string"?r=r.concat(proxy.$Flex.tryParseJson(e.data.rule)):r=r.concat(getFormListRules(e.data.rule)),e.data.json&&r.push(...proxy.$Flex.getJsonValidate()),rules.value[e.data.fieldName]=r}}const handleControlChange=()=>{props.allFormList.forEach(r=>{if(r.data.showRule==="{}")r.show=!0;else try{Array.isArray(r.data.showRule)?r.show=conditionChange(transformData(toRaw(r.data.showRule))):r.show=conditionChange(toRaw(r.data.showRule))}catch{r.show=!0}}),executeFunc("updated"),emit("change")};function transformData(e){const r=[];return e.forEach(t=>{r.push({type:"andgroup",result:t.map(a=>({type:"data",data:a}))})}),{type:"orgroup",result:r}}function conditionChange(e){if(e.type=="andgroup"){const r=e.result.map(o=>conditionChange(o)).find(o=>o==!1);return r===void 0?!0:r}else if(e.type=="orgroup"){const r=e.result.map(o=>conditionChange(o)).find(o=>o==!0);return r===void 0?!1:r}else if(e.type=="data"){const r=e.data,t=props.formResult[r.field];let a=!1;switch(r.logic){case"=":a=t==r.value;break;case"!=":a=t!=r.value;break;case"in":Array.isArray(t)?t.find(l=>{if(r.value.include(l))return a=r.value.includes(l),l}):a=r.value.includes(t);break;case"not in":Array.isArray(t)?t.find(l=>{if(!r.value.include(l))return a=!r.value.includes(l),l}):a=!r.value.includes(t);break}return a}}function reset(){ruleForm.value.resetFields()}function getValidate(){return new Promise(e=>{ruleForm.value.validate(r=>{e(r)})})}onMounted(()=>{handleControlChange(),executeFunc("mounted")});function executeFunc(funcName){const mountedAction=props.globalConfig.action?.find(e=>{if(e.type==funcName)return e});mountedAction&&eval(`(function(){${mountedAction.funcStr}}).call(proxy)`)}return{rules,ruleForm,controlObj,handleControlChange,reset,getValidate}}}),_hoisted_1={class:"starfish-dynamicform"};function _sfc_render(e,r,o,t,a,l){const s=ElFormItem,u=ElForm;return openBlock(),createElementBlock("div",_hoisted_1,[createVNode(u,{ref:"ruleForm",model:e.formResult,rules:e.rules,"label-width":"120px",class:"demo-ruleForm",size:e.globalConfig.size||"large","validate-on-rule-change":!1},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(e.allFormList,n=>(openBlock(),createElementBlock(Fragment,null,[!n.layout&&n.show?(openBlock(),createBlock(s,{prop:n.data.fieldName,key:n.id},{default:withCtx(()=>[(openBlock(),createBlock(resolveDynamicComponent(n.ControlType),mergeProps({ref_for:!0,ref:"controlObj",onChange:e.handleControlChange},e.globalConfig,{item:n,data:e.formResult||"{}",drag:!1}),null,16,["onChange","item","data"]))]),_:2},1032,["prop"])):n.show?(openBlock(),createBlock(resolveDynamicComponent(n.ControlType),mergeProps({ref_for:!0,ref:"controlObj",onChange:e.handleControlChange,key:n.id},e.globalConfig,{item:n,data:e.formResult||"{}",drag:!1}),null,16,["onChange","item","data"])):createCommentVNode("",!0)],64))),256))]),_:1},8,["model","rules","size"])])}const Dynamicform=_export_sfc(_sfc_main,[["render",_sfc_render]]);export{Dynamicform as default};