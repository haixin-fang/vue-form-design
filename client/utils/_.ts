import { ElMessageBox } from "element-plus";
const chars: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
declare global {
  interface Window {
    clickCountLimitMock: boolean;
    JSONEditor: any;
  }
}

class Flex {
  lastClickTime: number;
  constructor() {
    this.lastClickTime = 0;
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
  controlFormRule(controlItems: any[], items: any): any {
    const rules: any = {};
    controlItems.forEach((item: any) => {
      const rule: any[] = [];
      if (item.data.required) {
        rule.push({
          required: true,
          message: "请输入" + item.data.label,
          trigger: "blur",
        });
        rules[item.data.fieldName] = rule
      } 
      if(item.ControlType === 'JsonEditor'){
        rules[item.data.fieldName] = this.getJsonValidate()
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
      return {};
    }
  }
  open(message: string, title?: string) {
    ElMessageBox.alert(message, title, {
      confirmButtonText: "OK",
    });
  }
  getJsonValidate(){
    return this.deepClone([
      {
        validator: (rule: any, value: any, callback: (a?:any | undefined) => any) => {
          try {
            const text = JSON.parse(value);
            callback();
          } catch (e) {
            console.error(e);
            return callback(new Error("请输入正确的json格式"));
          }
        },
        trigger: "blur",
      },
    ])
  }
}

export default new Flex();
