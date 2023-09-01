import { Vector2, Raycaster } from "three";
import world from "../glsl/world";
import { utils } from "../helper";

const pointer = new Vector2();
const raycaster = new Raycaster();

const mousePick = {
  init,
  pointer,
};

function init() {
  _pickEvent();
  raycast();
}

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function raycast() {

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      _mesh.material.uniforms.uHover.__endValue = 1;
    } else {
      _mesh.material.uniforms.uHover.__endValue = 0;
    }
    _mesh.material.uniforms.uHover.value = utils.lerp(
      _mesh.material.uniforms.uHover.value,
      _mesh.material.uniforms.uHover.__endValue,
      0.001
    );
    debugger;
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
