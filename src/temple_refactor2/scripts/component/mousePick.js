import { Vector2 } from "three";
import world from "../glsl/world";
import { utils } from "../helper";

const pointer = new Vector2();

const mousePick = {
  init,
  pointer,
};

function init() {
  _pickEvent();
}

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
