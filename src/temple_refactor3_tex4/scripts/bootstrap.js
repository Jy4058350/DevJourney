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

  const progressBar = iNode.qs(".progress-bar");
  const loaderPersent = iNode.qs(".loader-persent");
  cash.clientProgressAction((countNum, totalNum) => {
    progressBar.value = Math.floor((countNum / totalNum) * 100);
    loaderPersent.innerHTML = Math.floor((countNum / totalNum) * 100) + "%";
  });
  await cash.load();
  
  world.init(canvas, viewport);
  
  world.render();
  cash._clientContentStar();
}
