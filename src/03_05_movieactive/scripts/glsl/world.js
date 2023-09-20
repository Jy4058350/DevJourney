import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Raycaster,
  Vector2,
} from "three";

import { lerp, getWorldPosition } from "../helper/utils";
import { viewport } from "../helper/viewport";
import { mouse } from "../component/mouse";
import ExtendObject from "./normal";
import ExtendObject2 from "./gray";
// import { CustomObject } from "./CustomObject";

const os = [];

const world = {
  init,
  render,
  osResize,
  tick: 0,
};

const raycaster = new Raycaster();

function init(canvasRect, viewport) {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);

  world.scene = new Scene();

  world.camera = new PerspectiveCamera(
    viewport.fov,
    viewport.aspect,
    viewport.near,
    viewport.far
  );
  world.camera.position.z = viewport.cameraZ;

  initObjects(canvasRect);
}

async function initObjects() {
  const els = document.querySelectorAll("[data-webgl]");
  const prms = [...els].map(async (el) => {
    const type = el.dataset.webgl;
    let o;
    if (type === "normal") {
      o = await ExtendObject.init({ el, type });
    } else if (type === "gray") {
      o = await ExtendObject2.init({ el, type });
    }

    world.scene.add(o.mesh);
    os.push(o);
  });
  await Promise.all(prms);

  os.forEach(async (o) => await o.afterInit());
}

function render() {
  world.tick++;
  requestAnimationFrame(render);
  // スクロール処理
  for (let i = os.length - 1; i >= 0; i--) {
    const o = os[i];
    o.scroll();
    o.render(world.tick);
  }

  raycast();

  world.renderer.render(world.scene, world.camera);
}

function raycast() {
  // update the picking ray with the camera and pointer position
  const mp = mouse.pos();

  raycaster.setFromCamera(mp, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  // for (let i = 0; i < world.scene.children.length; i++) {
  for (let i = world.scene.children.length - 1; i >= 0; i--) {
    const _mesh = world.scene.children[i];

    const uHover = _mesh.material.uniforms.uHover;
    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      uHover.__endValue = 1;
    } else {
      uHover.__endValue = 0;
    }

    uHover.value = lerp(uHover.value, uHover.__endValue, 0.01);
  }
}

function osResize() {
  world.renderer.setSize(viewport.cameraWidth, viewport.cameraHeight, false);
  os.forEach((o) => o.resize(o, viewport.newCanvasRect));
  world.camera.fov = viewport.fov;
  world.camera.near = viewport.near;
  world.camera.far = viewport.far;
  world.camera.aspect = viewport.aspect;
  world.camera.updateProjectionMatrix();
}

export default world;
