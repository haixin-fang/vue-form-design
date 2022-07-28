import { ElNotification } from "element-plus";
import { nanoid } from "nanoid";
const fieldlist: string[] = [];
class Flex {
  lastClickTime: number;
  openTanc: boolean;
  constructor() {
    this.lastClickTime = 0;
    this.openTanc = false; // 是否有弹窗
  }
  //  防止用户多次点击
  clickCountLimit(): boolean {
    let isCanGo = false;

    if (window.clickCountLimitMock) {
      return true;
    }
    if (!this.lastClickTime) {
      this.lastClickTime = new Date().getTime();
      isCanGo = true;
    } else {
      const shicha = new Date().getTime() - this.lastClickTime;
      this.lastClickTime = new Date().getTime();
      isCanGo = shicha >= 1000;
    }
    if (!isCanGo) {
      console.log("手残党点击太快了");
    }
    return isCanGo;
  }
  generateMixed() {
    // let res = "";
    // for (let i = 0; i < n; i++) {
    //   const id = Math.ceil(Math.random() * 35);
    //   res += chars[id];
    // }
    return nanoid();
  }
  controlFormRule(controlItems: any[]): any {
    const rules: any = {};
    controlItems.forEach((item: any) => {
      const rule: any[] = [];
      if (item.data.required) {
        rule.push({
          required: true,
          message: "请输入" + item.data.label,
          trigger: "blur",
        });
        rules[item.data.fieldName] = rule;
      }
      if (item.ControlType === "JsonEditor") {
        rules[item.data.fieldName] = this.getJsonValidate();
      }
    });
    return rules;
  }
  deepClone(target: any): any {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === "object") {
      // 如果是一个数组的话
      if (Array.isArray(target)) {
        result = []; // 将result赋值为一个数组，并且执行遍历
        for (let i = 0; i < target.length; i++) {
          // 递归克隆数组中的每一项
          if (Object.prototype.hasOwnProperty.call(target, i)) {
            result.push(this.deepClone(target[i]));
          }
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (target === null) {
        result = null;
        // 判断如果当前的值是一个RegExp对象的话，直接赋值
      } else if (target.constructor === RegExp) {
        result = target;
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {};
        for (const i in target) {
          if (Object.prototype.hasOwnProperty.call(target, i)) {
            result[i] = this.deepClone(target[i]);
          }
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = target;
    }
    // 返回最终结果
    return result;
  }

  tryParseJson(json: string) {
    try {
      return JSON.parse(json);
    } catch (E) {
      if (json && json.startsWith && json.startsWith('"[')) {
        return [];
      }
      return {};
    }
  }
  open(message: string, title = "Success", type: any = "success") {
    ElNotification({
      title: title || "Success",
      message: message,
      type,
    });
  }
  getJsonValidate() {
    return this.deepClone([
      {
        validator: (rule: any, value: any, callback: (a?: any | undefined) => any) => {
          try {
            JSON.parse(value);
            callback();
          } catch (e) {
            console.error(e);
            return callback(new Error("请输入正确的json格式"));
          }
        },
        trigger: "blur",
      },
    ]);
  }
  // 获取数据类型
  getDataType(data: any): any {
    const str: any = Object.prototype.toString.call(data);
    const reg = /\[object (.*)\]/;
    return str.match(reg)[1];
  }
  /**
   * json转标准数据格式进行收口
   * @param item 
   * @returns 
   */
  jsonToForm(item: any) {
    if (!item.data || !item.controlItems) {
      item = this.deepClone(item);
      item.formConfig = window.VApp.$formcomponents[item.ControlType]?.formConfig || {};
      if(!item.data){
        item.data = item.formConfig.data();
      }
      if (!item.data.fieldName) {
        item.data.fieldName = item.ControlType + "_" + this.generateMixed();
      }
      if (fieldlist.includes(item.data.fieldName)) {
        item.data.fieldName = item.ControlType + "_" + this.generateMixed();
      } else {
        fieldlist.push(item.data.fieldName);
      }
      if (item.layout) {
        if (item.data.columns && item.data.columns.length > 0) {
          item.data.columns = item.data.columns.map((colItem: any) => {
            if(colItem.list && colItem.list.length > 0){
              colItem.list = this.jsonToForm(colItem.list);
            }
            return colItem;
          });
        }
      }
      item.id = this.generateMixed();
      const controlItems = item.formConfig.morenConfig();
      item.rules = this.controlFormRule(controlItems);
      item.controlItems = controlItems;
    }
    return item;
  }
}

export default new Flex();
