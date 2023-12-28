import { Vector2 } from "three";
import { viewport } from "../helper/viewport";

const current = new Vector2();

const mouse = {
  init,
  pos,
};

function init() {
  bindEvents();
}

function bindEvents() {
  const gl = document.querySelector("#pageContainer");
  gl.addEventListener("pointermove", (event) => {
    update(event);
  });
}

function update(event) {
  current.x = event.clientX;
  current.y = event.clientY;
}

function pos(event) {
  return {
    x: (current.x / viewport.cameraWidth) * 2 - 1,
    y: -(current.y / viewport.cameraHeight) * 2 + 1,
  };
}

export { mouse };
