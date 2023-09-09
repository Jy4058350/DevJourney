/**
 * Three.js
 * https://threejs.org/
 */
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  PlaneGeometry,
  BufferGeometry,
  ShaderMaterial,
  Mesh,
  AxesHelper,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  BufferAttribute,
} from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Setgeo } from "./buffergeo";
import { iNode } from "../iNode";

const world = {
  os: [],
};

init();
async function init() {
  const canvas = iNode.qs("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  console.log(canvasRect);

  const cameraWidth = canvasRect.width;
  const cameraHeight = canvasRect.height;
  const aspect = cameraWidth / cameraHeight;
  const near = 1500;
  const far = 4000;
  const cameraZ = 2500;
  const radian = 2 * Math.atan(cameraHeight / 2 / cameraZ);
  const fov = radian * (180 / Math.PI);

  world.scene = new Scene();
  world.camera = new PerspectiveCamera(fov, aspect, near, far);
  world.camera.position.z = cameraZ;

  world.renderer = new WebGLRenderer({ canvas, antialias: true });
  world.renderer.setSize(canvasRect.width, canvasRect.height, false);
  world.renderer.setPixelRatio(window.devicePixelRatio);
  world.renderer.setClearColor(0xffffff);
  /* エラー時にシェーダの全体のコードを表示(three.js 0.152.0 対応) */
  world.renderer.debug.onShaderError = (
    gl,
    program,
    vertexShader,
    fragmentShader
  ) => {
    const vertexShaderSource = gl.getShaderSource(vertexShader);
    const fragmentShaderSource = gl.getShaderSource(fragmentShader);

    console.groupCollapsed("vertexShader");
    console.log(vertexShaderSource);
    console.groupEnd();

    console.groupCollapsed("fragmentShader");
    console.log(fragmentShaderSource);
    console.groupEnd();
  };
  document.body.appendChild(world.renderer.domElement);
  const els = iNode.qsa("[data-webgl");
  console.log(els);
  els.forEach(async (el) => {
    const rect = el.getBoundingClientRect();
    const o = {
      rect,
    };
    world.os.push(o);

    const geo1 = new Setgeo();
    const geometry = geo1.createBufferGeo();

    const material = new ShaderMaterial({
      uniforms: {
        uTex1: { value: await loadTex("/img/output3.jpg") },
        uTex2: { value: await loadTex("/img/output2.jpg") },
        uTick: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: 2,
      // wireframe: true,
    });
    const plane = new Mesh(geometry, material);
    world.scene.add(plane);

    world.camera.position.z = 30;
  });

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    return texture;
  }

  const axis = new AxesHelper(100);
  world.scene.add(axis);

  const controls = new OrbitControls(world.camera, world.renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("z-distance");
  folder1.open();

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

  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    world.renderer.render(world.scene, world.camera);
  }

  animate();
}

export { world };
