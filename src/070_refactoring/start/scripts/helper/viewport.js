const viewport = {
  init,
};

function init(canvasRect) {
  viewport.cameraWidth = canvasRect.width;
  viewport.cameraHeight = canvasRect.height;
  viewport.near = 1500;
  viewport.far = 4000;
  viewport.aspect = viewport.cameraWidth / viewport.cameraHeight;
  viewport.cameraZ = 2000;
  viewport.radian = 2 * Math.atan(viewport.cameraHeight / 2 / viewport.cameraZ);
  viewport.fov = viewport.radian * (180 / Math.PI);
}

export { viewport };
