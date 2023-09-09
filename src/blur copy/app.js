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

init();
async function init() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  /* エラー時にシェーダの全体のコードを表示(three.js 0.152.0 対応) */
  renderer.debug.onShaderError = (
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
  document.body.appendChild(renderer.domElement);

  async function loadTex(url) {
    const texLoader = new TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    return texture;
  }

  const geo1 = new Setgeo(1, 1);
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
  scene.add(plane);

  camera.position.z = 30;

  const axis = new AxesHelper(100);
  scene.add(axis);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("z-distance");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("zaxis")
    .listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("moving axis")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}
