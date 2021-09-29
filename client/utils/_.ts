const chars: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
declare global {
  interface Window {
    clickCountLimitMock: boolean;
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
}

export default new Flex();
