/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import vertexShader1 from "./vertex1.glsl";
import fragmentShader from "./fragment.glsl";
import fragmentShader1 from "./fragment1.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

init();
async function init() {
  //メインのレンダラー
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();

  //レンダーターゲット
  const renderTarget = new THREE.WebGLRenderTarget(500, 500);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const rtCamera = camera.clone();
  rtCamera.aspect = 1;
  rtCamera.updateProjectionMatrix();
  const rtScene = new THREE.Scene();
  // rtScene.background = new THREE.Color(0x444444);
  rtCamera.position.set(0, 0, 10);
  camera.position.z = 15;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // camera.position.z = 30; //set()methodにあとで変更する

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  const geometry = new THREE.PlaneGeometry(25, 12.5);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex1: { value: await loadTex("/img/output0.jpg") },
      uTex2: { value: await loadTex("/img/output1.jpg") },
      uTex3: { value: await loadTex("/img/output4.jpg") },
      uTex4: { value: await loadTex("/img/output5.jpg") },
      uTex5: { value: await loadTex("/img/output6.jpg") },
      uTex6: { value: await loadTex("/img/output7.jpg") },
      uTex7: { value: await loadTex("/img/output8.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
      uProgress2: { value: 0 }, //アニメーションの速度
    },
    vertexShader,
    fragmentShader,
  });
  const rtmesh = new THREE.Mesh(geometry, material);

  const geo = new THREE.PlaneGeometry(40, 20);
  const mate = new THREE.ShaderMaterial({
    uniforms: {
      uTex3: { value: await loadTex("/img/output3.jpg") },
      uTex4: { value: await loadTex("/img/output2.jpg") },
      uTick: { value: 0 },
      uProgress2: { value: 0 },
    },
    vertexShader: vertexShader1,
    fragmentShader: fragmentShader1,
  });
  const mesh = new THREE.Mesh(geo, mate);
  scene.add(mesh);

  scene.add(rtmesh);

  const axis = new THREE.AxesHelper(100);
  scene.add(axis);

  const gui = new GUI();
  const folder1 = gui.addFolder("z-distance");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("mesh")
    .listen();
  folder1
    .add(mate.uniforms.uProgress2, "value", 0, 1, 0.1)
    .name("rtmesh")
    .listen();

  let animationProgress = 0;

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("mesh")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
        onUpdate: () => {
          animationProgress = material.uniforms.uProgress.value;
        },
      });
    });
  folder1
    .add(datData, "next")
    .name("rtmesh")
    .onChange(() => {
      gsap.to(mate.uniforms.uProgress2, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
      });
    });

  function animateMaterial() {
    gsap.to(material.uniforms.uProgress, {
      value: 1,
      duration: 60,
      // ease: "ease",
      onComplete: () => {
        animationProgress = 0;
        material.uniforms.uProgress.value = 0;
        animateMaterial();
      },
      onUpdate: () => {
        animationProgress = material.uniforms.uProgress.value;
      },
    });
  }

  animateMaterial();

  let i = 0;

  function animate() {
    requestAnimationFrame(animate);

    material.uniforms.uTick.value += 0.001;

    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    renderer.render(scene, camera);
    mesh.position.z = -10;
    mesh.position.y = -20;
    // mesh.rotation.x += 0.01;
    // mesh.position.x += 0.01;
    // rtmesh.rotation.y += 0.01;

    material.uniforms.uProgress.value = animationProgress;

    controls.update();
  }

  animate();
}
