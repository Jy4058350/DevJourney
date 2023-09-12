import world from "./glsl/world";

import scroller from "./component/scroller";
import mouse from "./component/mouse";
import viewport from "./helper/viewport";
import { iNode } from "../../iNode";

export function init() {
  const canvas = iNode.qs("#canvas");

  viewport.init(canvas);

  world.init();

  scroller.init();

  mouse.init();

  world.rendere();
}
