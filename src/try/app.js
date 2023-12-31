import "./try.scss";
import {
  WebGLRenderer,
  Scene,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  AxesHelper,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
} from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode.js";

const world = {};
const os = [];
const canvasRect = canvas.getBoundingClientRect();

init();

async function init() {
  const canvas = iNode.qs("#canvas");
  world.renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0x000000, 0);
  // world.body.appendChild(renderer.domElement);

  // const positionZ = 1000;

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const aspect = cameraWidth / cameraHeight;
  const near = 1500;
  const far = 4000;
  const cameraZ = 2500;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(
    fov,
    cameraWidth / cameraHeight,
    near,
    far
  );
  world.camera.position.z = cameraZ;

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const els = iNode.qsa("[data-webgl]");
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();
    const { x, y } = getWorldPosition(rect, canvasRect);

    const geometry = new PlaneGeometry(256, 144);
    const material = new ShaderMaterial({
      uniforms: {
        uTex1: { value: await loadTex("/img/output3.jpg") },
        uTex2: { value: await loadTex("/img/output2.jpg") },
        uTick: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, 0);

    const o = {
      geometry,
      material,
      mesh,
      rect,
      $: {
        el,
      },
    };
    os.push(o);
    world.scene.add(mesh);

  //   const gui = new GUI();
  //   const folder1 = gui.addFolder("z-distance");
  //   folder1.open();

  //   folder1
  //     .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
  //     .name("zaxis")
  //     .listen();

  //   const datData = { next: !!material.uniforms.uProgress.value };
  //   folder1
  //     .add(datData, "next")
  //     .name("moving axis")
  //     .onChange(() => {
  //       gsap.to(material.uniforms.uProgress, {
  //         value: datData.next ? 1 : 0,
  //         duration: 3,
  //         ease: "ease",
  //       });
  //     });
  });

  render();
  function render() {
    requestAnimationFrame(render);
    os.forEach((o) => scroll(o));

    // controls.update();
    world.renderer.render(world.scene, world.camera);
  }
}

function scroll(o) {
  const {
    $: { el },
    mesh,
  } = o;
  const rect = el.getBoundingClientRect();
  const { y } = getWorldPosition(rect, canvasRect);
  mesh.position.y = y;
}

function getWorldPosition(rect, canvasRect) {
  const x = rect.left + rect.width / 2 - canvasRect.width / 2;
  const y = -rect.top - rect.height / 2 + canvasRect.height / 2;
  return { x, y };
}

async function loadTex(url) {
  const texLoader = new TextureLoader();
  const texture = await texLoader.loadAsync(url);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = MirroredRepeatWrapping;
  return texture;
}
