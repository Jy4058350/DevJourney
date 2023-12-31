import "../styles/style.scss";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";

export async function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  viewport.init(canvasRect);
  scroll.initScroller();
  loader.loadDom();

  loader.addProgressAction(function _progressAction(total, loaded) {
    const percent = Math.floor((loaded / total) * 100);
    loader.$.p.innerHTML = `${percent} %`;
    loader.$.b.style.width = `${percent}%`;
  });
  
  
  
  viewport.bindResizeEvents();
  
  await loader.init();

  world.init(canvasRect, viewport);

  mouse.init();

  world.render();

  loader.loadingAnimation();
}
