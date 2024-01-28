import world from "../glsl/world";
import DOMManuipulatorClass from "../myclasses/domManuipulator";

const viewport = {
  init,
  bindResizeEvents,
};

function init(canvas, cameraZ = 2000, near = 10, far = 4000) {
  const canvasRect = canvas.getBoundingClientRect();

  viewport.width = canvasRect.width;
  viewport.height = canvasRect.height;
  viewport.near = near;
  viewport.far = far;
  viewport.aspect = viewport.width / viewport.height;
  viewport.cameraZ = cameraZ;
  viewport.radian = 2 * Math.atan(viewport.height / 2 / viewport.cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);

  return viewport;
}

let timerId = null;

function bindResizeEvents() {
  window.addEventListener("resize", () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      // console.log("resize");
      updateCanvas();
    }, 500);
  });
}

function updateCanvas() {
  const newCanvasRect = canvas.getBoundingClientRect();

  viewport.width = newCanvasRect.width;
  viewport.height = newCanvasRect.height;
  viewport.aspect = viewport.width / viewport.height;
  viewport.radian = 2 * Math.atan(viewport.height / 2 / viewport.cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);

  world.osResize(world.os, newCanvasRect);
  // const domManuipulator = new DOMManuipulatorClass();
  // domManuipulator.updateStyle();
}

export { viewport };
