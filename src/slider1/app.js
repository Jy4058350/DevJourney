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
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  }

  const geometry = new THREE.PlaneGeometry(50, 25);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexCurrent: { value: await loadTex("/img/output4.jpg") },
      uTexNext: { value: await loadTex("/img/output5.jpg") },
      uTexDisp: { value: await loadTex("/img/displacement/4.png") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
      uProgress1: { value: 0 },
      uNoise: { value: new THREE.Vector2(10, 10) },
    },
    vertexShader,
    fragmentShader,
  });
  console.log(material.uniforms.uNoise.value);
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 30;

  const axis = new THREE.AxesHelper(100);
  scene.add(axis);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const gui = new GUI();
  const folder1 = gui.addFolder("slide");
  folder1.open();

  folder1
    .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
    .name("myslider")
    .listen();

  const datData = { next: !!material.uniforms.uProgress.value };
  folder1
    .add(datData, "next")
    .name("moving ")
    .onChange(() => {
      gsap.to(material.uniforms.uProgress, {
        value: datData.next ? 1 : 0,
        duration: 3,
        ease: "ease",
        onComplete: () => {
          console.log(datData.next);
        },
      });
    });

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    material.uniforms.uTick.value += 0.1;

    renderer.render(scene, camera);
  }

  animate();

  const hovered = iNode.qsa(".hovered");
  const openSubmenu = iNode.qs(".open-submenu");
  const header = iNode.qs(".header");
  const dev = iNode.qs(".dev");

  hovered.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("active");
      openSubmenu.classList.add("active");
    });
  });

  hovered.forEach((item) => {
    item.addEventListener("mouseleave", () => {
      item.classList.remove("active");
      if (!openSubmenu.matches(":hover")) {
        openSubmenu.classList.remove("active");
        header.classList.remove("white");

      }
    });
  });
  openSubmenu.addEventListener("mouseleave", () => {
    if (!openSubmenu.matches(":hover")) {
      openSubmenu.classList.remove("active");
    }
  });

  header.addEventListener("mouseenter", () => {
    dev.classList.add("white");
    header.classList.add("white");
    hovered.forEach((item) => {
      item.classList.add("white");
    });
  });
  header.addEventListener("mouseleave", () => {
    dev.classList.remove("white");
    header.classList.remove("white");
    if (!openSubmenu.matches(":hover")) {
    }
    hovered.forEach((item) => {
      if (!openSubmenu.matches(":hover")) {
        item.classList.remove("white");
      }
    });
    if(!openSubmenu.matches(":hover")){
      header.classList.remove("white");
    }
  });
}
