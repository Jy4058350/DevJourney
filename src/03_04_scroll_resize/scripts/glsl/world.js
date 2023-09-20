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

const os = [];

const world = {
  init,
  render,
  osResize,
};

const raycaster = new Raycaster();
const pointer = new Vector2();

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
}

function render() {
  requestAnimationFrame(render);
  // スクロール処理
  os.forEach((o) => scroll(o));

  // レイキャスティング
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

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    const uHover = _mesh.material.uniforms.uHover;
    if (intersect?.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      uHover.__endValue = 1;
    } else {
      uHover.__endValue = 0;
    }

    uHover.value = lerp(uHover.value, uHover.__endValue, 0.1);
  }
}

// function scroll(o) {
//   const newCanvasRect = canvas.getBoundingClientRect();
//   const {
//     $: { el },
//     mesh,
//   } = o;
//   const rect = el.getBoundingClientRect();
//   if (newCanvasRect) {
//     const { x, y } = getWorldPosition(rect, newCanvasRect);
//     // mesh.position.x = x;
//     mesh.position.y = y;
//   }
//   if (!newCanvasRect && canvasRect) {
//     const { x, y } = getWorldPosition(rect, canvasRect);
//     // mesh.position.x = x;
//     mesh.position.y = y;
//   }
// }

function resize(o, newCanvasRect) {
  const {
    $: { el },
    mesh,
    geometry,
    rect,
  } = o;
  const nextRect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(nextRect, newCanvasRect);
  mesh.position.x = x;
  mesh.position.y = y;

  // 大きさの変更
  geometry.scale(nextRect.width / rect.width, nextRect.height / rect.height, 1);

  o.rect = nextRect;
}

function osResize() {
  world.renderer.setSize(viewport.cameraWidth, viewport.cameraHeight, false);
  os.forEach((o) => resize(o, viewport.newCanvasRect));
  world.camera.fov = viewport.fov;
  world.camera.near = viewport.near;
  world.camera.far = viewport.far;
  world.camera.aspect = viewport.aspect;
  world.camera.updateProjectionMatrix();
}

export default world;
