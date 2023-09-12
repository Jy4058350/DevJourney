import { Vector2 } from "three";
import { iNode } from "../../../iNode";

import viewport from "../helper/viewport";

const currentMouse = new Vector2();

const mouse = {
  init,
  onPointerMove,
};

function init() {
  _fire();
}

function updatePosition(event) {
  currentMouse.x = event.clientX;
  currentMouse.y = event.clientY;
}

function onPointerMove() {
  return {
    x: (currentMouse.x / viewport.cameraWidth) * 2 - 1,
    y: -(currentMouse.y / viewport.cameraHeight) * 2 + 1,
  };
}

function _fire() {
  const all = iNode.qs("#page-container");
  all.addEventListener("pointermove", (event) => {
    updatePosition(event);
  });
}

export default mouse;
