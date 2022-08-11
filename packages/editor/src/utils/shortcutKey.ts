import KeyController from "keycon";
import history from "@/controller/history";
import type {shortCutType} from './formKeycon'
export function listenGlobalKeyDown(list: shortCutType, dom: HTMLDivElement | any) {
  const keycons:KeyController = new KeyController(dom);
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
    .keydown([ctrl, "e"], (e) => {
      e.inputEvent.preventDefault();
      list.clearCanvas();
    })
    .keydown([ctrl, "v"], (e) => {
      e.inputEvent.preventDefault();
      list.paste();
    })
    .keydown([ctrl, "z"], (e) => {
      e.inputEvent.preventDefault();
      history?.back();
    })
    .keydown([ctrl, "x"], (e) => {
      e.inputEvent.preventDefault();
      list.cut();
    })
    .keydown([ctrl, "up"], (e) => {
      e.inputEvent.preventDefault();
      list.onTop();
    })
    .keydown([ctrl, "down"], (e) => {
      e.inputEvent.preventDefault();
      list.onBottom();
    });
  return keycons;
}
