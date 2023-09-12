import world from "./glsl/world";

import scroller from "./component/scroller";
import mouse from "./component/mouse";
import viewport from "./helper/viewport";

export function init() {
  viewport.init();

  world.init();

  scroller.init();

  mouse.init();

  world.rendere();
}
