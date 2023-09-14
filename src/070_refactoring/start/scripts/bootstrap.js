import "../styles/style.scss";

import world from "./glsl/world";
import { viewport } from "./helper/viewport";
import { scroll } from "./component/scroll";

export function init() {
  const canvas = document.querySelector("#canvas");
  const canvasRect = canvas.getBoundingClientRect();

  viewport.init(canvasRect);
  scroll.initScroller();

  world.init(canvasRect, viewport);

  world.render();
}
