/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iNode } from "../iNode";

init();
async function init() {
  //メインのレンダリングの設定
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  iNode.qs(".test").appendChild(renderer.domElement);

  //レンダーターゲットの設定
  const renderTarget = new THREE.WebGLRenderTarget(500, 500);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const rtCamera = camera.clone();
  rtCamera.aspect = 1;
  const rtScene = new THREE.Scene();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x415060);
  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  const rtGeo = new THREE.PlaneGeometry(50, 25);
  const rtMate = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output4.jpg") },
      uTex2: { value: await loadTex("/img/output5.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });
  const rtMesh = new THREE.Mesh(rtGeo, rtMate);

  const geo = new THREE.PlaneGeometry(50, 25);
  const mate = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: renderTarget.texture,
  });
  const mesh = new THREE.Mesh(geo, mate);
  rtScene.add(rtMesh);
  scene.add(mesh);

  camera.position.z = 30;

  const axis = new THREE.AxesHelper(100);
  rtScene.add(axis);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("z-distance");
  folder1.open();

  folder1
    .add(rtMate.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("zaxis")
    .listen();

  const datData = { next: !!rtMate.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("moving axis")
    .onChange(() => {
      gsap.to(rtMate.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
