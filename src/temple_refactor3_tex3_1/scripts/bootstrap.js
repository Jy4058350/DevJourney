import { iNode } from "../../iNode";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import scroll from "./component/scroller";
import cash from "./component/cash";


export async function init() {
  const canvas = iNode.qs("#canvas");
  
  viewport.init(canvas); //カメラのnear,far,fovを変更したい場合には第二引数から設定する
  scroll.initScroll();
  
  cash.init();
  cash.clientProgressAction((countNum, totalNum) => {
    cash.$.progressBar.value = Math.floor((countNum / totalNum) * 100);

    cash.$.loaderPersent.innerHTML =
      Math.floor((countNum / totalNum) * 100) + "%";
  });

  await cash.load();

  world.init(canvas, viewport);

  world.render();
  cash.clientContentStart();
}
