import {  ElNotification } from "element-plus";
const chars: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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
  generateMixed(n: any) {
    let res = "";
    for (let i = 0; i < n; i++) {
      const id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    return res;
  }
  controlFormRule(controlItems: any[], items?: any): any {
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
  deepClone(data: AnalyserOptions | any) {
    if (!data || !(data instanceof Object) || typeof data == "function") {
      return data || undefined;
    }
    const constructor: any = data.constructor;
    const result = new constructor();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = this.deepClone(data[key]);
      }
    }
    return result;
  }

  tryParseJson(json: string) {
    try {
      return JSON.parse(json);
    } catch (E) {
      if(json.startsWith('"[')){
        return []
      }
      return {};
    }
  }
  open(message: string, title = "Success", type:any =  "success") {
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
}

export default new Flex();
