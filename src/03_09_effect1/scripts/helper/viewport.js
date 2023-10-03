import world from "../glsl/world";

const viewport = {
  init,
  bindResizeEvents,
};

function init(canvasRect, cameraZ=2000, near=10, far=4000) {
  viewport.cameraWidth = canvasRect.width;
  viewport.cameraHeight = canvasRect.height;
  viewport.near = near;
  viewport.far = far;
  viewport.aspect = viewport.cameraWidth / viewport.cameraHeight;
  viewport.cameraZ = cameraZ;
  viewport.radian = 2 * Math.atan(viewport.cameraHeight / 2 / viewport.cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);

  return viewport;
}

function bindResizeEvents() {
  let timerId = null;

  window.addEventListener("resize", () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log("resize");
      updateCanvas();
    }, 500);
  });
}

function updateCanvas() {
  const newCanvasRect = canvas.getBoundingClientRect();

  viewport.cameraWidth = newCanvasRect.width;
  viewport.cameraHeight = newCanvasRect.height;
  viewport.aspect = viewport.cameraWidth / viewport.cameraHeight;
  viewport.radian = 2 * Math.atan(viewport.cameraHeight / 2 / viewport.cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);

  world.osResize(world.os, newCanvasRect);
}

export { viewport };
