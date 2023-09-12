import { iNode } from "../../../iNode.js";
import world from "../glsl/world.js";

const viewport = {
  init,
};

const $ = {};

function init(canvas) {
  $.canvas = canvas;

  const canvasRect = canvas.getBoundingClientRect();

  viewport.cameraWidth = canvasRect.width;
  viewport.cameraHeight = canvasRect.height;
  viewport.near = 1500;
  viewport.far = 4000;
  viewport.aspect = viewport.cameraWidth / viewport.cameraHeight;
  viewport.cameraZ = 2500;
  viewport.radian = 2 * Math.atan(viewport.cameraHeight / 2 / viewport.cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);

  initResize();

  return viewport;
}

function _setCanvasSize() {}

function initResize() {
  let timer = null;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("resize");
      _onResize();
    }, 500);
  });
}

function _updateCamera() {
  const { near, far, cameraZ } = viewport;
  viewport.init($.canvas, near, far, cameraZ);
}

function _onResize() {
  _updateCamera();
  const newCanvasRect = canvas.getBoundingClientRect();
  world.renderer.setSize(viewport.cameraWidth, viewport.cameraHeight, false);
  world.os.forEach((o) => {
    world.resize(o, newCanvasRect);
  });

  //   const cameraWidth = newCanvasRect.width;
  //   const cameraHeight = newCanvasRect.height;
  //   const near = 1500;
  //   const far = 4000;
  //   const aspect = cameraWidth / cameraHeight;
  //   const cameraZ = 2500;
  //   const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  //   const fov = radian * (180 / Math.PI);
  world.camera.near = viewport.near;
  world.camera.far = viewport.far;
  world.camera.aspect = viewport.aspect;
  world.camera.fov = viewport.fov;
  world.camera.updateProjectionMatrix();
}

export default viewport;
