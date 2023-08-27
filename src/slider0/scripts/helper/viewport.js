import world from "../glsl/world";

const viewport = {
  init,
};

const $ = {};//dom要素を管理するオブジェクト

function init(canvas, cameraZ = 2000, near = 1500, far = 4000) {
  $.canvas = canvas;
  const rect = canvas.getBoundingClientRect();

  viewport.width = rect.width;
  viewport.height = rect.height;
  viewport.cameraZ = 2000;
  viewport.aspect = viewport.width / viewport.hei;
  viewport.near = near;
  viewport.far = far;
  viewport.radian = 2 * Math.atan(viewport.height / 2 / cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);
  viewport.devicePixelRatio = window.devicePixelRatio;

  return viewport;
}

export default viewport;
