import { iNode } from "../../iNode";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import scroll from "./component/scroller";

const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();

export function init() {
  const canvas = iNode.qs("#canvas");

  viewport.init(canvas); //カメラのnear,far,fovを変更したい場合には第二引数から設定する
  scroll.initScroll();

  world.init(canvas, viewport);

  world.render();
}
