import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Raycaster,
  AxesHelper,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { lerp } from "../helper/utils";
import { viewport } from "../helper/viewport";
import { mouse } from "../component/mouse";

const os = [];

const world = {
  os,
  init,
  render,
  osResize,
  tick: 0,
};

const raycaster = new Raycaster();

async function init(canvasRect, viewport) {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);

  world.scene = new Scene();
  console.log(world.scene);

  world.camera = new PerspectiveCamera(
    viewport.fov,
    viewport.aspect,
    viewport.near,
    viewport.far
  );
  world.camera.position.z = viewport.cameraZ;

  await initObjects(canvasRect);
}

async function initObjects(canvasRect) {
  const els = document.querySelectorAll("[data-webgl]");
  const prms = [...els].map(async (el) => {
    const type = el.dataset.webgl;
    // console.log(type);
    const o = await import(`./${type}/index.js`).then(
      ({ default: CustomObject }) => {
        return CustomObject.init({ el, type });
      }
    );
    if (!o.mesh) return;
    world.scene.add(o.mesh);
    os.push(o);

    const axis = new AxesHelper(100);
    // console.log(world.scene);
    world.scene.add(axis);
    
    // const controls = new OrbitControls(world.camera, world.renderer.domElement);
    // controls.enableDamping = true;


    return o;
  });
  await Promise.all(prms).then((prms) => console.log(prms));
  let first = true;
  const prmsA = os.map(async (o) => {
    if (first) {
      await o.afterInit();
      first = false;
    }
  });
  await Promise.all(prmsA).then((prms) => console.log(prms));
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
    if(AxesHelper) return;
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
