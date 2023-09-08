import { iNode } from "../../iNode";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import scroll from "./component/scroller";
import cash from "./component/cash";

const canvas = iNode.qs("#canvas");

export async function init() {
  const canvas = iNode.qs("#canvas");
  cash.init();

  viewport.init(canvas); //カメラのnear,far,fovを変更したい場合には第二引数から設定する
  scroll.initScroll();

  await cash.load();
  cash.clientProgressAction();
  world.init(canvas, viewport);

  world.render();
}
