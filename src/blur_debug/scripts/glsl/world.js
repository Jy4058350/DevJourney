import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  BufferAttribute,
  Vector2,
  Raycaster,
} from "three";
import vertexShader from "../vertex.glsl";
import fragmentShader from "../fragment.glsl";

import { iNode } from "../../../iNode";
import viewport from "../helper/viewport";
import { lerp } from "../helper/utils";

const os = [];
const world = {
  init,
  rendere,
  resize,
  fitPosition,
  os,
};

const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();
const raycaster = new Raycaster();
const mouse = new Vector2();

export async function init() {
  world.renderer = new WebGLRenderer({ canvas, antialias: true });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0xffffff);
  world.scene = new Scene();

  world.camera = new PerspectiveCamera(
    viewport.fov,
    viewport.aspect,
    viewport.near,
    viewport.far
  );
  world.camera.position.z = viewport.cameraZ;

  // document.body.appendChild(world.renderer.domElement);

  // function Setgeo(w, h) {
  //   const geometry = new BufferGeometry();
  //   const plane = new PlaneGeometry(w, h, 1, 1);
  //   console.log(w, h);
  //   geometry.setAttribute("position", plane.getAttribute("position"));
  //   geometry.setAttribute("uv", plane.getAttribute("uv"));
  //   const planeIndex = plane.getIndex().array;
  //   const index = new BufferAttribute(planeIndex, 1);
  //   geometry.setIndex(index);
  //   return geometry;
  // }

  class Setgeo {
    constructor(w, h) {
      this.geometry = new BufferGeometry();
      this.plane = new PlaneGeometry(w, h, 1, 1);
    }
    createBufferGeo(w, h) {
      this.geometry.setAttribute(
        "position",
        this.plane.getAttribute("position")
      );
      this.geometry.setAttribute("uv", this.plane.getAttribute("uv"));

      const planeIndex = this.plane.getIndex().array;
      const index = new BufferAttribute(planeIndex, 1);
      this.geometry.setIndex(index);
      return this.geometry;
    }
  }

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();

    const set = new Setgeo(rect.width, rect.height);
    const geometry = set.createBufferGeo(rect.width, rect.height, 1, 1);
    // const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
    const material = new ShaderMaterial({
      uniforms: {
        // uTex1: { value: await loadTex("/img/output3.jpg") },
        // uTex2: { value: await loadTex("/img/output2.jpg") },
        uTick: { value: 0 },
        uHover: { value: 0 },
        uMouse: { value: new Vector2(0.5, 0.5) },
        uProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      // wireframe: true,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.z = 0;

    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.x = x;
    mesh.position.y = y;

    const o = {
      rect,
      mesh,
      geometry,
      material,
      canvasRect,
      $: {
        el,
      },
    };
    os.push(o);

    world.scene.add(mesh);
    // initResize();
  });

  // const axis = new AxesHelper(100);
  // world.scene.add(axis);

  // const controls = new OrbitControls(world.camera, world.renderer.domElement);
  // controls.enableDamping = true;

  // const gui = new GUI();
  // const folder1 = gui.addFolder("z-distance");
  // folder1.open();

  // folder1
  //   .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
  //   .name("zaxis")
  //   .listen();

  // const datData = { next: !!material.uniforms.uProgress.value };
  // folder1
  //   .add(datData, "next")
  //   .name("moving axis")
  //   .onChange(() => {
  //     gsap.to(material.uniforms.uProgress, {
  //       value: datData.next ? 1 : 0,
  //       duration: 3,
  //       ease: "ease",
  //     });
  //   });
  // rendere();
}
function rendere() {
  requestAnimationFrame(rendere);
  os.forEach((o) => {
    scroll(o);
  });
  raycast();
  world.renderer.render(world.scene, world.camera);
  // controls.update();
}

function fitPosition(viewport) {
  world.renderer.setSize(viewport.cameraWidth, viewport.cameraHeight, false);
  world.os.forEach((o) => {
    world.resize(o, viewport);
  });
  updateCamera(viewport);
}

function updateCamera(viewport) {
  const { fov, aspect, near, far, cameraZ } = viewport;
  world.camera.near = near;
  world.camera.far = far;
  world.camera.aspect = aspect;
  world.camera.fov = fov;
  world.camera.position.z = cameraZ;
  world.camera.updateProjectionMatrix();
  return world.camera;
}

function resize(o, newCanvasRect) {
  const {
    mesh,
    rect,
    geometry,
    $: { el },
  } = o;
  const nextRect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(nextRect, newCanvasRect);
  mesh.position.x = x;
  mesh.position.y = y;

  geometry.scale(nextRect.width / rect.width, nextRect.height / rect.height, 1);
  o.rect = nextRect;
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

// function initResize() {
//   let timer = null;
//   window.addEventListener("resize", () => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       console.log("resize");
//       const newCanvasRect = canvas.getBoundingClientRect();
//       world.renderer.setSize(canvasRect.width, canvasRect.height, false);
//       os.forEach((o) => {
//         resize(o, newCanvasRect);
//       });

//       const cameraWidth = newCanvasRect.width;
//       const cameraHeight = newCanvasRect.height;
//       const near = 1500;
//       const far = 4000;
//       const aspect = cameraWidth / cameraHeight;
//       const cameraZ = 2500;
//       const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
//       const fov = radian * (180 / Math.PI);
//       world.camera.near = near;
//       world.camera.far = far;
//       world.camera.aspect = aspect;
//       world.camera.fov = fov;
//       world.camera.updateProjectionMatrix();
//     }, 500);
//   });
// }

function raycast() {
  raycaster.setFromCamera(mouse, world.camera);
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    const uHover = _mesh.material.uniforms.uHover;
    if (intersect && intersect.object === _mesh) {
      _mesh.material.uniforms.uMouse.value = intersect.uv;
      uHover.__endValue = 1;
    } else {
      uHover.__endValue = 0;
    }
    uHover.value = lerp(uHover.value, uHover.__endValue, 0.001);
  }
}

// function onPointerMove(event) {
//   mouse.x = (event.clientX / canvasRect.width) * 2 - 1;
//   mouse.y = -(event.clientY / canvasRect.height) * 2 + 1;
// }

function scroll(o) {
  const {
    mesh,
    $: { el },
    canvasRect,
  } = o;
  const rect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(rect, canvasRect);
  // mesh.position.x = x;
  mesh.position.y = y;
}

// window.addEventListener("pointermove", onPointerMove);

export default world;
