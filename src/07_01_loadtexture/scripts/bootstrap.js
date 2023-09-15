import "../styles/style.scss";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";
import { mouse } from "./component/mouse";
import { loader } from "./component/loader";

export async function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  await loader.init();

  viewport.init(canvasRect);

  viewport.bindResizeEvents();

  scroll.initScroller();

  world.init(canvasRect, viewport);

  mouse.init();

  world.render();
}
