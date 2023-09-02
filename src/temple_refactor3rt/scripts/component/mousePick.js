import { Vector2 } from "three";
import world from "../glsl/world";
import { utils, viewport } from "../helper";
import { on } from "events";

const pointer = new Vector2();

const mousePick = {
  init,
  pointer,
  onPointerMove,
};

function init() {
  _pickEvent();
}

function pointerPosition(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
}

function onPointerMove() {
  return {
    x :(pointer.x / viewport.innerWidth) * 2 - 1,
    y : -(pointer.y / viewport.innerHeight) * 2 + 1,
  }
}

function _pickEvent() {
  window.addEventListener("pointermove", onPointerMove);
}

export default mousePick;

/**
 *このコードはraycastingのコードを分離したものです
 * Raycasting
 * https://threejs.org/docs/#api/en/core/Raycaster
 */
