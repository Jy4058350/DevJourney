import { WebGLRenderer } from "three";

import viewport from "../helper/viewport";

const world = {
  os: [],
  init,
};

function init(canvas, viewport) {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(viewport.width, viewport.height, false);
  world.renderer.setClearColor(0x000000, 0);
  world.renderer.setPixelRatio(viewport.devicePixelRatio);

  world.scene = new Scene();

  world.camera = _setupPerspectiveCamera(viewport);
}

function _setupPerspectiveCamera(viewport) {
  const { fov, near, far, cameraZ } = viewport;
  const camera = new PerspectiveCamera(
    fov,
    cameraWidth / cameraHeight,
    near,
    far
  );
  world.camera.position.z = cameraZ;
  return camera;
}

function fitWorldPositon(viewport) {
  world.renderer.setSize(viewport.width, viewport.height, false);

  // meshの位置と大きさの変更
  os.forEach((o) => resize(o, newCanvasRect));

  updateCamera(viewport);
}

function updateCamera(viewport) {
  const { fov, near, far, cameraZ } = viewport;
  world.camera.near = near;
  world.camera.far = far;
  world.camera.aspect = aspect;
  world.camera.fov = fov;
  world.camera.updateProjectionMatrix();
  return world.camera;
}

export default world;
