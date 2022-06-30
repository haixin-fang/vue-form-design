import KeyController from "keycon";
export function listenGlobalKeyDown(list: any, dom: HTMLDivElement) {
  const keycons = new KeyController(dom);
  const isMac = /mac os x/.test(navigator.userAgent.toLowerCase());
  const ctrl = isMac ? "meta" : "ctrl";
  keycons
    .keyup("delete", (e) => {
      e.inputEvent.preventDefault();
      list.delete();
    })
    .keyup("backspace", (e) => {
      e.inputEvent.preventDefault();
      list.delete();
    })
    .keydown([ctrl, "c"], (e) => {
      e.inputEvent.preventDefault();
      list.copy();
    })
    .keydown([ctrl, "v"], (e) => {
      e.inputEvent.preventDefault();
      list.paste();
    })
    .keydown([ctrl, "x"], (e) => {
      e.inputEvent.preventDefault();
      list.cut();
    })
    .keydown([ctrl, "up"], (e) => {
      e.inputEvent.preventDefault();
      list.toTop();
    })
    .keydown([ctrl, "down"], (e) => {
      e.inputEvent.preventDefault();
      list.toBottom();
    });
}
