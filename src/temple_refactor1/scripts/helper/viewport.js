import world from "../glsl/world";

const viewport = {
  init,
};

const $ = {};

let initialized = false;

function init(canvas, cameraZ = 2000, near = 1500, far = 4000) {
  $.canvas = canvas;
  const rect = canvas.getBoundingClientRect();

  viewport.width = rect.width;
  viewport.height = rect.height;
  viewport.near = near;
  viewport.far = far;
  viewport.aspect = viewport.width / viewport.height;
  viewport.cameraZ = cameraZ;
  viewport.rad = 2 * Math.atan(viewport.height / 2 / cameraZ);
  viewport.fov = viewport.rad * (180 / Math.PI);
  viewport.devicePixelRatio = 1;

  if (!initialized) {
    _initResize();
    initialized = true;
  }
  return viewport;
}

function _update() {
  const { cameraZ, near, far } = viewport;
  viewport.init($.canvas, cameraZ, near, far);
}

function _initResize() {
  let timer = null;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      _onResize();
    }, 500);
  });
}

function _onResize() {
  _update();
  world.fitWorldPositon(viewport);
}

export { viewport };
