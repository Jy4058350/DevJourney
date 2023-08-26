/**
 * Three.js
 * https://threejs.org/
 */
import "./style.scss";
import gsap from "gsap";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  ClampToEdgeWrapping,
  RepeatWrapping,
  Raycaster,
  Vector2,
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { iNode } from "../iNode";

const world = {};
const os = [];
const canvas = iNode.qs("#canvas");
const canvasRect = canvas.getBoundingClientRect();
console.log(canvasRect);

const raycaster = new Raycaster();
const pointer = new Vector2();

init();

async function init() {
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setClearColor(0xffffff);
  document.body.appendChild(world.renderer.domElement);

  const cameraZ = 2000;
  const aspect = canvasRect.width / canvasRect.height;
  const near = 1500;
  const far = 4000;
  const radian = 2 * Math.atan(canvasRect.height / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(fov, aspect, near, far);
  world.camera.position.z = cameraZ;

  const gui = new GUI();
  const folder1 = gui.addFolder("slider0");
  folder1.open();

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();
    console.log(rect);
    const geometry = new PlaneGeometry(rect.width, rect.height, 1, 1);
    const material = new ShaderMaterial({
      uniforms: {
        uMouse: { value: new Vector2(0.3, 0.3)},
        // uTexCurrent: { value: await loadTex("/img/output1.jpg") },
        // uTexNext: { value: await loadTex("/img/output1.jpg") },
        uTick: { value: 0 },
        uProgress: { value: 0 },
        uProgress2: { value: 0 },
        uProgress3: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });
    const mesh = new Mesh(geometry, material);
    const { x, y } = getWorldPosition(rect, canvasRect);
    mesh.position.set(x, y, 0);
    world.scene.add(mesh);

    const o = {
      mesh,
      geometry,
      material,
      rect,
      canvasRect,
      $: {
        el,
      },
    };
    os.push(o);

    initResize();
    raycast();

    folder1
      .add(material.uniforms.uProgress, "value", 0, 2, 0.01)
      .name("tex1進行度");
    folder1
      .add(material.uniforms.uProgress2, "value", 0, 2, 0.01)
      .name("tex2進行度");
    folder1
      .add(material.uniforms.uProgress3, "value", 0, 2, 0.01)
      .name("animetion")
      .listen();
    const datData = { next: !!material.uniforms.uProgress3.value };
    folder1
      .add(datData, "next")
      .name("next")
      .onChange(() => {
        gsap.to(material.uniforms.uProgress3, {
          value: datData.next ? 2 : 0,
          duration: 3,
          ease: "power2.inOut",
        });
      });
  });

  render();
  function render() {
    requestAnimationFrame(render);
    os.forEach((o) => scroll(o));

    world.renderer.render(world.scene, world.camera);
  }
}

async function loadTex(url) {
  const texLoader = new TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

function initScroll() {}

function scroll(o) {
  const {
    $: { el },
    mesh,
  } = o;
  const rect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(rect, canvasRect);
  // mesh.position.x = x;
  mesh.position.y = y;
}

function resize(o, newCanvasRect) {
  const {
    $: { el },
    mesh,
    geometry,
    rect,
  } = o;
  const resizedRect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(rect, newCanvasRect);
  mesh.position.set(x, y, 0);

  //大きさの変更;
  geometry.scale(
    resizedRect.width / rect.width,
    resizedRect.height / rect.height,
    1
  );
  o.rect = resizedRect;
}

let timer = 0;
function initResize() {
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const newCanvasRect = canvas.getBoundingClientRect();
      world.renderer.setSize(newCanvasRect.width, newCanvasRect.height, false);

      os.forEach((o) => resize(o, newCanvasRect));

      const cameraWidth = newCanvasRect.width;
      const cameraHeight = newCanvasRect.height;
      const near = 1500;
      const far = 4000;
      const aspect = cameraWidth / cameraHeight;
      const cameraZ = 2000;
      const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
      const fov = radian * (180 / Math.PI);

      world.camera.cameraWidth = cameraWidth; //ここ重複しているかも。end資材は記述していない。
      world.camera.cameraHeight = cameraHeight;
      world.camera.near = near;
      world.camera.far = far;
      world.camera.aspect = aspect;
      world.camera.fov = fov;
      world.camera.updateProjectionMatrix();
    }, 500);
  });
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function raycast() {
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, world.camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(world.scene.children);
  const intersect = intersects[0];

  for (let i = 0; i < world.scene.children.length; i++) {
    const _mesh = world.scene.children[i];

    if(intersect.object === _mesh) {
      console.log("hit");
      _mesh.material.uniforms.uMouse.value = intersect.uv;
    }

  }
}

window.addEventListener("pointermove", onPointerMove);
