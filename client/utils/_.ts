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
}

export default new Flex();
