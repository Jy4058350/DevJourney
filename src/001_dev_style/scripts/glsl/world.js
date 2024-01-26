import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Raycaster,
  AxesHelper,
} from "three";

import { lerp, viewport, getWorldPosition, config } from "../helper";
import { mouse } from "../component/mouse";

const world = {
  os: [],
  init,
  render,
  osResize,
  tick: 0,
  getObjByEl,
  addMesh,
  removeMesh,
  raycaster: new Raycaster(),
};

async function init(canvas, viewport) {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(viewport.width, viewport.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);

  world.scene = new Scene();
  // console.log(world.scene);

  world.camera = new PerspectiveCamera(
    viewport.fov,
    viewport.aspect,
    viewport.near,
    viewport.far
  );
  world.camera.position.z = viewport.cameraZ;

  await _initWebglObjects(viewport);
}

async function _initWebglObjects() {
  const els = document.querySelectorAll(`[data-${config.prefix.glsl}]`);
  const prms = [...els].map((el) => {
    const type = el.dataset.webgl;
    return import(`./${type}/index.js`).then(({ default: CustomObject }) => {
      return CustomObject.init({ el, type });
    });
  });
  const loaderObjects = await Promise.all(prms);
  loaderObjects.forEach((o) => {
    if (!o.mesh) return;
    addMesh(o);
    return o;
  });

  //If the afterInit method performs an asynchronous operation and needs to wait for its completion, it should use await and Promise.all to wait for its completion.
  const afterPrms = world.os.map((o) => {
    o.afterInit();
  });
  await Promise.all(afterPrms);
}

function addMesh(o) {
  world.scene.add(o.mesh);
  world.os.push(o);
}

function removeMesh(o, dispose = true) {
  world.scene.remove(o.mesh);
  const index = world.os.indexOf(o);
  if (index > -1) {
    world.os.splice(index, 1);
  }
  if (dispose) {
    o.mesh.geometry.dispose();
    o.mesh.material.dispose();
  }
}

function getObjByEl(select) {
  if (selector instanceof CustomObject) return selector;
  const targetEl = document.querySelector(select);
  return world.os.find((o) => o.$.el === targetEl);
}

function render() {
  world.tick++;
  requestAnimationFrame(render);

  world.os.forEach((o) => horizontalScroll(o));
  // controls.update();
  // スクロール処理
  for (let i = world.os.length - 1; i >= 0; i--) {
    const o = world.os[i];
    o.scroll();

    o.render(world.tick);
  }

  raycast();

  world.renderer.render(world.scene, world.camera);
}

function horizontalScroll(o) {
  const {
    $: { el },
    mesh,
  } = o;
  const rect = el.getBoundingClientRect();
  const { x } = getWorldPosition(rect, viewport.newCanvasRect);
  mesh.position.x = x;
}

function raycast() {
  // update the picking ray with the camera and pointer position
  const mp = mouse.pos();

  world.raycaster.setFromCamera(mp, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = world.raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  // for (let i = 0; i < world.scene.children.length; i++) {
  for (let i = world.scene.children.length - 1; i >= 0; i--) {
    // if (AxesHelper) return;

    const _mesh = world.scene.children[i];
    if (!_mesh.material?.uniforms) continue;
    const uHover = _mesh.material.uniforms.uHover;
    // console.log(uHover);
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
  world.renderer.setSize(viewport.width, viewport.height, false);
  world.os.forEach((o) => o.resize(o, viewport.newCanvasRect));
  world.camera.fov = viewport.fov;
  world.camera.near = viewport.near;
  world.camera.far = viewport.far;
  world.camera.aspect = viewport.aspect;
  world.camera.updateProjectionMatrix();
}

export default world;
