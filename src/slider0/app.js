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
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { iNode } from "../iNode";

const world = {};
const os = [];

init();

async function init() {
  world.renderer = new WebGLRenderer({ antialias: true });
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  world.renderer.setClearColor(0xffffff);
  document.body.appendChild(world.renderer.domElement);

  const canvas = iNode.qs("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  console.log(canvasRect);

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
        uTexCurrent: { value: await loadTex("/img/output1.jpg") },
        uTexNext: { value: await loadTex("/img/output1.jpg") },
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

function scroll(o) {
  const {
    $: { el },
    mesh,
    canvasRect,
  } = o;

  const rect = el.getBoundingClientRect();
  const { x, y } = getWorldPosition(rect, canvasRect);
  mesh.position.set(x, y, 0);
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

  大きさの変更
  geometry.scale(
    resizedRect.width / rect.width,
    resizedRect.height / rect.height,
    1
  );
  o.rect = resizedRect;
}

